if (typeof FNSP.DiffChecker === 'undefined') {
  FNSP.DiffChecker = {};
}
FNSP.DiffChecker.getLastPublishedVersionHtml = function (urlLastPublishedVersion) {
  var dfd = jQuery.Deferred();
  publishedPageHtml = [];
  $.when(FNSP.DiffChecker.getSite(_spPageContextInfo.webAbsoluteUrl + "/" + urlLastPublishedVersion)).then(function (response) {
    try {
      publishedPageHtml.push($(response).find("#page-title"));
      publishedPageHtml.push($(response).find(".m_page-ingress"));
      publishedPageHtml.push($(response).find("#innledning"));
      publishedPageHtml.push($(response).find("#utredning"));
      publishedPageHtml.push($(response).find("#behandling"));
      publishedPageHtml.push($(response).find("#oppfoelging"));
      publishedPageHtml.push($(response).find("#foer"));
      publishedPageHtml.push($(response).find("#under"));
      publishedPageHtml.push($(response).find("#etter"));

      dfd.resolve(publishedPageHtml)
    }
    catch (error) {
      dfd.reject(error)
    }
  }, function err2(error) {
    dfd.reject(error);
  });
  return dfd.promise();
};

FNSP.DiffChecker.getCurrentDraftHtml = function (urlCurrentDraft) {
  var dfd = jQuery.Deferred();
  draftPageHtml = [];
  $.when(FNSP.DiffChecker.getSite(_spPageContextInfo.webAbsoluteUrl + "/" + urlCurrentDraft)).then(function (response) {
    try {
      draftPageHtml.push($(response).find("#page-title"));
      draftPageHtml.push($(response).find(".m_page-ingress"));
      draftPageHtml.push($(response).find("#innledning"));
      draftPageHtml.push($(response).find("#utredning"));
      draftPageHtml.push($(response).find("#behandling"));
      draftPageHtml.push($(response).find("#oppfoelging"));
      draftPageHtml.push($(response).find("#foer"));
      draftPageHtml.push($(response).find("#under"));
      draftPageHtml.push($(response).find("#etter"));
      dfd.resolve(draftPageHtml);
    }
    catch (error) {
      dfd.reject(error);
    }

  }, function feil(error) {    
    dfd.reject(error);
  });  
  return dfd.promise();
}
FNSP.DiffChecker.checkHtmlDiff = function (publishedPageHtml, draftPageHtml) {
  var dfd = jQuery.Deferred();
  var html = "";
  var dmp = new diff_match_patch();
  try {
    publishedPageHtml.forEach(function (element) {
      FNSP.DiffChecker.manipulateInnerText(element);
    });
    draftPageHtml.forEach(function (element) {
      FNSP.DiffChecker.manipulateInnerText(element);
    });
    html = '<style>ins * {background: #e6ffe6;}del * {background: #ffe6e6;} .o_timeline {left: 0 !important}</style> <div class="container"><div class="row"><div class="col-md-8 col-lg-9">'
    for (var i = 0; i < publishedPageHtml.length; i++) {
      var d = dmp.diff_main(publishedPageHtml[i].text(), draftPageHtml[i].text(), false);
      dmp.diff_cleanupSemantic(d);
      var ds = dmp.diff_prettyHtml(d);
      html += ds;
    }
    html += "</div></div></div>";    
    dfd.resolve(html);
  }
  catch (error) {    
    dfd.reject(error);
  }
  return dfd.promise();
}
FNSP.DiffChecker.manipulateInnerText = function (element) {
  var tags = ["div", "section", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ol", "a"]
  tags.forEach(function (tag) {
    element.find(tag).each(function (index, val) {
      if (val.className != "" && tag != "div" && tag != "section" && val.className != "ms-rteElement-expandable") {
        val.innerText = "&lt" + tag + " class='" + val.className + "' " + "&gt " + val.innerText + "&lt/" + tag + "&gt";
      }
      if (tag != "div" && tag != "section") {
        val.innerText = "&lt" + tag + "&gt " + val.innerText + "&lt/" + tag + "&gt";
      }
      if ($(val).css("display") == "none") {
        val.innerText = "";

      }
      if (val.className.indexOf("o_timeline") != -1) {
        val.innerText = val.outerHTML;
      }
    });
  });
  if (element.attr("id") == "page-title") {
    element.text("<h1>" + element.html() + "</h1>")
  }
}
FNSP.DiffChecker.getSite = function (url) {
  dfd = jQuery.Deferred();
  var req = new XMLHttpRequest();
  req.open('GET', url);

  req.onload = function () {
    if (req.status == 200) {
      dfd.resolve(req.response);
    }
    else {
      dfd.reject(Error(req.statusText));
    }
  };
  req.onerror = function () {
    dfd.reject(Error("Network Error"));
  };
  req.send();
  return dfd.promise();
}
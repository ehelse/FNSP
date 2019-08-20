Vue.component('query-configuration', {
    props: ['queryconfig'],
    template:
        '<div class="border-1px">' +
        '<div class="label-row label-listcontrol">Velg filtyper</div>' +
        '<div class="input-row">' +
        '<input type="checkbox" id="pdf" value="FileExtension:pdf" v-model="queryconfig.fileTypes">' +
        '<label for="pdf">PDF&nbsp;</label>' +
        '<input type="checkbox" id="word" value="FileExtension:doc OR FileExtension:docx" v-model="queryconfig.fileTypes">' +
        '<label for="word">Word&nbsp;</label>' +
        '<input type="checkbox" id="excel" value="FileExtension:xls OR FileExtension:xlsx" v-model="queryconfig.fileTypes">' +
        '<label for="excel">Excel&nbsp;</label>' +
        '<input type="checkbox" id="powerpoint" value="FileExtension:ppt OR FileExtension:pptx" v-model="queryconfig.fileTypes">' +
        '<label for="excel">PowerPoint&nbsp;</label>' +
        '</div>' +
        '<div class="label-row">Velg plassering (default er hele nettstedet)</div>' +
        '<div class="input-row">' +
        '<input type="text" placeholder="Begrens til katalog" size="45" v-model="queryconfig.catalog">&nbsp;' +
        '<button class="AssetPicker" @click="editCatalog">&nbsp;(...) Velg plassering&nbsp;</button> <div id="CatalogWarning">ⓘ Ikke valgt område eller katalog</div>' +
        '</div>' +
        '<div class="label-row">Søk på nøkkelord</div>' +
        '<div class="input-row">' +
        '<taxonomy-picker label="Nøkkelord" v-model="queryconfig.keywords"></taxonomy-picker>' +
        '</div>' +
        '<div class="label-row">Vis antall elementer</div>' +
        '<div class="input-row">' +
        '<input v-model.number="queryconfig.rowLimit" type="number" :class="{invalid:queryconfig.rowLimit < 1 || queryconfig.rowLimit > 50}"></br>' +
        '<input type="checkbox" id="showPaging" v-model="queryconfig.showPaging">' +
        '<label for="showPaging">Paging/vis flere-knapp</label>' +
        '</div>' +
        '<div class="label-row">Sorter etter</div>' +
        '<div class="row">' +
        '<div class="input-row col-md-3">' +
        '<select v-model="queryconfig.sorting">' +
        '<option value="FNSPSortTitle">Tittel</option>' +
        '<option value="Created">Opprettet dato</option>' +
        '<option value="FNSPModifiedDate">Endret dato</option>' +
        '</select>' +
        '</div>' +
        '<div class="input-row col-md-3">' +
        '<input type="radio" id="ascending" value="0" v-model="queryconfig.sortOrder">' +
        '<label for="ascending">Stigende</label>' +
        '<br>' +
        '<input type="radio" id="descending" value="1" v-model="queryconfig.sortOrder">' +
        '<label for="descending">Synkende</label>' +
        '<br>' +
        '</div>' +
        '</div>' +
        '<div class="input-row">' +
        '<button class="webpart-save-button" v-on:click="saveQueryConfig">&nbspLagre</button>' +
        '</div>' +
        '<div class="label-row">' +
        '<div id="UpdateSuccess">✔ Webdelen er oppdatert</div>' +
        '<div id="UpdateFail">⛌ Webdelen ble ikke oppdatert</div>' +
        '</div>' +
        '</div>'
    ,
    methods: {
        modifyQuery: function (webPartProperties) {
            var dataProviderJSON = JSON.parse(webPartProperties.get_item("DataProviderJSON"));
            var numberOfItems = webPartProperties.get_item("NumberOfItems");
            var showPaging = webPartProperties.get_item("ShowPaging");

            var expandQueryWithKeywords = function (query, termId) {
                var terms = termId.split(";");
                var keywordsQuery = " ( ";
                for (var i = 0; i < terms.length; i++) {
                    if (i != 0) {
                        keywordsQuery += " OR ";
                    }
                    var termparts = terms[i].split('|');

                    keywordsQuery += '(' + query + ':"'+termparts[0]+'" AND '+query+':"#0'+termparts[1]+'")';
                }
                keywordsQuery += " ) ";
                return keywordsQuery;
            };

            var queryString = "";

            if (!this.queryconfig) {
                return {};
            }
            if (!this.queryconfig.fileTypes || this.queryconfig.fileTypes.length < 1) {
                return {};
            }

            queryString += '('+this.queryconfig.fileTypes.join(' OR ')+')'

            if (!this.queryconfig.catalog) {
                queryString += ' AND path:"{\\SiteCollection.Url}"'
            } else {
                var catalog = this.queryconfig.catalog;
                if (catalog.indexOf("/") === 0) {
                    catalog = catalog.slice(1);
                }
                queryString += ' AND path:"{\\SiteCollection.Url}/'+catalog+'"';
            }
            if (this.queryconfig.keywords) {
                queryString += " AND " + expandQueryWithKeywords("owstaxIdMetadataAllTagsInfo", this.queryconfig.keywords);
            }
            dataProviderJSON.FallbackSortJson = '[{"p":"'+this.queryconfig.sorting+'","d":'+this.queryconfig.sortOrder+'}]';
            numberOfItems = this.queryconfig.rowLimit <= 50 ? this.queryconfig.rowLimit : 50;
            showPaging = this.queryconfig.showPaging;
            dataProviderJSON.QueryTemplate = queryString;

            return { showPaging: showPaging, numberOfItems: numberOfItems, dataProviderJSON: dataProviderJSON };
        },
        editCatalog: function (event) {
            event.preventDefault();
            var $webpart = $(this.$el.parentNode);
            var isFile = function (assetUrl) {
                return (/\.(pdf|docx?|xlsx?|pptx?)$/i).test(assetUrl);
            };
            var setSelectedCatalog = function (result, target) {
                if (result !== 0 && !isFile(target.AssetUrl)) {
                    this.queryconfig.catalog = target.AssetUrl;
                    this.$forceUpdate();
                    $webpart.find('#CatalogWarning').hide();
                } else {
                    $webpart.find('#CatalogWarning').show();
                    console.log('Ikke valgt område eller katalog..');
                }
            };
            var options = {
                title: 'Velg plassering (område/mappe)',
                width: 900,
                height: 800,
                url: '/_layouts/AssetPortalBrowser.aspx',
                dialogReturnValueCallback: Function.createDelegate(
                    this,
                    setSelectedCatalog
                )
            };
            SP.UI.ModalDialog.showModalDialog(options);
        },
        saveQueryConfig: function (event) {

            var modifyQuery = this.modifyQuery;
            var queryConf = this.queryconfig;
            event.preventDefault();
            var dfd = $.Deferred();
            var $webpart = $(this.$el.parentNode);
            var wpId = this.$el.parentNode.parentNode.getAttribute('webpartid');
            FNSP.WebPart.getWebPartProperties(wpId)
                .done(function (webPartProperties, webPartDef, clientContext) {
                    var modifiedProperties = modifyQuery(webPartProperties);
                    var propertiesObject = {
                        CustomQueryConfiguration: JSON.stringify(queryConf)
                    };
                    if (modifiedProperties.numberOfItems) propertiesObject.NumberOfItems = modifiedProperties.numberOfItems;
                    if (modifiedProperties.showPaging) propertiesObject.ShowPaging = modifiedProperties.showPaging;
                    if (modifiedProperties.dataProviderJSON) propertiesObject.DataProviderJSON = JSON.stringify(modifiedProperties.dataProviderJSON);
                    FNSP.WebPart.saveWebPartProperties(wpId, propertiesObject)
                        .done(function () {
                            $webpart.find('#UpdateSuccess').hide('fast');
                            $webpart.find('#UpdateFail').hide('fast');
                            $webpart.find('#UpdateSuccess').show('slow');
                        })
                        .fail(function () {
                            $webpart.find('#UpdateFail').hide('fast');
                            $webpart.find('#UpdateSuccess').hide('fast');
                            $webpart.find('#UpdateFail').show('slow');
                        });
                })
                .fail(function (err) {
                    dfd.reject(err);
                });

        }
    },
    mounted: function () {
        console.log(this.queryconfig);

        this.webpartNode = this.$el.parentNode.parentNode.parentNode;
        this.vueComponentParent = this.$el.parentNode.parentNode;
        this.vueComponent = this.$el.parentNode;
        this.webpartNode.insertBefore(this.vueComponent, this.webpartNode.childNodes[0]);

    }
});

Vue.component('taxonomy-picker', {
    template:
        '<div class="taxonomyinput">' +
        '<input type="hidden" class="taxpickerinput">' +
        '<input ref="input" class="taxpickerhiddenvalue" type="hidden" :value="value">' +
        '</div>',
    props: {
        value: {
            type: Text
        },
        label: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            value: '',

        };
    },
    mounted: function () {
        var self = this;
        var termsetId = FNSP.Current.KeywordsTermSet;
        var termPickerIsMulti = true;

        var context = new SP.ClientContext();
        var existingValue = $(this.$el)
            .find('.taxpickerhiddenvalue')
            .val();
        if (existingValue && existingValue.indexOf('|') > -1) {
            var initialValues = [];
            existingValue.split(';').forEach(function (element) {
                if (element.indexOf('|') > -1) {
                    initialValues.push(element.split('|')[0]);
                }
            });
            $(this.$el)
                .find('.taxpickerinput')
                .taxpicker(
                    {
                        isMulti: termPickerIsMulti,
                        allowFillIn: false,
                        termSetId: termsetId,
                        useContainsSuggestions: true,
                        initialLabels: initialValues
                    },
                    context,
                    function () {
                        self.updateValue(self);
                    }
                );
        } else {
            $(this.$el)
                .find('input')
                .taxpicker(
                    {
                        isMulti: termPickerIsMulti,
                        allowFillIn: false,
                        termSetId: termsetId,
                        useContainsSuggestions: true
                    },
                    context,
                    function () {
                        self.updateValue(self);
                    }
                );
        }
    },

    methods: {
        updateValue: function (element) {
            console.log('Update value triggered');
            var input = $(element.$el).find('.taxpickerinput');
            if (input.length !== 1) return;
            var value = input.val();
            if (value === '[]' || value === '') {
                this.$emit('input', '');
                return;
            }

            if (value !== '[]') {
                var selectedValues = JSON.parse(value);
                if (
                    selectedValues.length > 0 &&
                    selectedValues[0].Id !== undefined
                ) {
                    var outputValue = '';
                    for (var i = 0; i < selectedValues.length; i++) {
                        if (i === selectedValues.length - 1) {
                            outputValue +=
                                selectedValues[i].Name +
                                '|' +
                                selectedValues[i].Id;
                        } else {
                            outputValue +=
                                selectedValues[i].Name +
                                '|' +
                                selectedValues[i].Id +
                                ';';
                        }
                    }
                    this.$emit('input', outputValue);
                }
            }
        }
    }
});

$(document).on('click', '.cam-taxpicker-editor', function () {
    $(this).attr('unselectable', 'off');
});
$(document).on('click', '.taxonomyinput', function () {
    $(this).attr('unselectable', 'off');
});

$(window).on('load', function () {



    setTimeout(function () {
        $('.configurable-cbs.settings-panel').keydown(function (event) {
            event.stopPropagation();
        });
    }, 1000);
});
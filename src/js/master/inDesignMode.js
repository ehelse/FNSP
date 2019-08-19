// #designmode =====================================================
// Checks if page is in design mode
function inDesignMode() {
    var result =
        window.MSOWebPartPageFormName !== undefined &&
        ((document.forms[window.MSOWebPartPageFormName] &&
            document.forms[window.MSOWebPartPageFormName]
                .MSOLayout_InDesignMode &&
            '1' ===
                document.forms[window.MSOWebPartPageFormName]
                    .MSOLayout_InDesignMode.value) ||
            (document.forms[window.MSOWebPartPageFormName] &&
                document.forms[window.MSOWebPartPageFormName]._wikiPageMode &&
                'Edit' ===
                    document.forms[window.MSOWebPartPageFormName]._wikiPageMode
                        .value));
    return result || false;
}

window.inDesignMode = inDesignMode;

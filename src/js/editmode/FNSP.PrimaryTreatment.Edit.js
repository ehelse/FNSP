FNSP.Current.PrimaryTreatmentWebPart = {
    init: function($button) {
        var ptwp = this;
        this.selectedTreatment;
        this.selectedHospital;
        this.selectedListItemId;
        this.selectedLocation = '0';
        this.renderer;
        this.introText = '';
        this.treatmentLocationConfiguration = [];

        this.webpartId = $button
            .parent()
            .parent()
            .attr('webpartid');
        this.currentWebPart = $("div[webpartid='" + this.webpartId + "']");

        //Workaround so webpart is not accidentally deleted from rich text field, especially in IE
        setTimeout(function() {
            $('.cam-taxpicker-editor').click(function(event) {
                $(this).focus();
            });
        }, 1000);
        
        this.treatmentPickerInput = this.currentWebPart.find(
            '.taxpickerTreatment'
        );
        this.isCommonText = $('html').attr('class') === 'commontext';
        this.commonTextSite;
        FNSP.WebPart.getWebPartProperties(this.webpartId).done(function(
            webPartProperties,
            webPartDef,
            clientContext
        ) {
            ptwp.selectedTreatment = webPartProperties.get_item(
                'TreatmentTermId'
            );
            ptwp.selectedHospital = webPartProperties.get_item(
                'RepositorySiteId'
            );
            ptwp.selectedListItemId = webPartProperties.get_item('ListItemId');
            ptwp.selectedLocation = webPartProperties.get_item(
                'LocationConfigurationKey'
            );
            ptwp.renderer = webPartProperties.get_item('Renderer');
            ptwp.introText = webPartProperties.get_item('Introduction');
            ptwp.currentWebPart
                .find('#PrimaryTreatmentWebPartSave')
                .on('click', function(event) {
                    event.preventDefault();
                    ptwp.saveWebPartProperties(ptwp.webpartId);
                });
            ptwp.initTaxPicker(ptwp);
            if (ptwp.introText !== '') {
                ptwp.currentWebPart
                    .find('.treatmentIntroText')
                    .val(ptwp.introText);
            }
            ptwp.populateHospitalDropDown().done(function(value) {
                ptwp.currentWebPart.find('.selectwebsite').change(function() {
                    ptwp.hospitalSelected(this);
                });
                ptwp.currentWebPart.find('.selectpage').change(function() {
                    ptwp.pageSelected(this);
                });
                ptwp.currentWebPart.find('.selectlocation').change(function() {
                    ptwp.locationSelected(this);
                });
                if (
                    ptwp.selectedHospital &&
                    SP.Guid.get_empty()._m_guidString$p$0 !==
                        ptwp.selectedHospital._m_guidString$p$0 &&
                    !ptwp.isCommonText
                ) {
                    ptwp.currentWebPart
                        .find('.selectwebsite')
                        .val(ptwp.selectedHospital._m_guidString$p$0)
                        .change();
                } else if (
                    (!ptwp.selectedHospital ||
                        SP.Guid.get_empty()._m_guidString$p$0 ===
                            ptwp.selectedHospital._m_guidString$p$0) &&
                    !ptwp.isCommonText
                ) {
                    var defaultValue = ptwp.currentWebPart
                        .find('.selectwebsite option:contains(eget HF)')
                        .val();
                    ptwp.currentWebPart
                        .find('.selectwebsite')
                        .val(defaultValue)
                        .change();
                } else if (ptwp.isCommonText) {
                    ptwp.currentWebPart
                        .find('.selectwebsite')
                        .parent()
                        .hide();
                    ptwp.currentWebPart
                        .find('.selectpage')
                        .parent()
                        .hide();
                    ptwp.selectedListItemId = 0;
                }
            });
        });
    },
    initTaxPicker: function(ptwp) {
        var termsetId = '7fb60b60-5f1d-4980-a7c7-10dbc55bf206';
        var context = new SP.ClientContext();
        if (
            ptwp.selectedTreatment &&
            ptwp.selectedTreatment.indexOf('|') > -1
        ) {
            var selectedTreatmentParts = ptwp.selectedTreatment.split('|');
            this.treatmentPickerInput.taxpicker(
                {
                    isMulti: false,
                    allowFillIn: false,
                    termSetId: termsetId,
                    useContainsSuggestions: true,
                    maxSuggestions: 25,
                    initialLabels: [selectedTreatmentParts[0]]
                },
                context,
                function() {
                    ptwp.treatmentTermUpdated();
                }
            );
        } else {
            this.treatmentPickerInput.taxpicker(
                {
                    isMulti: false,
                    allowFillIn: false,
                    termSetId: termsetId,
                    useContainsSuggestions: true,
                    termID: '',
                    termName: ''
                },
                context,
                function() {
                    ptwp.treatmentTermUpdated();
                }
            );
        }
    },
    hospitalSelected: function(element) {
        var self = this;
        if ($(element).val() !== '-1') {
            this.selectedHospital = $(element).val();
            if (this.selectedHospital && this.selectedTreatment) {
                this.fetchPageItems().done(function(value) {
                    if (self.selectedListItemId) {
                        self.currentWebPart
                            .find('.selectpage')
                            .val(self.selectedListItemId)
                            .change();
                    }
                });
            }
        }
    },
    pageSelected: function(element) {
        var self = this;
        this.currentWebPart
            .find('.selectlocation')
            .parent()
            .hide();
        this.currentWebPart.find('.selectlocation-label').hide();
        this.currentWebPart.find('.selectlocation').empty();
        this.selectedListItemId = $(element).val();
        var listItemIdLookup = parseInt(this.selectedListItemId);
        var selectedConfig = $.grep(
            this.treatmentLocationConfiguration,
            function(e) {
                return e.ItemId === listItemIdLookup;
            }
        );
        if (selectedConfig.length > 0) {
            if (selectedConfig[0].LocationConfiguration !== undefined) {
                console.log(selectedConfig[0].LocationConfiguration);
                this.currentWebPart.find('.selectlocation').append(
                    $('<option>', {
                        value: '0',
                        text: 'La bruker velge'
                    })
                );
                this.currentWebPart.find('.selectlocation').append(
                    $('<option>', {
                        value: 'USELOCATIONFROMCONFIG',
                        text: 'Bruk valgt sted fra denne siden'
                    })
                );
                this.currentWebPart.find('.selectlocation').append(
                    $('<option>', {
                        value: 'USEDEPARTMENTFROMCONFIG',
                        text: 'Bruk valgt avdeling fra denne siden'
                    })
                );
                $.each(selectedConfig[0].LocationConfiguration, function(
                    i,
                    item
                ) {
                    self.currentWebPart.find('.selectlocation').append(
                        $('<option>', {
                            value: item.furlTitle,
                            text: item.title
                        })
                    );
                });
                if (self.selectedLocation) {
                    self.currentWebPart
                        .find('.selectlocation')
                        .val(self.selectedLocation);
                }
                self.currentWebPart
                    .find('.selectlocation')
                    .parent()
                    .show();
                this.currentWebPart.find('.selectlocation-label').show();
            }
        } else {
            self.selectedLocation = '0';
        }
    },
    locationSelected: function(element) {
        this.selectedLocation = $(element).val();
    },
    treatmentTermUpdated: function() {
        if (this.treatmentPickerInput.val() !== '[]') {
            var treatmentSelectedValue = JSON.parse(
                this.treatmentPickerInput.val()
            );
            if (
                treatmentSelectedValue.length === 1 &&
                treatmentSelectedValue[0].Id !== undefined
            ) {
                this.selectedTreatment =
                    treatmentSelectedValue[0].Name +
                    '|' +
                    treatmentSelectedValue[0].Id;
            }
        }
        if (this.selectedHospital && this.selectedTreatment) {
            this.fetchPageItems().done(function(value) {
                if (self.selectedListItemId) {
                    self.currentWebPart
                        .find('.selectpage')
                        .val(self.selectedListItemId);
                }
            });
        }
    },
    populateHospitalDropDown: function() {
        var dfd = $.Deferred();
        var serviceUri =
            _spPageContextInfo.webAbsoluteUrl +
            '/_vti_bin/FNSP/JsonRpc.svc/Call';
        var self = this;
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: serviceUri,
            dataType: 'json',
            data: JSON.stringify({
                method: 'primarytreatmentconfig',
                params: ['fetchhospitals']
            }),
            success: function(response) {
                if (!response.error) {
                    var results = JSON.parse(response.result);
                    $.each(results, function(i, item) {
                        if (item.indexOf('CommonText') > -1 && self.isCommonText) {
                            console.log('is common text, repository is empty guid..')
                            self.selectedHospital = SP.Guid.get_empty()._m_guidString$p$0;
                        } else if (item.indexOf('CommonText') === -1) {
                            self.currentWebPart.find('.selectwebsite').append(
                                $('<option>', {
                                    value: i,
                                    text: item
                                })
                            );
                        }
                    });
                    dfd.resolve('success');
                } else {
                    console.log(response.error);
                    dfd.reject('Failed to get hospitals');
                }
            },
            error: function(jqXHR, txtStatus, errorThrown) {
                console.log(txtStatus + ' - ' + errorThrown);
            }
        });
        return dfd.promise();
    },
    fetchPageItems: function() {
        var dfd = $.Deferred();
        var serviceUri =
            _spPageContextInfo.webAbsoluteUrl +
            '/_vti_bin/FNSP/JsonRpc.svc/Call';
        var selectedTreatmentTerm = this.selectedTreatment;
        if (selectedTreatmentTerm.indexOf('|') > -1) {
            selectedTreatmentTerm = selectedTreatmentTerm.split('|')[1];
        }

        var self = this;
        this.currentWebPart.find('.selectpage').empty();
        this.currentWebPart.find('.selectpage').append(
            $('<option>', {
                value: '0',
                text: 'La bruker velge'
            })
        );
        var renderer = 'PrimaryTreatment';

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: serviceUri,
            dataType: 'json',
            data: JSON.stringify({
                method: 'primarytreatmentconfig',
                params: [
                    'fetchtreatments',
                    FNSP.Current.LCID,
                    this.selectedHospital,
                    selectedTreatmentTerm,
                    renderer
                ]
            }),
            success: function(response) {
                if (!response.error) {
                    var results = JSON.parse(response.result);
                    $.each(results, function(i, item) {
                        self.currentWebPart.find('.selectpage').append(
                            $('<option>', {
                                value: item.itemId,
                                text: item.title
                            })
                        );
                        if (item.treatmentLocationConfiguration !== undefined) {
                            self.treatmentLocationConfiguration.push({
                                ItemId: item.itemId,
                                LocationConfiguration:
                                    item.treatmentLocationConfiguration
                            });
                        }
                    });
                    dfd.resolve('success');
                } else {
                    console.log(response.error);
                    dfd.reject('Failed to get treatments');
                }
            },
            error: function(jqXHR, txtStatus, errorThrown) {
                console.log(txtStatus + ' - ' + errorThrown);
            }
        });
        return dfd.promise();
    },
    saveWebPartProperties: function(webpartId) {
        var self = this;
        this.currentWebPart.find('#UpdateSuccess').hide();
        this.currentWebPart.find('#UpdateFail').hide();
        if (!this.selectedTreatment || !this.selectedHospital) {
            this.currentWebPart.find('#UpdateFail').show('slow');
            return;
        }
        FNSP.WebPart.saveWebPartProperties(webpartId, {
            TreatmentTermId: self.selectedTreatment,
            RepositorySiteId: new SP.Guid(self.selectedHospital),
            ListItemId: parseInt(self.selectedListItemId),
            LocationConfigurationKey: self.selectedLocation,
            Introduction: self.currentWebPart.find('.treatmentIntroText').val()
        })
            .done(function() {
                self.currentWebPart.find('#UpdateSuccess').show('slow');
            })
            .fail(function() {
                self.currentWebPart.find('#UpdateFail').show('slow');
            });
    }
};

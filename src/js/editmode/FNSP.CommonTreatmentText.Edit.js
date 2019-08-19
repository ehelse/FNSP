//Dette er rotete... lykke til!
FNSP.Current.CommonTreatmentTextWebPart = {
    init: function($button) {
        var ctwp = this;

        //Value from WebPart property ConfigurationStore
        this.configurationsInWebPart = '';

        this.selectedTreatment;
        this.selectedHospital;
        this.currentConfiguration;
        this.primaryTreatmentConfigurations = {};
        this.treatmentLocationConfiguration = [];

        this.webpartId = $button
            .parent()
            .parent()
            .attr('webpartid');
        this.currentWebPart = $("div[webpartid='" + this.webpartId + "']");

        //Get values from hidden fields to make request later
        this.currentFieldName = this.currentWebPart
            .find("input[id*='CurrentField']")
            .val();
        this.currentContentType = this.currentWebPart
            .find("input[id*='CurrentContentType']")
            .val();
        this.currentPageTermGuid = this.currentWebPart
            .find("input[id*='CurrentTermGuid']")
            .val();

        //Set up dropdown lists
        this.currentWebPart.find('.selectwebsite').change(function() {
            ctwp.hospitalSelected(this);
        });
        this.currentWebPart.find('.selecttreatment').change(function() {
            ctwp.treatmentSelected(this);
        });
        this.currentWebPart.find('.selectpage').change(function() {
            ctwp.pageSelected(this);
        });
        this.currentWebPart.find('.selectlocation').change(function() {
            ctwp.locationSelected(this);
        });

        //Set up save button
        this.currentWebPart
            .find('#CommonTreatmentTextWebPartSave')
            .on('click', function(event) {
                event.preventDefault();
                ctwp.saveWebPartProperties(ctwp.webpartId);
            });

        FNSP.WebPart.getWebPartProperties(this.webpartId).done(function(
            webPartProperties,
            webPartDef,
            clientContext
        ) {
            var configs = webPartProperties.get_item('ConfigurationStore');
            if (configs) {
                ctwp.configurationsInWebPart = configs;
            }
            console.log(ctwp.configurationsInWebPart);
            ctwp.populateTreatmentDropDown().done(function(value) {
                //Select first treatment..
                ctwp.selectedTreatment = ctwp.currentWebPart
                    .find('.selecttreatment')
                    .val();
                ctwp.populateHospitalDropDown().done(function(value) {
                    if (ctwp.primaryTreatmentConfigurations) {
                        console.log(ctwp.primaryTreatmentConfigurations);
                        ctwp.currentConfiguration =
                            ctwp.primaryTreatmentConfigurations[
                                ctwp.selectedTreatment
                            ];
                    }
                    if (ctwp.currentConfiguration) {
                        console.log(ctwp.currentConfiguration);

                        //Select hospital site to use, default is own site..
                        if (ctwp.currentConfiguration.RepositorySiteId) {
                            if (
                                SP.Guid.get_empty()._m_guidString$p$0 !==
                                ctwp.currentConfiguration.RepositorySiteId
                            ) {
                                ctwp.currentWebPart
                                    .find('.selectwebsite')
                                    .val(
                                        ctwp.currentConfiguration
                                            .RepositorySiteId
                                    )
                                    .change();
                            } else {
                                var defaultValue = ctwp.currentWebPart
                                    .find(
                                        '.selectwebsite option:contains(eget HF)'
                                    )
                                    .val();
                                ctwp.currentWebPart
                                    .find('.selectwebsite')
                                    .val(defaultValue)
                                    .change();
                            }
                        }
                    }
                });
            });
        });
    },
    populateTreatmentDropDown: function() {
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
                params: [
                    'fetchtreatmentsincommontext',
                    FNSP.Current.LCID,
                    this.currentContentType,
                    this.currentPageTermGuid,
                    this.currentFieldName,
                    this.configurationsInWebPart
                ]
            }),
            success: function(response) {
                if (!response.error) {
                    var results = JSON.parse(response.result);
                    $.each(results, function(i, item) {
                        self.currentWebPart.find('.selecttreatment').append(
                            $('<option>', {
                                value: item.treatmentId,
                                text: item.treatmentTitle
                            })
                        );
                        //Convert configuration to PascalCase object so it can be parsed correctly server side.
                        //Skipping renderer so this is kept from the common text..
                        var pascalCaseConfiguration = {};
                        for (var key in item.configuration) {
                            if (
                                item.configuration.hasOwnProperty(key) &&
                                key.indexOf('renderer') === -1
                            ) {
                                console.log(
                                    key + ' -> ' + item.configuration[key]
                                );

                                var pascalKey = key.replace(
                                    /(\w)(\w*)/g,
                                    function(g0, g1, g2) {
                                        return g1.toUpperCase() + g2;
                                    }
                                );
                                pascalCaseConfiguration[pascalKey] =
                                    item.configuration[key];
                            }
                        }
                        self.primaryTreatmentConfigurations[
                            item.treatmentId
                        ] = pascalCaseConfiguration;
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
    populateHospitalDropDown: function() {
        var dfd = $.Deferred();
        var serviceUri =
            _spPageContextInfo.webAbsoluteUrl +
            '/_vti_bin/FNSP/JsonRpc.svc/Call';
        this.currentWebPart.find('.selectwebsite').empty();
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
                        if (
                            item.indexOf('CommonText') > -1 &&
                            self.isCommonText
                        ) {
                            self.selectedHospital = i;
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
    hospitalSelected: function(element) {
        var self = this;
        if ($(element).val() !== '-1') {
            this.selectedHospital = $(element).val();
            if (this.selectedHospital && this.selectedTreatment) {
                this.fetchPageItems().done(function(value) {
                    if (self.currentConfiguration) {
                        if (self.currentConfiguration.RepositorySiteId) {
                            self.currentConfiguration.RepositorySiteId =
                                self.selectedHospital;
                        }

                        if (
                            self.currentConfiguration.ListItemId !== undefined
                        ) {
                            self.currentWebPart
                                .find('.selectpage')
                                .val(self.currentConfiguration.ListItemId)
                                .change();
                        }
                    }
                });
            }
        }
    },
    treatmentSelected: function(element) {
        this.selectedTreatment = $(element).val();
        if (this.primaryTreatmentConfigurations) {
            this.currentConfiguration = this.primaryTreatmentConfigurations[
                $(element).val()
            ];
        }
        if (this.currentConfiguration.RepositorySiteId) {
            if (
                SP.Guid.get_empty()._m_guidString$p$0 !==
                this.currentConfiguration.RepositorySiteId
            ) {
                this.currentWebPart
                    .find('.selectwebsite')
                    .val(this.currentConfiguration.RepositorySiteId)
                    .change();
            } else {
                var defaultValue = this.currentWebPart
                    .find('.selectwebsite option:contains(eget HF)')
                    .val();
                this.currentWebPart
                    .find('.selectwebsite')
                    .val(defaultValue)
                    .change();
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
        if (
            this.currentConfiguration &&
            this.currentConfiguration.ListItemId !== undefined
        ) {
            this.currentConfiguration.ListItemId = listItemIdLookup;
        }
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
                if (
                    this.currentConfiguration &&
                    this.currentConfiguration.LocationConfigurationKey
                ) {
                    this.currentWebPart
                        .find('.selectlocation')
                        .val(
                            this.currentConfiguration.LocationConfigurationKey
                        );
                }
                this.currentWebPart
                    .find('.selectlocation')
                    .parent()
                    .show();
                this.currentWebPart.find('.selectlocation-label').show();
            }
        } else {
            if (
                this.currentConfiguration &&
                this.currentConfiguration.LocationConfigurationKey
            ) {
                this.currentConfiguration.LocationConfigurationKey = '';
            }
        }
    },
    locationSelected: function(element) {
        if (
            this.currentConfiguration &&
            this.currentConfiguration.LocationConfigurationKey !== undefined
        ) {
            this.currentConfiguration.LocationConfigurationKey = $(
                element
            ).val();
        }
    },
    saveWebPartProperties: function(webpartId) {
        var self = this;
        this.currentWebPart.find('#UpdateSuccess').hide();
        this.currentWebPart.find('#UpdateFail').hide();
        if (!this.primaryTreatmentConfigurations) {
            this.currentWebPart.find('#UpdateFail').show('slow');
            return;
        }
        FNSP.WebPart.saveWebPartProperties(webpartId, {
            ConfigurationStore: JSON.stringify(
                this.primaryTreatmentConfigurations
            )
        })
            .done(function() {
                self.currentWebPart.find('#UpdateSuccess').show('slow');
            })
            .fail(function() {
                self.currentWebPart.find('#UpdateFail').show('slow');
            });
    }
};

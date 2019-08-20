FNSP = FNSP || {};
FNSP.Current = FNSP.Current || {};
(function() {
    Vue.component('location-item', {
        template:
            '<li v-on:click=="editItem(location)" v-bind:class="{ ""txt-error"": !loc.valid }">' +
            '<input :id="location.id" type="radio" :checked="loc === selectedObject" name="title"></input>' +
            '<label :for="location.id">{{location.title}}</label>' +
            '<button @click="removeItem(location, $event)" class="DeleteButton"></button>' +
            '<button @click="editItem(location, $event)" class="EditButton"></button>' +
            '<button class="UpButton" @click="moveItemUp(location, $event)"/>' +
            '<button class="DownButton" @click="moveItemDown(location, $event)"/>' +
            '</li>',
        props: ['location', 'locations']
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
        data: function() {
            return {
                value: ''
            };
        },
        mounted: function() {
            var self = this;
            var termsetId = '';
            var termPickerIsMulti = false;
            if (self.label === 'Department') {
                termsetId = FNSP.Current.DepartmentTermSet;
            }
            if (self.label === 'Locations') {
                termsetId = FNSP.Current.LocationTermSet;
                termPickerIsMulti = true;
            }
            var context = new SP.ClientContext();
            var existingValue = $(this.$el)
                .find('.taxpickerhiddenvalue')
                .val();
            if (existingValue && existingValue.indexOf('|') > -1) {
                var initialValues = [];
                existingValue.split(';').forEach(function(element) {
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
                        function() {
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
                        function() {
                            self.updateValue(self);
                        }
                    );
            }
        },

        methods: {
            updateValue: function(element) {
                var input = $(element.$el).find('.taxpickerinput');
                if (input.length !== 1) return;
                var value = input.val();
                if(value === '[]' || value === ''){
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

    var pageSettings = $("textarea[title='Lokasjonskonfigurasjoner']").val();
    var parsedLocations = pageSettings ? JSON.parse(pageSettings) : [];
    FNSP.Current.VueLocations = new Vue({
        el: '#locationConfiguration-container',
        template: '#locations-template',
        data: {
            locations: parsedLocations,
            selectedObject: parsedLocations.length
                ? parsedLocations[0]
                : undefined
        },
        methods: {
            addItem: function(event) {
                if (event) event.preventDefault();
                var newLocation = {
                    index: this.locations.length,
                    id: 'locationId_' + this.locations.length,
                    title: '',
                    titleExtension: '',
                    department: '',
                    locations: '',
                    valid: true
                };
                this.locations.push(newLocation);
                this.selectedObject = newLocation;
            },
            removeItem: function(selected, event) {
                if (event) event.preventDefault();
                this.locations = this.locations.filter(function(e) {
                    return e !== selected;
                });
                if (this.selectedObject === selected) {
                    this.editItem(this.locations[0]);
                }
            },
            editItem: function(selected, event) {
                if (event) event.preventDefault();
                this.selectedObject = selected;
            },
            moveItemUp: function(selected, event) {
                event.preventDefault();
                this.editItem(selected);
                var locations = this.locations;
                var index = locations.indexOf(selected);
                if (index === 0) return;
                this.moveItem(locations, index, index - 1);
            },
            moveItemDown: function(selected, event) {
                event.preventDefault();
                this.editItem(selected);
                var locations = this.locations;
                var index = locations.indexOf(selected);
                if (index === locations.length - 1) return;
                this.moveItem(locations, index, index + 1);
            },
            moveItem: function(locations, old_index, target_index) {
                var index = target_index,
                    next_link_to_move = this.locations[index];
                locations[index] = locations[old_index];

                while (index !== old_index) {
                    target_index =
                        old_index > target_index ? index + 1 : index - 1;
                    var tmp_next_link_to_move = locations[target_index];
                    locations.splice(target_index, 1, next_link_to_move);
                    next_link_to_move = tmp_next_link_to_move;
                    index = target_index;
                }
            }
        },
        filters: {
            PrettyTaxonomyFormat: function(taxonomyValue) {
                if (taxonomyValue) {
                    if (taxonomyValue.indexOf('|') > -1) {
                        return taxonomyValue.split('|')[0];
                    }
                } else {
                    return taxonomyValue;
                }
            }
        },
        watch: {
            locations: {
                handler: function(something) {
                    if(something.length === 0) {
                        $("textarea[title='Lokasjonskonfigurasjoner']").val('');    
                    }
                    else {
                        $("textarea[title='Lokasjonskonfigurasjoner']").val(
                            JSON.stringify(something)
                        );
                    }
                    
                    this.locations.forEach(function(e) {
                        if (!e.title || !e.titleExtension) {
                            e.valid = false;
                        } else {
                            e.valid = true;
                        }
                    });
                },
                deep: true
            }
        }
    });
})();

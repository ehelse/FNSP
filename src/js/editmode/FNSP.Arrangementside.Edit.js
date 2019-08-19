FNSP = FNSP || {};
FNSP.Current = FNSP.Current || {};
(function() {
    Vue.component('date-picker', {
        template:
            '<input\
                    ref="input"\
                    v-bind:value="value"\
                    v-on:input="updateValue($event.target.value)">',
        props: {
            value: {
                type: Date
            },
            label: {
                type: String,
                default: ''
            }
        },
        mounted: function() {
            var self = this;
            $(this.$el).flatpickr({
                enableTime: true,
                minDate: 'today',
                locale: 'no',
                time_24hr: true,
                onOpen: [
                    function(selectedDates, dateStr, instance) {
                        this.setDate(this.parseDate(dateStr));
                    }
                ]
            });
        },

        methods: {
            updateValue: function(value) {
                var dateComponents = value.split('-');
                var dayAndTimeComponents = dateComponents[2].split(' ');
                value =
                    dateComponents[1] +
                    '/' +
                    dayAndTimeComponents[0] +
                    '/' +
                    dateComponents[0] +
                    ' ' +
                    dayAndTimeComponents[1];
                var tzoffset =
                    new Date(Date.parse(value)).getTimezoneOffset() * 60000;
                var d = new Date(Date.parse(value) - tzoffset);
                this.$emit('input', d.toISOString().substring(0, 16));
            }
        }
    });

    var pageSettings = $("textarea[title='RepeatableConfiguration']").val();
    var parsedEvents = pageSettings ? JSON.parse(pageSettings) : [];
    FNSP.Current.VueGjentakende = new Vue({
        el: '#gjentakende-container',
        template: '#gjentakende-template',
        data: {
            events: parsedEvents,
            selectedObject: parsedEvents.length ? parsedEvents[0] : undefined
        },
        methods: {
            addItem: function(type, event) {
                if (event) event.preventDefault();

                var startDate,
                    endDate = '';
                var tzoffset = 0;
                if (type === 'uke' && this.selectedObject) {
                    var d = new Date(Date.parse(this.selectedObject.startDate));
                    d.setHours(d.getHours() + 7 * 24);
                    tzoffset =
                        new Date(Date.parse(d)).getTimezoneOffset() * 60000;
                    d = new Date(Date.parse(d) - tzoffset);
                    startDate = d.toISOString().substring(0, 16);

                    d = new Date(Date.parse(this.selectedObject.endDate));
                    d.setHours(d.getHours() + 7 * 24);
                    tzoffset =
                        new Date(Date.parse(d)).getTimezoneOffset() * 60000;
                    d = new Date(Date.parse(d) - tzoffset);
                    endDate = d.toISOString().substring(0, 16);
                } else if (type === 'mnd' && this.selectedObject) {
                    var d = new Date(Date.parse(this.selectedObject.startDate));
                    d.setMonth(d.getMonth() + 1);
                    tzoffset =
                        new Date(Date.parse(d)).getTimezoneOffset() * 60000;
                    d = new Date(Date.parse(d) - tzoffset);
                    startDate = d.toISOString().substring(0, 16);

                    d = new Date(Date.parse(this.selectedObject.endDate));
                    d.setMonth(d.getMonth() + 1);
                    tzoffset =
                        new Date(Date.parse(d)).getTimezoneOffset() * 60000;
                    d = new Date(Date.parse(d) - tzoffset);
                    endDate = d.toISOString().substring(0, 16);
                } else if (this.selectedObject) {
                    startDate = this.selectedObject.startDate;
                    endDate = this.selectedObject.endDate;
                }

                var newEvent = {
                    index: this.events.length,
                    id: 'eventId_' + this.events.length,
                    startDate: startDate,
                    endDate: endDate,
                    eventTimeDescription: '',
                    heading: '',
                    description: '',
                    eventRegistrationLink: '',
                    eventRegistrationLinkText: '',
                    valid: true
                };
                this.events.push(newEvent);
                this.selectedObject = newEvent;
                this.events.sort(this.sortEvents);
            },
            sortEvents: function(a, b) {
                var date = Date.parse(a.startDate) - Date.parse(b.startDate);
                return date ? date : a.index - b.index;
            },
            removeItem: function(selected, event) {
                if (event) event.preventDefault();
                this.events = this.events.filter(function(e) {
                    return e !== selected;
                });
                if (this.selectedObject === selected) {
                    this.editItem(this.events[0]);
                }
            },
            editItem: function(selected, event) {
                if (event) event.preventDefault();
                this.selectedObject = selected;
                this.events.sort(this.sortEvents);
            },
            isValidOrNotSet: function(e) {
                if (e.startDate && e.endDate) {
                    return Date.parse(e.startDate) <= Date.parse(e.endDate);
                }
                return true;
            }
        },
        filters: {
            PrettyTimeFormat: function(defaultFormat) {
                if (defaultFormat) {
                    return new Date(defaultFormat).toLocaleDateString('no-NB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    });
                } else {
                    return 'Ikke satt';
                }
            }
        },
        watch: {
            events: {
                handler: function(something) {
                    $("textarea[title='RepeatableConfiguration']").val(
                        JSON.stringify(something)
                    );
                    this.events.forEach(function(e) {
                        e.valid =
                            Date.parse(e.startDate) <= Date.parse(e.endDate);
                    });
                },
                deep: true
            }
        }
    });
})();

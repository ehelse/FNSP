FNSP = FNSP || {};
FNSP.Current = FNSP.Current || {};

// Quill init
var bindings = {
    list: {
        key: 'backspace',
        handler: function(range, context) {
            event.stopPropagation();
            // Quill default
            return true;
        }
    }
};

var toolbarOptions = {
    container: ['bold', 'italic', 'underline', 'link', 'image'],
    handlers: {
        link: function(value) {
            if (value) {
                var href = prompt('Enter the URL');
                this.quill.format('link', href);
            } else {
                this.quill.format('link', false);
            }
        },
        image: function(value) {}
    }
};

FNSP.Current.TimeLineFunctions = {
    NewEditor: function(selected_element) {
        var quill = new Quill(selected_element, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions,
                keyboard: {
                    bindings: bindings
                }
            }
        });

        function imagePicker() {
            var setSelectedPage = function(result, target) {
                if (result !== 0 && target.AssetUrl.match('.jpg$') != null) {
                    const range = quill.getSelection();
                    console.log(target.AssetUrl);
                    quill.insertEmbed(range.index, 'image', target.AssetUrl);
                } else {
                    console.log('Ikke valgt bilde');
                }
            };
            var options = {
                title: 'Velg bilde',
                width: 900,
                height: 800,
                url: '/_layouts/AssetImagePicker.aspx',
                dialogReturnValueCallback: Function.createDelegate(
                    this,
                    setSelectedPage
                )
            };
            SP.UI.ModalDialog.showModalDialog(options);
        }

        function linkPicker() {
            var setSelectedPage = function(result, target) {
                if (result !== 0 && target.AssetUrl.match('(.aspx|.pdf|.PDF|.docx|.DOCX|.pptx|.PPTX|.xslx|.XSLX|.doc|.DOC)$') != null) {
                    const range = quill.getSelection();
                    console.log(target.AssetUrl);
                    quill.insertEmbed(range.index, 'link', target.AssetUrl);
                } else {
                    console.log('Ikke valgt side');
                }
            };
            var options = {
                title: 'Velg side',
                width: 900,
                height: 800,
                url: '/_layouts/AssetPortalBrowser.aspx',
                dialogReturnValueCallback: Function.createDelegate(
                    this,
                    setSelectedPage
                )
            };
            SP.UI.ModalDialog.showModalDialog(options);
        }

        var toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', imagePicker);
        toolbar.addHandler('link', linkPicker);
    }
};

Vue.component('timeline-item', {
    props: ['step', 'timeline'],
    template:
        '<li><button class="UpButton" @click="moveItemUp"/><button class="DownButton" @click="moveItemDown"/><button class="DeleteButton" @click="deleteItem" />' +
        '<h3> {{ step.Title }}</h3> <p v-html="step.Contents"></p> <figure v-if="step.PictureLink" class=""><img :src="step.PictureLink" :alt="step.PictureAltText" /><figcaption>{{ step.PictureCaption }}</figcaption></figure> <a :href="step.Link">{{ step.LinkTitle }}</a>' +
        '<div class="editor" :id="step.ID"></div> <div :id="step.ID" class="editItem"><input type="text" maxlength="100" placeholder="Navn på steg" class="full-width-input" v-model="step.Title" /><br /><textarea class="full-width-input" v-model="step.Contents"/><br /><input type="text" placeholder="Bilde i tidslinjesteg" v-model="step.PictureLink" /><button @click="editPicture" class="AssetPicker"/><br /><input type="text" class="full-width-input" placeholder="Alternativ bildetekst" v-model="step.PictureAltText" /><br /><input type="text" placeholder="Bildekreditering" class="full-width-input" v-model="step.PictureCaption" /><input type="text" placeholder="Lenke for å lese mer" v-model="step.Link" /><button class="AssetPicker" @click="editLink"/><br /><input type="text" placeholder="Beskrivelse av lenke" v-model="step.LinkTitle"></div></li>',
    methods: {
        editLink: function(event) {
            event.preventDefault();
            var setSelectedPage = function(result, target) {
                if (result !== 0 && target.AssetUrl.match('(.aspx|.docx|.DOCX|.doc|.DOC|.pdf|.PDF|.pptx|.PPTX)$') != null) {
                    this.step.Link = target.AssetUrl;
                    this.$forceUpdate();
                } else {
                    console.log('Ikke valgt side');
                }
            };
            var options = {
                title: 'Velg side',
                width: 900,
                height: 800,
                url: '/_layouts/AssetPortalBrowser.aspx',
                dialogReturnValueCallback: Function.createDelegate(
                    this,
                    setSelectedPage
                )
            };
            SP.UI.ModalDialog.showModalDialog(options);
        },
        editPicture: function(event) {
            event.preventDefault();
            var setPicture = function(result, target) {
                if (result !== 0 && target.AssetUrl.match('.jpg') != null) {
                    this.step.PictureLink = target.AssetUrl;
                    this.step.PictureAltText = target.AssetText;
                    this.$forceUpdate();
                } else {
                    console.log('Ikke valgt bilde');
                }
            };
            var options = {
                title: 'Velg bilde',
                width: 900,
                height: 800,
                url: '/_layouts/AssetImagePicker.aspx',
                dialogReturnValueCallback: Function.createDelegate(
                    this,
                    setPicture
                )
            };
            SP.UI.ModalDialog.showModalDialog(options);
        },
        moveItemUp: function(event) {
            event.preventDefault();
            var steps = this.timeline.Steps,
                index = steps.indexOf(this.step);
            if (index === 0) return;
            this.moveItem(steps, index, index - 1);
        },
        moveItemDown: function(event) {
            event.preventDefault();
            var steps = this.timeline.Steps,
                index = steps.indexOf(this.step);
            if (index === steps.length - 1) return;
            this.moveItem(steps, index, index + 1);
        },
        deleteItem: function(event) {
            event.preventDefault();
            if (confirm('Vil du slette steget?')) {
                var step = this.step;
                this.timeline.Steps = this.timeline.Steps.filter(function(e) {
                    return e !== step;
                });
            } else {
            }
        },
        moveItem: function(steps, old_index, target_index) {
            var index = target_index,
                next_link_to_move = steps[index];
            steps[index] = steps[old_index];

            while (index !== old_index) {
                target_index = old_index > target_index ? index + 1 : index - 1;
                var tmp_next_link_to_move = steps[target_index];
                steps.splice(target_index, 1, next_link_to_move);
                next_link_to_move = tmp_next_link_to_move;
                index = target_index;
            }
        }
    }
});

Vue.component('new-timeline-item', {
    props: ['timeline'],
    template:
        '<p class="center"><button class="NewButton" title="Nytt tidslinjesteg" v-on:click="addItem">Nytt tidslinjesteg</button></p>',
    methods: {
        addItem: function(event) {
            event.preventDefault();
            index = this.timeline.Steps.length;
            this.timeline.Steps.splice(index, 0, {
                Title: '',
                Contents: '',
                ID: index + 1
            });
        }
    }
});

Vue.component('timeline-root', {
    props: ['timeline'],
    template:
        '<h2> {{ timeline.Title }}<br/> <input type="text" placeholder="Navn på tidslinje" v-model="timeline.Title"></h2>'
});

$(function() {
    $('.TimeLineSave').on('click', function(event) {
        $(this)
            .parent()
            .parent()
            .find('.UpdateSuccess')
            .hide();
        $(this)
            .parent()
            .parent()
            .find('.UpdateFail')
            .hide();
        var wp = '';
        if ($(this).parents('.ms-rtestate-field').length > 0) {
            wp = $(this)
                .parents('[webpartid]')
                .attr('webpartid2')
                .replace(/\-/g, '_');
        } else {
            wp = $(this)
                .parents('[webpartid]')
                .attr('webpartid')
                .replace(/\-/g, '_');
        }
        var wpString = 'FNSP.Current.TimeLine_g_' + wp;
        var jsonString = eval(wpString).$data.timeline;
        FNSP.WebPart.saveWebPartProperties(
            $(this)
                .parents('[webpartid]')
                .attr('webpartid'),
            { WebPartContentJson: JSON.stringify(jsonString) }
        )
            .done(function() {
                $("div[id*='" + wp + "']")
                    .first()
                    .find('.UpdateSuccess')
                    .show('slow');
            })
            .fail(function() {
                $("div[id*='" + wp + "']")
                    .first()
                    .find('.UpdateFail')
                    .show('slow');
            });
        event.preventDefault();
    });
});

$(window).on('load',function() {
    setTimeout(function() {
        $('.TimeLinePanel').keydown(function(event) {
            event.stopPropagation();
        });
    }, 1000);
 });

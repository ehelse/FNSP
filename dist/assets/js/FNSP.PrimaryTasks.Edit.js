Vue.component('menu-column', {
    props: ['column', 'columns'],

    template: '<li class="tile"><div class="subnav-title" :id="column.id">{{column.title}}<span style="float:right;font-size:1rem"><button class="EditButton" title="Rediger tittel" @click="editTitle"></button></span></div>' +
              '<div v-if="column.edit"><input type="text" placeholder="Navn på kolonne" v-model:value="column.title" /><input type="text" placeholder="Lenk til side" v-model:value="column.link" /><button class="AssetPicker" @click="editLink" title="Velg lenke"/><button title="Lagre tittel" class="SaveButton" @click="saveTitle"></button></div>' +
              '<ul class="subnav"><menu-item v-for="link in column.links" :column="column" :columns="columns" :link="link" :key="link.id"></menu-item></ul><button class="NewButton" title="Nytt element" v-on:click="addItem"></button>',
    methods:
    {
        addItem: function (event) {
            event.preventDefault();
            index = this.column.links.length;
            this.column.links.splice(index, 0, { text: '', href: '', 'edit': false, 'new': true });
        },

        editTitle: function (event) {
            event.preventDefault();
            this.column.edit = true;
            
        },
        editLink: function (event) {
            event.preventDefault();
            var setSelectedPage = function (result, target) {
                if (result !== 0 && target.AssetUrl.match('.aspx$') !== null) {
                    this.column.link = target.AssetUrl;
                    this.$forceUpdate();
                }
                else {
                    console.log('Ikke valgt side');
                }
            };
            var options =
                {
                    title: 'Velg side',
                    width: 900,
                    height: 800,
                    url: '/_layouts/AssetPortalBrowser.aspx',
                    dialogReturnValueCallback: Function.createDelegate(this, setSelectedPage)
                };
            SP.UI.ModalDialog.showModalDialog(options);
        },
        saveTitle: function(event) {
            event.preventDefault();
            this.column.edit = false;
        }
    }
});
Vue.component('menu-item', {
    props: ['columns', 'column', 'link'],
    template:
        '<li v-if="link.edit"><span><input type="text" placeholder="Navn på lenke" v-model:value="link.text" /><br /><input type="text" placeholder="Lenke" v-model:value="link.href"/></span><span ><button class="AssetPicker" @click="editLink" title="Velg lenke"/><button title="Lagre element" class="SaveButton" @click="saveItem"></button></span></li>' +
        '<li v-else-if="link.new"><span><input type="text" placeholder="Navn på lenke" v-model:value="link.text" /><br /><input type="text" placeholder="Lenke" v-model:value="link.href"/></span><span ><button class="AssetPicker" @click="editLink" title="Velg lenke"/><button title="Lagre element" class="SaveButton" @click="saveItem"></button></span></li>' +
        '<li v-else><menu-item-edit-panel :link="link" :column="column"></menu-item-edit-panel><span :href="link.href">{{link.text}}</span></li>',
    methods: {
        saveItem: function(event) {
            event.preventDefault();
            this.link.new = false;
            this.link.edit = false;
        },

        editLink: function(event) {
            event.preventDefault();
            var setSelectedPage = function(result, target) {
                if (result !== 0 && target.AssetUrl.match('.aspx$') != null) {
                    this.link.href = target.AssetUrl;
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
    }
});

Vue.component('menu-item-edit-panel', {
    props: ['column', 'link'],
    template:
        '<div><button class="EditButton" title="Rediger element" v-on:click="editItem"></button><button class="DeleteButton" title="Slett element" v-on:click="deleteItem"></button><button class="UpButton" title="Flytt element opp" v-on:click="moveUp"></button><button class="DownButton" title="Flytt element ned" v-on:click="moveDown"></button></div>',
    methods: {
        editItem: function(event) {
            event.preventDefault();
            this.link.edit = true;
        },
        deleteItem: function(event) {
            event.preventDefault();
            var link = this.link;
            this.column.links = this.column.links.filter(function(e) {
                return e !== link;
            });
        },
        moveUp: function(event) {
            event.preventDefault();
            var links = this.column.links,
                index = links.indexOf(this.link);
            if (index === 0) return;
            this.moveItem(links, index, index - 1);
        },
        moveDown: function(event) {
            event.preventDefault();
            var links = this.column.links,
                index = links.indexOf(this.link);
            if (index === links.length - 1) return;
            this.moveItem(links, index, index + 1);
        },
        moveItem: function(links, old_index, target_index) {
            var index = target_index,
                next_link_to_move = links[index];
            links[index] = links[old_index];

            while (index !== old_index) {
                target_index = old_index > target_index ? index + 1 : index - 1;
                var tmp_next_link_to_move = links[target_index];
                links.splice(target_index, 1, next_link_to_move);
                next_link_to_move = tmp_next_link_to_move;
                index = target_index;
            }
        }
    }
});

$(function() {
    $('#UpdateSuccess').hide();
    $('#UpdateFail').hide();
    $('#PrimaryTaskEditPanelSave').on('click', function(event) {
        $('#UpdateSuccess').hide();
        $('#UpdateFail').hide();
        var menu = FNSP.Current.primaryTaskEditPanel.$data.menu,
            isset =
                typeof menu !== 'undefined' &&
                typeof menu.Version !== 'undefined',
            version = isset ? menu.Version : 0;

        FNSP.Current.primaryTaskEditPanel.$data.menu.Version = version + 1;
        FNSP.WebPart.saveWebPartProperties(
            $(this)
                .parents('[webpartid]')
                .attr('webpartid'),
            {
                WebPartContentJson: JSON.stringify(
                    FNSP.Current.primaryTaskEditPanel.$data.menu
                )
            }
        )
            .done(function() {
                $('#UpdateSuccess').show('slow');
            })
            .fail(function() {
                $('#UpdateFail').show('slow');
            });
        event.preventDefault();
    });
});

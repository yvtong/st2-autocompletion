Ext.define('Ext.Autocomplete', {
	extend: 'Ext.field.Text',
	alias: [
	'widget.autocomplete',
	'widget.auto'
	],
	requires: [
	'Ext.Panel',
	'Ext.data.Store',
	'Ext.dataview.List',
	'Ext.field.Text'
	],
	config: {
		listeners : {
			keyup: function(cmp) {
				this.task.cancel();
				if (cmp.getValue().length < cmp.minChars) return true;
				this.task.delay(cmp.delayFilter);
			},
			blur: function(cmp){
				cmp.overlay.hide();
			}
		}
	},
	constructor: function (config) {
		var me = this;
		this.task = Ext.create('Ext.util.DelayedTask', function() {
		    me.overlay.showBy(me);
			me.list.getStore().setFilters([{property: me.valueField, value: me.getValue()}]);
			me.list.getStore().load();
		});

		this.valueField = config.valueField || 'title';
		this.minChars = config.minChars || 2;
		this.delayFilter = config.delayFilter || 500;
		this.list = Ext.widget('list', {
			itemTpl: config.itemTpl || '{title}',
			store: config.store,
			emptyText: config.emptyText || "No record found",
			listeners: {
				itemtap: function( list, index, target, record, e, eOpts ) {
					var value = record.get(me.valueField);
					me.setValue(value);
					me.fireEvent('itemSelected',me, value);
				}
			}
		});
		this.overlay = Ext.widget('panel', {
			maxHeight: '20%',
			maxWidth: '90%',
			layout: 'fit',
			items: this.list
		});

        this.callParent(arguments); // calls Ext.panel.Panel's constructor
    }
});
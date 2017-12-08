Event = {
    createEventSource: function () {
        var listeners = {};

        return {
            addEventListener: function (eventName, callbackToAdd) {
                var callbacks = listeners[eventName];
                if(callbacks) {
                    for(var i=0; i<callbacks.length; i++) {
                        var callback = callbacks[i];
                        if(callback == callbackToAdd) return;
                    }
                    callbacks.push(callbackToAdd);
                } else {
                    listeners[eventName] = [ callbackToAdd ];
                }
            },
            fireEvent: function (eventName, options) {
                var callbacks = listeners[eventName];
                callbacks && callbacks.forEach(function (callback) {
                    callback(options);
                })
            }
        }
    },
    extendEventSource: function(obj) {
        var eventSource = this.createEventSource();
        for(var key in eventSource) {
            if(eventSource.hasOwnProperty(key)) {
                obj[key] = eventSource[key];
            }
        }
        return obj;
    }
};

function ListModel(items) {
	this.items = items;
	this.selectedIndex = -1;
	this.EVENT_TYPE = {
	    ADD_ITEM: 'ADD_ITEM',
        REMOVE_ITEM: 'REMOVE_ITEM',
        CHANGE_SELECTION: 'CHANGE_SELECTION'
    };
}

ListModel.prototype = Event.extendEventSource({
    getItems: function() {
        return [].concat(this.items);
    },
    addItem: function(item) {
        this.items.push(item);
        this.fireEvent(this.EVENT_TYPE.ADD_ITEM, { item: item });
    },
    removeItemAt: function(index) {
        var item = this.items[index];
        this.items.splice(index, 1);
        this.fireEvent(this.EVENT_TYPE.REMOVE_ITEM, { item: item });
        if(index === this.selectedIndex) {
            this.setSelectedIndex(-1); // set non-selected
        }
    },
    getSelectedIndex: function() {
        return this.selectedIndex;
    },
    setSelectedIndex: function (index) {
        var previousIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.fireEvent(this.EVENT_TYPE.CHANGE_SELECTION, { previous: previousIndex });
    }
});

function ListView(model, elements) {
	this.model = model;
	this.elements = elements;
	this.EVENT_TYPE = {
	    MODIFY_LIST: 'modifyList',
        CLICK_ADD_BUTTON: 'clickAddButon',
        CLICK_DEL_BUTTON: 'clickDelButton'
    };

	var self = this;

	this.model.addEventListener(this.model.EVENT_TYPE.ADD_ITEM, function () {
        self.rebuildList();
    });

	this.model.addEventListener(this.model.EVENT_TYPE.REMOVE_ITEM, function () {
        self.rebuildList();
    });

	this.elements.list.change(function(e) {
	    self.fireEvent(self.EVENT_TYPE.MODIFY_LIST, {index: e.target.selectedIndex});
	});

	this.elements.addButton.click(function() {
	    // do something and then fire event let controller to do the logic
	    self.fireEvent(self.EVENT_TYPE.CLICK_ADD_BUTTON);
	});

	this.elements.delButton.click(function() {
	    self.fireEvent(self.EVENT_TYPE.CLICK_DEL_BUTTON);
	});
}

ListView.prototype = Event.extendEventSource({
    show: function() {
        this.rebuildList();
    },
    rebuildList: function() {
        var list, items;
        list = this.elements.list;
        list.html('');

        items = this.model.getItems();
        for(var key in items) {
            if(items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'));
            }
        }
        this.model.setSelectedIndex(-1);
    }
});

function ListController(model, view) {
	this.model = model;
	this.view = view;

	var self = this;
	this.view.addEventListener(this.view.EVENT_TYPE.MODIFY_LIST, function (args) {
        self.updateSelected(args.index);
    })
    this.view.addEventListener(this.view.EVENT_TYPE.CLICK_ADD_BUTTON, function () {
        self.addItem();
    });
    this.view.addEventListener(this.view.EVENT_TYPE.CLICK_DEL_BUTTON, function() {
        self.delItem();
    });
}

ListController.prototype = {
	addItem: function() {
		var item = window.prompt('Add Item', '');
		item && this.model.addItem(item);
	},
	delItem: function() {
		var index = this.model.getSelectedIndex();
		(index !== -1) && this.model.removeItemAt(this.model.getSelectedIndex());

	},
	updateSelected: function(index) {
		this.model.setSelectedIndex(index);
	}
};

$(function() {
	var model = new ListModel(['PHP', 'Javascript']),
		view = new ListView(model, {
			list: $('#list'),
			addButton: $('#plusBtn'),
			delButton: $('#minusBtn')
		}),
		controller = new ListController(model, view);

	view.show();
});
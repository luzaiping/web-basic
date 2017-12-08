/**
 * Created by Administrator on 2016/12/18.
 */

Event = {
    createEventSource: function () {
        var listeners = {};

        return {
            addEventListener: function (eventName, callbackToAdd) {
                var callbacks = listeners[eventName];
                if(callbacks) {
                    for(var i=0; i<callbacks.length; i++) {
                        var callback = callbacks[i];
                        if(callback === callbackToAdd) return;
                    }
                    callbacks.push(callback);
                } else {
                    listeners[eventName] = [ callbackToAdd ];
                }
            },
            removeEventListener: function (eventName, callbackToRemove) {
                var callbacks = listeners[eventName];
                if(callbacks) {
                    callbacks.forEach(function (callback, index) {
                        if(callback === callbackToRemove) {
                            callbacks.splice(index, 1);
                        }
                    })
                }
            },
            fireEvent: function (eventName, options) {
                var callbacks = listeners[eventName];
                callbacks && callbacks.forEach(function (callback) {
                    callback && callback(options);
                })
            }
        }
    },
    extendEventSource: function (obj) {
        var eventSource = this.createEventSource();
        for(var prop in eventSource) {
            obj[prop] = eventSource[prop];
        }
        return obj;
    }
};

function ListModel(items) {
    this.items = items || [];
    this.selectedIndex = -1;
    this.EVENT_TYPE = {
        ADD_ITEM: 'addItem',
        REMOVE_ITEM: 'removeItem'
    };
}

ListModel.prototype = Event.extendEventSource({
    addItem: function (item) {
        this.items.push(item);
        this.fireEvent(this.EVENT_TYPE.ADD_ITEM, { item: item });
    },
    removeItemAt: function (index) {
        var items = this.items;
        items.splice(index, 1);
        this.fireEvent(this.EVENT_TYPE.REMOVE_ITEM, {index: index});
        if(index === this.selectedIndex) {
            this.selectedIndex = -1;
        }
    },
    getItems: function () {
        return this.items;
    },
    getSelectedIndex: function () {
        return this.selectedIndex;
    },
    setSelectedIndex: function (index) {
        this.selectedIndex = index;
    }
});

function ListView(model, elements) {
    this.model = model;
    this.elements = elements;
    this.EVENT_TYPE = {
        ADD_BUTTON_CLICK: 'addBtnClick',
        DELETE_BUTTON_CLICK: 'deleteBtnClick',
        CHANGE_SELECTION: 'changeSelction'
    };
    var self = this;

    this.model.addEventListener(this.model.EVENT_TYPE.ADD_ITEM, function (item) {
        self.rebuildList();
    });
    this.model.addEventListener(this.model.EVENT_TYPE.REMOVE_ITEM, function (item) {
        self.rebuildList();
    });

    this.elements.addBtn.click(function () {
        self.fireEvent(self.EVENT_TYPE.ADD_BUTTON_CLICK);
    });

    this.elements.deleteBtn.click(function () {
        self.fireEvent(self.EVENT_TYPE.DELETE_BUTTON_CLICK);
    });
    this.elements.list.change(function (event) {
        self.fireEvent(self.EVENT_TYPE.CHANGE_SELECTION, event.target.selectedIndex);
    });
}

ListView.prototype = Event.extendEventSource({
    show: function () {
        this.rebuildList();
    },
    rebuildList: function () {
        var self = this;
        var list = self.elements.list;
        var items = self.model.getItems();
        list.html('');
        items.forEach(function (item) {
            list.append($('<option>' + item + '</option>'));
        })
    }
});

function ListController(model, view) {
    this.model = model;
    this.view = view;
    var self = this;
    
    this.view.addEventListener(self.view.EVENT_TYPE.ADD_BUTTON_CLICK, function () {
        self.addItem();
    });
    
    this.view.addEventListener(self.view.EVENT_TYPE.DELETE_BUTTON_CLICK, function () {
        self.deleteItem();
    });
    this.view.addEventListener(self.view.EVENT_TYPE.CHANGE_SELECTION, function (index) {
        self.updateSelected(index);
    })
}

ListController.prototype = {
    addItem: function () {
        var item = window.prompt('Add Item', '');
        this.model.addItem(item);
    },
    deleteItem: function () {
        var selectedIndex = this.model.getSelectedIndex();
        selectedIndex !== -1 && this.model.removeItemAt(selectedIndex);
    },
    updateSelected: function (index) {
        this.model.setSelectedIndex(index);
    }
};
$(function () {
    var model = new ListModel(['PHP', 'JAVASCRIPT']);
    var view = new ListView(model, {
        list: $('#list'),
        addBtn: $('#plusBtn'),
        deleteBtn: $('#minusBtn')
    });
    var controller = new ListController(model, view);

    view.show();
});
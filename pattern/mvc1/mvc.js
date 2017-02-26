function Event(sender) {
	this._sender = sender;
	this._listeners = [];
}

Event.prototype = {
	attach: function(listener) {
		this._listeners.push(listener);
	},
	notify: function(args) {
		for (var index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
	}
};

function ListModel(items) {
	this.items = items;
	this.selectedIndex = -1;

	this.itemAdded = new Event(this);
	this.itemRemoved = new Event(this);
	this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
	getItems: function() {
		return [].concat(this.items);
	},
	ADD_ITEM: function(item) {
		this.items.push(item);
		this.itemAdded.notify({item: item});
	},
	removeItemAt: function(index) {
		var item = this.items[index];
		this.items.splice(index, 1);
		this.itemRemoved.notify({ item: item });
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
		this.selectedIndexChanged.notify({ previous: previousIndex });
	}
};

function ListView(model, elements) {
	this.model = model;
	this.elements = elements;

	this.listModified = new Event(this);
	this.addButtonClicked = new Event(this);
	this.delButtonClicked = new Event(this);

	var self = this;

	this.model.itemAdded.attach(function() {
		self.rebuildList();
	});

	this.model.itemRemoved.attach(function() {
		self.rebuildList();
	});
	
	this.elements.list.change(function(e) {
		self.listModified.notify( {index: e.target.selectedIndex});
	});

	this.elements.addButton.click(function(e) {
		self.addButtonClicked.notify();
	});

	this.elements.delButton.click(function(e) {
		self.delButtonClicked.notify();
	});
}

ListView.prototype = {
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
};

function ListController(model, view) {
	this.model = model;
	this.view = view;

	var self = this;

	this.view.listModified.attach(function(sender, args) {
		 self.updateSelected(args.index);
	});

	this.view.addButtonClicked.attach(function() {
		self.addItem();
	});

	this.view.delButtonClicked.attach(function() {
		self.delItem();
	});
}

ListController.prototype = {
	addItem: function() {
		var item = window.prompt('Add Item', '');
		item && this.model.ADD_ITEM(item);
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
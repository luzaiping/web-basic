function EmailFormView() {
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.button = document.createElement('button');

    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placehold', 'New Email Address');

    this.button.setAttribute('type', 'submit');
    this.button.innerHTML = 'Add';
}

EmailFormView.prototype = {
    render: function () {
        this.form.appendChild(this.input);
        this.form.appendChild(this.button);
        document.body.appendChild(this.form);
        this.bindEvents();
    },
    bindEvents: function () {
        var self = this;

        this.form.addEventListener('submit', function (event) {
            event.preventDefault();
            observer.publish('view.email-view.add', self.input.value);
        }, false);

        observer.subscribe('model.email-address.added', function () {
            self.clearInputField();
        });

    },
    clearInputField: function () {
        this.input.value = '';
    }
};

function EmailListView() {
    this.list = document.createElement('ul');
    this.listItem = document.createElement('li');
    this.listItemText = document.createElement('span');
    this.listItemRemoveButton = document.createElement('button');
}

EmailListView.prototype = {
    render: function (modelData) {
        var self = this;
        modelData && modelData.forEach(function (data) {
            self.list.appendChild(self.createListItem(data));
        });
        document.body.appendChild(self.list);
        self.bindEvents();
    },
    createListItem: function (email) {
        var listItem = this.listItem.cloneNode(false),
            listItemText = this.listItemText.cloneNode(false),
            listItemRemoveButton = this.listItemRemoveButton.cloneNode(false);

        listItem.setAttribute('data-email', email);

        listItemRemoveButton.setAttribute('data-email', email);
        listItemRemoveButton.innerHTML = 'Remove';

        listItemText.innerHTML = email;
        listItem.appendChild(listItemText).appendChild(listItemRemoveButton);
        return listItem;
    },
    bindEvents: function () {
        var self = this;
        this.list.addEventListener('click', function (event) {
            if(event.target && event.target.tagName === 'BUTTON') {
                observer.publish('view.email-view.remove', event.target.getAttribute('data-email'));
            }
        }, false);

        observer.subscribe('model.email-address.added', function (email) {
            self.list.insertBefore(self.createListItem(email), self.list.firstChild);
        });

        observer.subscribe('model.email-address.removed', function (email) {
            var listItems = document.getElementsByTagName('li');
            for(var i=0; i<listItems.length; i++) {
                if(listItems[i].getAttribute('data-email') === email) {
                    self.list.removeChild(listItems[i]);
                    return;
                }
            }
        });
    }
}

function EmailView(views) {
    this.views = views || [];
}

EmailView.prototype = {
    render: function (modelData) {
        this.views.forEach(function (view) {
            view.render(modelData);
        })
    }
};
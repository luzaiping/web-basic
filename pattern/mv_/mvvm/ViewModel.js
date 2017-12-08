function EmailViewModel(model, view) {
    var self = this;

    this.model = model;
    this.view = view;

    this.methods = {
        addEmail: function (email) {
            self.model.addEmail(email);
        },
        removeEmail: function (email) {
            self.model.removeEmail(email);
        }
    }
}

EmailViewModel.prototype = {
    initialize: function () {
        this.listElement = this.view.querySelectorAll('[data-loop]')[0];
        this.listItemElement = this.listElement.getElementsByTagName('li')[0];

        this.bindForm();
        this.bindList();
        this.bindNumber();
        this.bindEvents();
    },
    bindForm: function () {
        var self = this;
        var form = this.view.querySelectorAll('[data-submit]')[0];
        var formSubmitName = form.getAttribute('data-submit');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var email = form.getElementsByTagName('input')[0].value;
            var method = self.methods[formSubmitName];
            if(method && typeof method=== 'function') {
                method(email);
            }
        });
    },
    bindList: function () {
        var self = this;
        var datas = this.model.getAll();
        self.listElement.innerHTML = '';

        datas && datas.forEach(function (email) {
            var newListItem = self.listItemElement.cloneNode(true);
            var textElement = newListItem.querySelectorAll('[data-text]')[0];
            var removeButtonElement = newListItem.querySelectorAll('[data-click]')[0];

            textElement.innerHTML = email;
            removeButtonElement.addEventListener('click', removeFn, false);

            self.listElement.appendChild(newListItem);

            function removeFn(event) {
                var removeMethodName = event.target.getAttribute("data-click");
                var method = self.methods[removeMethodName];
                if(method && typeof method === 'function') {
                    method(email);
                }
            }
        });
    },
    bindNumber: function () {
        var number = this.model.getAll().length;
        var numberElement = this.view.querySelectorAll('[data-number]')[0];
        numberElement.innerHTML = 'there are ' + number + ' emails total.';
    },
    clearInputField: function () {
        var textField = this.view.querySelectorAll('input[type="text"]')[0];
        textField.value = '';
    },
    bindEvents: function () {
        var self = this;
        observer.subscribe('model.email-address.added', updateView);
        observer.subscribe('model.email-address.removed', updateView);

        function updateView() {
            self.bindList();
            self.clearInputField();
            self.bindNumber();
        }
    }
};
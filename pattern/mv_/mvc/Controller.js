function EmailController (model, view) {
    this.model = model;
    this.view = view;
}

EmailController.prototype = {
    initialize: function () {
        var modelData = this.model.getAll();
        this.view.render(modelData);
        this.bindEvents();
    },
    bindEvents: function () {
        var self = this;
        observer.subscribe('view.email-view.add', function (email) {
            self.model.addEmail(email);
        });

        observer.subscribe('view.email-view.remove', function (email) {
            self.model.removeEmail(email);
        })
    }
};
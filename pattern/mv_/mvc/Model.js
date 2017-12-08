function EmailModel(data) {
    this.emailAddresses =  data || [];
}

EmailModel.prototype = {
    addEmail: function (email) {
        this.emailAddresses.unshift(email);
        observer.publish('model.email-address.added', email);
    },
    removeEmail: function (email) {
        var emails = this.emailAddresses;
        emails.forEach(function (item, index) {
            if(item === email) {
                emails.splice(index, 1);
                observer.publish('model.email-address.removed', email);
                return;
            }
        });
    },
    getAll: function () {
        return this.emailAddresses;
    }
}
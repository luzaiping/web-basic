var emailModel = new EmailModel([
    'sandy@rc.com', 'jilion@rc.com', 'felix@rc.com'
]);

var emailFormView = new EmailFormView();
var emailListView = new EmailListView();
var emailView = new EmailView([emailFormView, emailListView]);

var emailController = new EmailController(emailModel, emailView);
emailController.initialize();
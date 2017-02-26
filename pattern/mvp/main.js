var emailModel = new EmailModel([
        "Jilion.Chen@rc.com",
        "Felix.Lian@rc.com",
        "Sandy.Wu@rc.com"
    ]),
    emailFormView = new EmailFormView(),
    emailListView = new EmailListView(),
    emailView = new EmailView([emailFormView, emailListView]),
    // Create the Presenter as you would the Controller in the MVC pattern
    emailPresenter = new EmailPresenter(emailModel, emailView);
    emailPresenter.initialize();

/**
 * Created by Administrator on 2016/11/29.
 */

var subjectFactory = (function() {

    function Subject() {
        this.observers = []
    }

    Subject.prototype.addObserver = function (obj) {
        this.observers.push(obj);
    };

    Subject.prototype.removeObserver = function (obj) {
        let length = this.observers.length
        let matchedIndex = 0
        for (let index = 0; index < length; index++) {
            if (this.observers[index] === obj) matchedIndex = index
        }
        this.observers.splice(matchedIndex, 1)
        // this.observers.removeAt(this.observers.indexOf(obj,0));
    };

    Subject.prototype.notify = function (context) {
        var length = this.observers.length;
        for(var i=0; i<length; i++) {
            let observer = this.observers[i]
            observer && observer.update && observer.update(context);
        }
    };

    return {
        create: function() {
            return new Subject();
        }
    };
})();

function Observer() {
    this.update = function() {};
}

function extend(obj, extension) {
    for(var key in extension) {
        obj[key] = extension[key];
    }
}

var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );

extend(controlCheckbox, subjectFactory.create()); // concreteSubject extends Subject
controlCheckbox.onclick = function() {
    controlCheckbox.notify(controlCheckbox.checked);
};

function createConcreteObserver() {
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    extend(checkBox, new Observer());
    checkBox.update = function (value) {
        checkBox.value = value;
        checkBox.checked = value;
    };
    return checkBox;
}

// testing such as main method in java
addBtn.onclick = function() {
    var check = createConcreteObserver();
    controlCheckbox.addObserver(check);
    container.appendChild(check);
};

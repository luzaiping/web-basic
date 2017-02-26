
/**
 * Created by Administrator on 2016/11/29.
 */

var subjectFactory = (function() {

    function Subject() {
        this.observers = observerListFactory.create();
    }

    Subject.prototype.addObserver = function (obj) {
        this.observers.add(obj);
    };

    Subject.prototype.removeObserver = function (obj) {
        this.observers.removeAt(this.observers.indexOf(obj,0));
    };

    Subject.prototype.notify = function (context) {
        var count = this.observers.count();
        for(var i=0; i<count; i++) {
            this.observers.get(i).update(context);
        }
    };

    function observerListFactory() {
        function ObserverList() {
            this.observerList = [];
        }

        ObserverList.prototype.add = function(obj) {
            return this.observerList.push(obj);
        };

        ObserverList.prototype.count = function () {
            return this.observerList.length;
        };

        ObserverList.prototype.get = function (index) {
            var observer;
            if(-1 < index < this.observerList.length) {
                observer = this.observerList[index];
            }
            return observer;
        };

        ObserverList.prototype.indexOf = function (obj, startIndex) {
            var i = startIndex;
            while(i < this.observerList.length) {
                if(this.observerList[i] === obj) {
                    return i;
                }
                i++;
            }
            return -1;
        };

        ObserverList.prototype.removeAt = function (index) {
            this.observerList.splice(index, 1);
        };

        return {
            create: function() {
                return new ObserverList();
            }
        };
    }

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

/**
 * Created by Administrator on 2016/12/1.
 */

var pubsub = {};

(function(myObject) {
    var topics = {};
    var subUid = -1;

    myObject.publish = function(topic, args) {
        var subscribes = topics[topic];
        if(subscribes) {
            subscribes.forEach(function(subscribe) {
                subscribe.fn(args); // call handler
            });
        } else {
            return false;
        }
    };

    myObject.subscribe = function(topic, fn) {
        var subscribes = topics[topic] || [];
        var token = (++subUid).toString();
        subscribes.push({
            fn: fn,
            token: token
        });
        return token;
    };

    myObject.unSubscribe = function(token) {
        for(var key in topics) {
            var subscribes = topics[key];
            for(var i=0; i<subscribes.length; i++) {
                if(subscribes[i].token === token) {
                    subscribes.splice(i, 1);
                }
            }
        }
    };

})(pubsub);
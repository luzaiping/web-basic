/**
 * Created by Administrator on 2016/11/30.
 */

$(function() {
    $('button').on('click', {data: 'passedData'},function (event) { // on is same as addEventListener

        traverseEventObject();

        function traverseEventObject() {
            console.log('fuck guy is fired.');
            console.log('pageX: ' + event.pageX + ', pageY: ' + event.pageY);
            console.log('which: ' + event.which);
            console.log('type: ' + event.type);
            console.log('data: ' + event.data.data);
            console.log('target: ' + event.target);
            console.log('namespace: ' + event.namespace);
            console.log('timeStamp: ' + event.timeStamp);

            var originalEvent = event.originalEvent; // get native event object
            event.preventDefault();
            event.stopPropagation();
        }
    });

    // multiple event attached to a target.
    $('a').on({
        'click': function() {
            console.log('a is clicked.');
        },
        'mouseout': function () {
            console.log('mouse leave a');
        }
    });

    function demoOnUsage() {
        // bind one event to a handler
        $('p').on('click', function() {
            console.log("<p> was clicked");
        });
        // bind multiple event to a handler
        $('div').on('mouseover mouseout', function() {
            console.log("mouse hovered over or left a div");
        });
        // many event and handler
        $('a').on({
            'mouseover': function(){},
            'mouseout': function() {},
            'click': function(){}
        });

        // event delegation, li can be non-exist when binding event.
        $('ul').on('click', 'li', function() {
            console.log("Something in a <ul> was clicked, and we detected that it was an <li> element.");
        });
    }
});

$(document).ready(function () {

});
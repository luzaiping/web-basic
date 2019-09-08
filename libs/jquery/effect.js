/**
 * Created by Administrator on 2016/12/1.
 */

$(function () {
    /*$('button').on('click', function () {
        console.log('fuck guy');
        $('p').fadeToggle("slow");
        return false;
    });

    $('h3').hide(1000).delay(5000).show(1000);

    var img = $('img');
    if(img.length) {
        img.fadeOut(750, callback);
    } else {
        callback();
    }

    function callback() {
        console.log('callback');
    }

    $('div.funtimes').animate(
        {
            left: '+=50',
            opacity: 0.5
        },
        300, // duration
        function() { // callback
            console.log('done!')
        }
    );

    $('box').animate({ height: 20}, 'slow')
            .queue(function(next) {
                console.log('we are after animation');
                $(this).dequeue(); // or call next()
            })*/

    $('div')
        .queue('steps', function (next) {
            console.log('step 1');
            next();
        })
        .queue('steps', [function (next) {
            console.log('step 2');
            next();
        }])
        .dequeue('steps');
})
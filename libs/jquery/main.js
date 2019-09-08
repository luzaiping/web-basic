
$(function () {
    var deferred = $.Deferred();

    deferred.then( function ( value ) {
        return value * 2;
    }).then( function ( value ) {
        return value * 2;
    }).done( function ( value ) {
        console.log( value );
    });

    deferred.resolve( 5 ); // fire Callbacks List


    // function done( value ) {
    //     console.log( value * 2);
    // }

});

// $(function () {
//     var ajaxPromise = $.ajax({
//         url: '/echo/json',
//         data: {data: JSON.stringify({ firstName: 'sandy', lastName: 'WU'})},
//         type: 'post'
//     });
//
//     ajaxPromise.done( function (result) {
//         console.log( result.firstName, ' is saved');
//     })
//
//     ajaxPromise.fail( function () {
//         console.log( 'something goes wrong.' );
//     })
// });
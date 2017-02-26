/**
 * Created by Administrator on 2016/12/1.
 */

/*$.get('data.json', function(response) {
    console.log(response.heading);
});*/

$.ajax({
    url: 'data.json',
    data: { id: 123 }, // query string parameters
    type: 'GET',
    async: true,
    dataType: 'json', // the type expected to return from server
    time: 10000 // wait 10s before request fail
}).done(function (json, status, jqXHR) {
    console.log('response heading: ' + json.heading);
}).fail(function (jqXHR, status, errorThrown) {
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( jqXHR );
}).always(function () {
    console.log('always execute');
});
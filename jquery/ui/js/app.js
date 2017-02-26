
require([ 'jquery', 'math' ], function ($, math) {
    $(function () {
        console.log('jquey with require');
        console.log(math.add(1, 2));
        console.log(math.subtract(1, 2));
    })
});
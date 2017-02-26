(function () {
    var extensions= [
        {firstName: 'fb', lastName: 'la', ext: 'ea', extType: 'FaxUser'},
        {firstName: 'fa', lastName: 'lc', ext: 'eb', extType: 'Dept'},
        {firstName: 'fa', lastName: 'la', ext: 'eb', extType: 'Dept'},
        {firstName: 'fa', lastName: 'lb', ext: 'ee', extType: 'DigitalUser'},
        {firstName: 'fa', lastName: 'lb', ext: 'ec', extType: 'FaxUser'},
        {firstName: 'fd', lastName: 'lb', ext: 'ec', extType: 'VirtualUser'},
        {firstName: 'fe', lastName: 'le', ext: 'ec', extType: 'AO'},
        {firstName: 'fe', lastName: 'le', ext: 'ed', extType: 'AO'}
    ];

    function sortExtensionsByName() {
        return extensions.sort(compareAlphabet);

        function compareAlphabet(foo, bar) {
            var firstNameNotEqual = foo.firstName != bar.firstName;
            var lastNameNotEqual = foo.lastName != bar.lastName;
            var extNotEqual = foo.ext != bar.ext;

            return  firstNameNotEqual ? compare(foo.firstName, bar.firstName) :
                        (lastNameNotEqual ? compare(foo.lastName, bar.lastName) : (extNotEqual ? compare(foo.ext, bar.ext) : 0));

            function compare(first, last) {
                return first < last ? -1 : 1;
            }
        }
    }
    // console.log(sortExtensionsByName(extensions));

    function sortExtensionsByExtType() {
        var maps = {
            DigitalUser: 1,
            VirtualUser: 2,
            FaxUser: 3,
            AO: 4,
            Dept: 5
        };
        return extensions.sort(function (foo, bar) {
            return maps[foo.extType] - maps[bar.extType];
        });
    }
    // console.log(sortExtensionsByExtType());
})();

// question 3
(function () {
    var saleItems= [
        {
            month: 1, //[1-12],
            transactionId: "xxx",
            salePrice: 1
        },{
            month: 1, //[1-12],
            transactionId: "xxx",
            salePrice: 2
        },{
            month: 2, //[1-12],
            transactionId: "xxx",
            salePrice: 3
        },{
            month: 5, //[1-12],
            transactionId: "xxx",
            salePrice: 3
        },{
            month: 10, //[1-12],
            transactionId: "xxx",
            salePrice: 3
        },
    ];

    var maps = {}; // {1:1,2:1,3:1,4:2,5:2,6:2,7:3,8:3,9:3,10:4,11:4,12:4}
    for(var i=1; i<13; i++) {
        maps[i] = Math.ceil(i/3);
    }

    var result = [];

    var newItems = saleItems.map(function (item) {
        return {quater: maps[item.month], salePrice: item.salePrice};
    });

    newItems.forEach(function (item) {
        if(item.quater === 1) {

        }
    });


})();

// question 4
(function () {

    function Sequence() {
        this.next = function () {
            return Sequence.prototype.num++;
        }
    }
    Sequence.prototype.num = 1;

    var sequence1 = new Sequence();
    console.log(sequence1.next());
    console.log(sequence1.next());

    var sequence2 = new Sequence();
    console.log(sequence2.next());
    console.log(sequence2.next());

    var sequence3 = new Sequence();
    console.log(sequence3.next());
    console.log(sequence3.next());

})();

// question 5
(function () {
    function getUnUsedKeys(allKeys, usedKeys) {
        var allKeysObj = {},
            usedKeysObj = {},
            result = [];

        arrayToObj(allKeys, allKeysObj);
        arrayToObj(usedKeys, usedKeysObj);

        for(var key in allKeysObj) {
            if(usedKeysObj[key] !== allKeysObj[key]) {
                result.push(allKeysObj[key]);
            }
        }
        return result;

        function arrayToObj(arr, obj) {
            arr.forEach(function (key) {
                obj[key] = key;
            });
        }
    };

    var allKeys= [0,1,2,3,4,5,6,7,8,9],
        usedKeys= [2,3,4,8];

    // console.log(getUnUsedKeys(allKeys, usedKeys));
})();
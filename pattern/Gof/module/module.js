let myModule = (function() {

    let oldMyMethod =  myModule.myMethod
    
    let privateVar = 'I am private to global.'

    function privateMethod() {
        console.log()
    }

    return {
        publicProperty: 'I am public',
        publicMethod: function() {
            console.log('I am public too.')
        },
        myMethod: function() {
            console.log('Do some else')
            oldMyMethod()
        }
    }
})(myModule)
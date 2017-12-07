function fromPrototype(prototype, object) {
    let obj = Object.create(prototype)
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            obj[key] = object[key]
        }
    }
    return obj
}

// abstract factory
let Ingredients = {
    createDough: function() {
        return 'generic dough'
    },
    createSauce: function() {
        return 'generic sauce'
    },
    createCrust: function() {
        return 'generic crust'
    }
}

Ingredients.createChicagoStyle = function() {
    return fromPrototype(Ingredients, {
        createDough: function() {
            return 'chicago dough'
        },
        createSauce: function() {
            return 'chicago sauce'
        },
        createCrust: function() {
            return 'chicago crust'
        }
    })
}

Ingredients.createCaliforniaStyle = function() {
    return fromPrototype(Ingredients, {
        createDough: function() { // factory method
            return 'california dough'
        },
        createSauce: function() {
            return 'california sauce'
        },
        createCrust: function() {
            return 'california crust'
        }
    })
}
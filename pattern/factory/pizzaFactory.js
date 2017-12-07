// abstract product
let pizza = {
    description: 'Generic pizza'
}

// abstract factory
let pizzaStore = {
    createPizza: function(type) {}
}

function fromPrototype(prototype, object) {
    let obj = Object.create(prototype)
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            obj[key] = object[key]
        }
    }
    return obj
}

// concrete factory
let calPizzaStore = fromPrototype(pizzaStore, {
    createPizza: function(type) { // factory method
        if (type === 'cheese') {
            // concrete product
            return fromPrototype(pizza, {
                description: 'cheese, California pizza'
            })
        } else {
            return fromPrototype(pizza, {
                description: 'veggie, California pizza'
            })
        }
    }
})

// concrete factory
let chicagoPizzaStore = fromPrototype(pizzaStore, {
    createPizza: function(type) {  // factory method
        if (type === 'cheese') {
            // concrete product
            return fromPrototype(pizza, {
                description: 'cheese, chicago pizza'
            })
        } else {
            return fromPrototype(pizza, {
                description: 'veggie, chicago pizza'
            })
        }
    }
})
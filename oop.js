class Cookie{
    constructor(name, price, ingredients, type){
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.type = type;
    }
}

class Chocolate extends Cookie{
    constructor(name, price, ingredients, type){
        super(name, price, ingredients, type);
        
    }
}

class Sweet extends Cookie{
    constructor(name, price, ingredients, type){
        super(name, price, ingredients, type);
    }
}

class Strawberry extends Cookie{
    constructor(name, price, ingredients, type){
        super(name, price, ingredients, type);
    }
}


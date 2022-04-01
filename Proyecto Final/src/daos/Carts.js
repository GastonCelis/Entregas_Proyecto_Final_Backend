const { Schema } = require("mongoose");
const Container= require("../Container");

class Cart extends Container{
    constructor() {
        super("carts", new Schema({
            products: { type: Array, required: true },
            code: { type: Number, required: true },
            total: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now(), required: true}
        }))
    }
};

module.exports = Cart;
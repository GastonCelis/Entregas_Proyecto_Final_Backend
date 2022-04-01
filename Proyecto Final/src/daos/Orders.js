const { Schema } = require("mongoose");
const Container= require("../Container");

class Order extends Container{
    constructor() {
        super("orders", new Schema({
            items: { type: Array, required: true },
            codeOrder: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now(), required: true},
            state: { type: String, required: true },
            email: { type: String, required: true }
        }))
    }
};

module.exports = Order;
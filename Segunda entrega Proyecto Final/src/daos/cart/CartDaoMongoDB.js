const mongoose = require("mongoose")
const { Schema } = require("mongoose");
const ContainerMongoDB= require("../../containers/ContainerMongoDB");

const ObjectId = mongoose.Schema.Types.ObjectId;

class CartDaoMongoDB extends ContainerMongoDB{
    constructor() {
        super("carts", new Schema({
            product: [
                {
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    code: { type: Number, required: true },
                    price: { type: Number, required: true },
                    stock: { type: Number, required: true },
                    photo: { type: String, required: true },
                    id: { type: ObjectId, required: true},
                    timeStamp: { type: Date, default: Date.now(), required: true}
                }
            ],
            timestamp: { type: Date, default: Date.now(), required: true}
        },))
    }
};

module.exports = CartDaoMongoDB;
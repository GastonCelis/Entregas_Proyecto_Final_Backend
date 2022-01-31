const { Schema } = require("mongoose");
const Container= require("../Container");

class User extends Container{
    constructor() {
        super("users", new Schema({
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String },
            password: { type: String }
        }))
    }
};

module.exports = User;
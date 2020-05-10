let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	password: String,
	email: String,
	number: Number,
})

module.exports = mongoose.model("User",UserSchema);

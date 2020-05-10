let mongoose = require("mongoose");

let ArticleSchema = new mongoose.Schema({
	userid: String,
	price: Number,
	title: String,
	picture: String
})

module.exports = mongoose.model("Article",ArticleSchema);

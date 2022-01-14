const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: { type: String, unique: true },
  description: String,
  author: String,
  category: String,
  publisher: String,
  coverImage: String,
  price: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model("book", bookSchema)
module.exports = Book;
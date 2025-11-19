const Book = require("../models/bookModel")

exports.createbooks = async (req,res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getAllbooks = async (req,res) => {
    try {
        const match = {};
        const sort = {};

        // Filtering
        if (req.query.completed !== undefined) {
            match.isCompleted = req.query.completed === 'true';
        }

        if (req.query.priority) {
            const validPriorities = ['High', 'Medium', 'Low'];
            if (!validPriorities.includes(req.query.priority)) {
                return res.status(400).json({ error: 'Invalid priority value' });
            }
            match.priority = req.query.priority;
        }

        // Sorting
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':'); // ex: createdAt:desc
            const field = parts[0];
            const order = parts[1] === 'desc' ? -1 : 1;
            sort[field] = order;
        }

        const books = await Book.find(match).sort(sort);
        res.status(200).send(books)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getBookById = async (req,res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(400).send();
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.updateBook = async (req,res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!book) {
            return res.status(400).send();
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deleteBook = async (req,res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        if(!book) {
            return res.status(400).send();
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
}


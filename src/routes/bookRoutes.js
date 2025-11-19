const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const validateObjectId = require("../middleware/validateObjectId")

// Create book
router
    .route('/')
    .post( bookController.createbooks)
    .get(bookController.getAllbooks)

// Read ALL
router
    .route('/')
    .get(bookController.getAllbooks)

// Read One
router
    .route('/:id')
    .get(validateObjectId, bookController.getBookById)

// Update and Delete
router
    .route('/:id')
    .get(validateObjectId, bookController.getBookById)
    .put(validateObjectId, bookController.updateBook)
    .patch(validateObjectId, bookController.updateBook)
    .delete(validateObjectId, bookController.deleteBook)

module.exports = router;
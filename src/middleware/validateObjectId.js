const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: 'Invalid ID format'
        });
    }

    next(); // ถ้า valid ค่อยไปต่อ
};

module.exports = validateObjectId;

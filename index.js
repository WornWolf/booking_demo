const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const path = require("path")
const bookRoutes = require("./src/routes/bookRoutes")

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected sucessfully."))
    .catch((err)=> console.error("MongoDB connection error:", err))

app.use('/api/books', bookRoutes)

app.use("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`=== SBCM PROJECT ===`)
    console.log(`Server is running on port http://localhost:${PORT}`)
})
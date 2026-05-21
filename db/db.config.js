const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri);

        console.log("Database Connected!");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
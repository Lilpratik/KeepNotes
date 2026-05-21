const express = require('express');
const connectDB = require('./db/db.config');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware 
app.use(express.json());

// connect to database
connectDB();

app.use('/', (req, res) => {
    res.send("Hello from the server!");
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


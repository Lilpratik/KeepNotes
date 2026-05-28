const express = require('express');
const connectDB = require('./db/db.config');

const userRoutes = require('./routes/user.route');
const noteRoutes = require('./routes/note.route');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware 
app.use(cors());
app.use(express.json());

// connect to database
connectDB();

// test endpont 
app.get('/', (req, res) => {
    res.send("API is working...!");
});


app.use('/api/v1', userRoutes);

app.use('/api/notes', noteRoutes);



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


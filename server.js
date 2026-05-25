const express = require('express');
const connectDB = require('./db/db.config');

const userRoutes = require('./routes/user.route');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware 
app.use(express.json());

// connect to database
connectDB();

// test endpont 
app.get('/', () => {
    console.log("API is working...!");
});


app.use('/api/v1', userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


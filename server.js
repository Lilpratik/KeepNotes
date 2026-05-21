const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware 
app.use(express.json());


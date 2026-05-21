const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        eamil: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        displayName: {
            type: String, 
            required: true,
            trim: true
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
    }
);

module.exports = mongoose.model('User', userSchema);
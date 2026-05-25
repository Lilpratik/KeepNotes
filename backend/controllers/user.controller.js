const User = require('../models/user.models');
const generateToken = require('../utils/generate.token');
const bcrypt = require('bcryptjs');

// regiseter / create user 

const registerUser = async(req, res) => {

    try {
        
        const { email, password, displayName } = req.body;

        // validation check
        if (!email || !password || !displayName) {
            return res.status(400).json({
                message: "All fields required!"
            });
        }

        // check existing user 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        // hash password 
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(
            password, 
            salt
        );

        // create user 
        const user = await User.create({
            email,
            password: hashPassword,
            displayName
        });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// login user 
const loginUser = async(req, res) => {
    try {
        
        const { email, password } = req.body;

        // validation 
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            });
        }

        // find user 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials!"
            });
        }

        // compare password 
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials!"
            });
        }

        res.status(200).json({
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
            token: generateToken(user._id)
        });


    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// get current user profile 
const getUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
}


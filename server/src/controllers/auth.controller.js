const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
    try {
        const { username, email, password, fullname, gender } = req.body;

        if (!username || !email || !password || !fullname || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const profilePicture = `https://avatar.iran.liara.run/public/${gender == "male" ? "boy" : "girl" }?username=${username}`;

        const newUser = new userModel({
            username,
            email,
            fullname,
            gender,
            profilePicture,
            password: hashedPassword
        });

        await newUser.save();

        const payload = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });

        // Send token via HTTP-only secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // set to true in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'User registered and logged in successfully',
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullname: newUser.fullname,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture
            }
        });

    } catch (error) {
        console.error('[Signup Error]:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const tokenPayload = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        });

        // Send token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Respond with user info
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                gender: user.gender,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.error('[Login Error]:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        await userModel.updateOne({
            _id : req.user._id
        },{
            lastSeen: Date.now()
        })
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        })
    
        res.status(200).json({ message: 'Logged out successfully' });
    
    } catch (error) {
        console.error('[Logout Error]:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the controller functions
module.exports = {
    signup,
    login,
    logout
};
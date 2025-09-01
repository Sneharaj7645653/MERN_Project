import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { name, userName, email, password } = req.body;


        // Validate user data
        if (!name || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Validate username
        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // password length
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({
            name,
            userName,
            email,
            hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) { 
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
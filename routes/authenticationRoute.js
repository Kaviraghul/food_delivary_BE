import express from "express";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// user registration
authRouter.post('/register', async (req, res) => {
    try {
        console.log("Request Body: ", req.body);
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration: ", error);
        res.status(500).json({ error: 'Registration failed' });
    }
});


// user login
authRouter.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(401).json({error : 'Authentication failed'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error : 'Incorrect password'});
        }
        const token = jwt.sign({userId: user._id}, 'ksnfi-dfnnff-nejecm', {
            expiresIn: '1h',
        });
        res.status(200).json({token});
    }catch{
        res.status(500).json({error : 'Login failed'})
    }
});


export default authRouter;
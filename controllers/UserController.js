// import { Error } from "mongoose";
import User from "../models/UserModel.js"
import { validationResult } from "express-validator";
import {hashPassword, comparePassword} from "../helpers/auth.js"
import jwt  from "jsonwebtoken";
// import cookieParser from "cookie-parser";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.json(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addUser = async (req, res) => {
    const user = new User(req.body);
    const errors = validationResult(req);

    try {
        const {username, email, password} = req.body;
        if(!errors.isEmpty()){
            return res.json({ error: "Invalid input character", data:errors.array() });
        }
        const existEmail = await User.findOne({email});
        const existUsername = await User.findOne({username});
        if(existEmail || existUsername){
            if(existEmail){
                return res.json({
                    error: "Email is already registered!"
                })
            }
            if(existUsername){
                return res.json({
                    error: "Username is already taken!"
                })
            }
        }
        const hashedPassword = await hashPassword(password);
        // const insertUsers = await user.save();
        const insertUsers = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            message: "User berhasil ditambahkan",
            data: [
                insertUsers._id,
                insertUsers.username, 
                insertUsers.email,
                insertUsers.password
            ]});
        
    } catch (error) {
        console.error("errornya disini :", error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateuser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteuser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Login Auth Endpoint
export const authLogin = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        // Check user exist?
        const user = await User.findOne({ $or: [{ username}, { email}] });
        if(!user){
            return res.json({
                error: "Username or email is not registered!"
            })
        }
        // Check password match
        const matchPassword = await comparePassword(password, user.password);
        if(matchPassword){
            jwt.sign({email: user.email, id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json({message: `Login successful. Welcome, ${user.username}`, user})
            })
        }
        else{
            res.json({error: "Login failed. Invalid username or password."})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})
    }
}

export const getProfile = (req, res) =>{
    const { token } = req.cookies
    console.log("ini token: ", token)
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json({user})
        })
    }
    else{
        res.json(null)
    }
}
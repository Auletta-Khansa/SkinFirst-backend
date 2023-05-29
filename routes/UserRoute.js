import express from "express";
import cors from "cors"
import { 
    getUsers, 
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    authLogin,
    getProfile,
    authLogout
} from "../controllers/UserController.js";
import {body} from "express-validator"

const router = express.Router();

//middleware
router.use(
    cors({
        credential: true,
        origin: 'https://localhost:3000'
    })
)

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users',[
    body('username').isLength({min: 6}).withMessage("Username characters are too short. Minimum character is 5"), 
    body('password').isLength({min: 8}).withMessage("Password characters are too short. Minimum character is 8")], 
    addUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', authLogin);
router.post('/logout', authLogout);
router.get('/profile', getProfile);

export default router;
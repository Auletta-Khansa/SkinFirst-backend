import express from "express";
import { 
    getTrivias, 
    getTriviaById,
    updateTrivia,
    deleteTrivia,
    createSkinTrivia
} from "../controllers/SkinTriviaController.js";
import pkg from "multer";
const multer = pkg;

const router = express.Router();
const upload = multer();

router.get('/trivias', getTrivias);
router.get('/trivias/:id', getTriviaById);
router.post('/skinTrivia', upload.single("image"), createSkinTrivia);
router.patch('/trivias/:id', updateTrivia);
router.delete('/trivias/:id', deleteTrivia);

export default router;
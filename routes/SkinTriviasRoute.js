import express from "express";
import { 
    getTrivias, 
    getTriviaById,
    addTrivia,
    updateTrivia,
    deleteTrivia
} from "../controllers/SkinTriviaController.js";

const router = express.Router();

router.get('/trivias', getTrivias);
router.get('/trivias/:id', getTriviaById);
router.post('/trivias', addTrivia);
router.patch('/trivias/:id', updateTrivia);
router.delete('/trivias/:id', deleteTrivia);

export default router;
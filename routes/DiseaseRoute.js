import express from "express";
import { 
    getDiseases,
    addDiseases,
    getDiseasesByName
} from "../controllers/DiseaseController.js";

const router = express.Router();

router.get('/diseases', getDiseases);
router.get('/disease/:name', getDiseasesByName);
router.post('/add-disease', addDiseases);

export default router;
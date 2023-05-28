import SkinTrivia from "../models/SkinTriviaModel.js"
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const getTrivias = async (req, res) => {
    try {
        const trivias = await SkinTrivia.find();
        res.json(trivias);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getTriviaById = async (req, res) => {
    try {
        const trivias = await SkinTrivia.findById(req.params.id);
        res.json(trivias);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createSkinTrivia = async (req, res) => {
    try {
      const { name, description } = req.body;
      const { originalname, buffer, mimetype } = req.file;
      const image = {
        data: buffer.toString('base64'),
        contentType: mimetype,
      };
  
      const newSkinTrivia = new SkinTrivia({ name, description, image });
      await newSkinTrivia.save();
  
      res.status(201).json({ message: "Informations are successfully saved", newSkinTrivia});
    } catch (error) {
      res.status(500).json({ message: "There is an error occured", error: error.message });
    }
  };

export const updateTrivia = async (req, res) => {
    try {
        const updatetrivias = await SkinTrivia.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatetrivias);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteTrivia = async (req, res) => {
    try {
        const deletetrivias = await SkinTrivia.deleteOne({_id:req.params.id});
        res.status(200).json(deletetrivias);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


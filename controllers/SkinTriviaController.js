import SkinTrivia from "../models/SkinTriviaModel.js"

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

export const addTrivia = async (req, res) => {
    const trivias = new SkinTrivia(req.body);
    try {
        const insertTrivias = await trivias.save();
        res.status(201).json(insertTrivias);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

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
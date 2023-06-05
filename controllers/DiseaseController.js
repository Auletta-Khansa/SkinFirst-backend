import Disease from "../models/DiseaseModel.js"

export const getDiseases = async (req, res) => {
    try {
        const disease = await Disease.find();
        res.json(disease);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getDiseasesByName = async (req, res) => {
    try {
        const disease = await Disease.find({name: req.params.name});
        res.json(disease);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const addDiseases = async (req, res) => {
    try {
        const { name, treatments } = req.body;
    
        const newDisease = new Disease({ name, treatments});
        await newDisease.save();
    
        res.status(201).json({ message: "Disease is successfully saved", newDisease});
      } catch (error) {
        res.status(500).json({ message: "There is an error occured", error: error.message });
      }
}



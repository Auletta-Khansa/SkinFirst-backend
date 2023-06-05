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
        const { name, description, treatments } = req.body;
    
        const newDisease = new Disease({ name, description, treatments});
        await newDisease.save();
    
        res.status(201).json({ message: "Disease is successfully saved", newDisease});
      } catch (error) {
        res.status(500).json({ message: "There is an error occured", error: error.message });
      }
}

export const updateDisease = async (req, res) => {
    try {
      const { id } = req.params; // Mengambil id dari parameter URL
      const { description } = req.body; // Mengambil data yang akan diperbarui dari body request
  
      // Mencari penyakit yang akan diperbarui berdasarkan id
      const disease = await Disease.findById(id);
  
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
  
      if(!description){
        disease.description = disease.description;
        }
        else{
            disease.description = description;
        }

      // Memperbarui data penyakit dengan data baru
    //   if(name==""){
    //       disease.name = disease.name;
    //   }
    //   else{
    //       disease.name = name;
    //   }

      

    //   if(treatments==""){
    //       disease.treatments = disease.treatments;
    //   }
    //   else{
    //       disease.treatments = treatments;
    //   }
  
      await disease.save(); // Menyimpan perubahan
  
      res.status(200).json({ message: "Disease successfully updated", disease });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }
  


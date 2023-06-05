// Import model yang diperlukan
import History from "../models/HistoryModel.js"

// Contoh endpoint untuk melakukan diagnosa
export const saveHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { result, date } = req.body;

    // Membuat objek diagnosa baru
    const newDiagnosis = { result, date };

    // Menambahkan diagnosa ke riwayat pengguna
    await History.findOneAndUpdate(
      { userId },
      { $push: { diagnoses: newDiagnosis } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Diagnosis successfully added to history' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const getHistoryByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Mencari riwayat berdasarkan userId
      const history = await History.findOne({ userId });
        
      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }
  
      res.status(200).json({ data: history });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };

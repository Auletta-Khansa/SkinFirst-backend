import mongoose from "mongoose";

const AI = mongoose.Schema({
    image: {
        data: {
          type: String,
          required: true,
        },
        contentType: {
          type: String,
          required: true,
        },
      },
    date:{
        type: Date,
        required: true
    },
    result:{
        type: String,
        required: true
    },
    symptoms:{
        type: Array,
        required: true
    },
    treatment:{
        type: Array,
        required: true
    }
});

export default mongoose.model('AI', AI)
import mongoose from "mongoose";

const SkinTrivia = mongoose.Schema({
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
    name:{
        type: String,
        required: true
    },
    description:{
        type: Array,
        required: true
    }
});

export default mongoose.model('SkinTrivia', SkinTrivia)
import mongoose from "mongoose";

const SkinTrivia = mongoose.Schema({
    image:{
        type: String,
        required: true
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
import mongoose from "mongoose";

const Disease = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: "",
        required: true
    },
    treatments:{
        type: Array,
        required: true
    }
});

export default mongoose.model('Disease', Disease)
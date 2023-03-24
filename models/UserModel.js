import mongoose from "mongoose";

const User = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

export default mongoose.model('Users', User)
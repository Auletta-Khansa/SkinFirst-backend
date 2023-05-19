import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import SkinTriviasRoute from "./routes/SkinTriviasRoute.js";
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const db_string = process.env.MONGODB_STRING; 
// mongoose.connect('mongodb://localhost:27017/skinfirst-db',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect(db_string)
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'))

app.use(cors()); 
app.use(express.json());
app.use(UserRoute);
app.use(SkinTriviasRoute);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});

const port = 5000;
app.listen(port, ()=> console.log(`Server is up and running on port ${port}...`));

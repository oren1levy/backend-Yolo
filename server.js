import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user-routes.js'

const app = express();
const port = 3000;

const dbURI = 'mongodb+srv://orenlevy10:vF5tNq2pkwEtek5B@oren.bwzoi86.mongodb.net/YOLO'; 
mongoose.connect(dbURI)
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch((err) => console.log(err));


// Middleware
app.use(cors());
app.use(express.json());
app.use ("/api", userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});
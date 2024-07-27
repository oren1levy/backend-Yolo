import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user-routes.js'
import productRouter from './routes/products-routes.js'
import supplierRouter from './routes/supplier-routes.js'
import orderRouter from './routes/orders-routes.js';
import locationRouter from './routes/location-routes.js'
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI)
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch((err) => console.log(err));


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/orders", orderRouter);
app.use("/api/locations", locationRouter);


app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import dotenv from "dotenv";

//import router from user.js
import userRoutes from './routes/user.js';

//set path for process.env
dotenv.config();

//creates an express "Object" named app
const app = express();

//set up cors
app.use(cors());
app.use(express.json());
//access userRoutes with /users
app.use('/users', userRoutes);

//if database endpoint is not found
app.use(notFound);
//output error from the error handler
app.unsubscribe(errorHandler);

//set up database url and port
const PORT = process.env.PORT || 5001;

//promise to connect to MongoDB
//if connection is successful -> output the PORT it is running on
//else -> output an error message
mongoose.connect(process.env.REACT_APP_ATLAS_URL, {})
.then(() => app.listen(PORT, () =>
console.log(`Connection is established and running on port: ${PORT}`)))
.catch((err) => console.log(err.message));

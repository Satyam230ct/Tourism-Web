import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

// sending some images which can be large in size so setting limit
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true})); 
app.use(cors());

app.use('/post',postRoutes); // Have to use before cors

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        ()=>{ app.listen(PORT,
              ()=>console.log(`Server is running on ${PORT} and DB connected`))
            },
        (err)=> {
                console.log(err)
            }
);
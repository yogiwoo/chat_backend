const express=require('express');
const app=express();
const dotenv=require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();
const userRoute=require('./Routes/userRoutes');
const chatRoute=require('./Routes/chatRoutes')
const cors=require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS with options
app.use(cors(corsOptions));

const MONGO_URI=process.env.mongodb_uri
app.use(express.json())
const connect=async()=>{
   try{
    const conn=await mongoose.connect(MONGO_URI)
    console.log("Connected to DB!")
   }catch(e){
    console.log(e)
   }
}
connect();
app.get('/',(req,res)=>{
    res.send("API IS RUUNING");
})

app.use('/user',userRoute);
app.use('/chat',chatRoute)

const PORT=process.env.PORT;
app.listen(PORT,console.log("sevrer is running"))
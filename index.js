import express  from "express";
import mongoose from "mongoose";
import dontenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import path from 'path'

const app=express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json({limit:"30mb",exteded:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))

app.use('/user',userRoutes)
app.use('/video',videoRoutes)
app.use('/comment',commentsRoutes)

dontenv.config()
app.get('/',(req,res)=>{
    res.send('hello')
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server Running on the Port ${PORT}`)
})

const DB_URl = process.env.CONNECTION_URL

mongoose.connect(DB_URl,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDB database connected")
}).catch((error)=>{
    console.log(error)
})


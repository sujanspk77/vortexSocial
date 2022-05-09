const express = require("express")
const app = express()

const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

const userRoute = require("./routers/users")
const authRoute = require("./routers/auth")
const postRoute = require("./routers/posts")

dotenv.config()

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser : true , useUnifiedTopology:true},
    ()=>{
    console.log("Connected to mongo...")
})

//Middleware

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.get("/",(req,res)=>{
    res.send("Welcome to homepage")
})

app.get("/users",(req,res)=>{
    res.send("Welcome to users page")
})

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)

app.listen(7000,()=>{
    console.log("Backend server is running...")
})


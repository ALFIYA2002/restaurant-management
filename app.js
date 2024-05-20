const dotenv = require('dotenv')
dotenv.config()



const express = require('express')
const app = express()
const userRouter = require("./router/userRoute")
const { connectDb } = require("./config/db")

app.listen(3001,()=>{
console.log("server running on 3001")
})
connectDb()
app.use(express.json())

app.use("/",userRouter)
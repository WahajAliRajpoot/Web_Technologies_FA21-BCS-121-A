const express = require('express')
const  server = express()
const PORT = 3500
const ejsLayout = require("express-ejs-layouts")
server.use(ejsLayout)

server.set("view engine", "ejs")
// server.set("views","./abc")
server.use(express.static("public"))

server.get("/", async (req,res)=>{
    res.render("index")
  
})

server.get("/contact", async (req,res)=>{
    res.render("contact")
})
server.get("/shop", async (req,res)=>{
    res.render("shop")
})
server.get("/about",async (req,res)=>{
    res.render("about")
})



server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} \nhttp://localhost:${PORT}` )
})



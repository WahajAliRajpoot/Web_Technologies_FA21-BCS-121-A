const express = require('express') //import express
const  server = express()
const PORT = 3500
const ejsLayout = require("express-ejs-layouts")
server.use(ejsLayout)
//app.use acts as a middleware between request and response
//you can also ceate your own middleware
// cost mymiddleware = (req,res,next)=>{
    //console.log(req)
    //next()
//}
//server.use(mymiddleware)

server.set("view engine", "ejs")
// server.set("views","./abc")

//app.use(express.static('public')) this isused to use a middleware and express.static is builtin middleware that
//to make public folder public.Publlic folder contains public files that are accessible to anyone
//middleware modifies your request
server.use(express.static("public"))

//app.get or post or delete or app.get(path,handler),app.get("path",async(req,res)=>{})
//get request means when you enter something on browser like any port is searched on google by me
//nodemon is used such that whenever you make any change in code it restarts terminal
server.get("/", async (req,res)=>{
    res.render("index" )
  
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
server.get("/login",async (req,res)=>{
    res.render("login")
})
server.get("/signup",async (req,res)=>{
    res.render("signup")
})
server.post("/login",async (req,res)=>{
    res.render("login")
})




server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} \nhttp://localhost:${PORT}` )
})

// server.get("/",":/name", async (req,res)=>{
    // res.render("index" + req.params.name)
  
// })

//expresss and node js are almost same except some changes like you have to manually update anything in node js

// server.get("/:slug", async (req,res)=>{
//     console.log(req.params)
// console.log(req.query
    //res.render($(req.params.slug))
//)
// })

//for post and put request harry created a function in script of html  for testing


const express = require('express')

const  server = express()
const PORT = 3000


server.set("view engine", "ejs")
// server.set("views","./abc")
server.use(express.static("public"))

server.get("/", async (req,res)=>{
    res.render("index")
})

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} \nhttp://localhost:${PORT}` )
})


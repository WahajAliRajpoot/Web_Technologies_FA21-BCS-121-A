const express = require('express')
const  server = express()
const PORT = 1120
server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}` )
})
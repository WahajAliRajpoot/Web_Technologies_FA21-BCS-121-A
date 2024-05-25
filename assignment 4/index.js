const express = require('express');
const ejsLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const server = express();
const Product = require("./models/product");

// MongoDB Connection URI
//mongoose provides a connection between mongodb ,nodejs and express

server.use(ejsLayout);
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());

server.get("/products", async (req, res) => {
    let products = await Product.find();
    console.log(products);
    res.render("products", {products});
});

server.get("/api/products", async function (req, res) {
    let products = await Product.find();
    res.send(products);
});

server.get("/", async (req,res)=>{
    res.render("index");
});

server.get("/contact", async (req,res)=>{
    res.render("contact");
});

server.get("/shop", async (req,res)=>{
    res.render("shop");
});

server.get("/about",async (req,res)=>{
    res.render("about");
});

server.get("/login",async (req,res)=>{
    res.render("login");
});

server.get("/signup",async (req,res)=>{
    res.render("signup");
});

server.post("/login",async (req,res)=>{
    res.render("login");
});

// server.get("/page?", async (req, res) => {
//     const PAGE_SIZE = 5; // Number of products per page
//     const page = parseInt(req.query.page) || 1; // Get current page from query parameters or default to page 1

//     if(req.query.fields){
//         console.log(req.query.fields)
//     }
//     try {
//         const totalProducts = await Product.countDocuments();
//         //console.log(totalProducts)
//         const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
//         //console.log(totalPages)
//         const products = await Product.find()
//             .skip((page - 1) * PAGE_SIZE)
//             .limit(PAGE_SIZE);

//         res.render("index", { products, totalPages, currentPage: page });
//     } catch (err) {
//         console.error("Error fetching products:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });

server.get("/:page", async (req, res) => {
    let page = req.params.page ? req.params.page : 1;
    console.log("page",page)
    let pageSize = 5;
    let skip = (page - 1) * pageSize;
    let totalProducts = await Product.countDocuments();
    let totalPages = Math.ceil(totalProducts / pageSize);
    console.log(totalPages)
    let products = await Product.find().limit(pageSize).skip(skip);
    
    res.render("index", {products,totalPages, currentPage: page });
});
// Start the server
server.listen(5000, ()=>{
    console.log(`Server running on 5000 \nhttp://localhost:5000` );
});


mongoose.connect("mongodb://localhost:27017/ProductList").then(function () {
    console.log("Connected to productList DB");
}).catch(function () {
    console.log("Error connecting to database");
});











// const express = require('express') //import express
// const  server = express()
// const PORT = 3500
// const ejsLayout = require("express-ejs-layouts")
// server.use(ejsLayout)
// //app.use acts as a middleware between request and response
// //you can also ceate your own middleware
// // cost mymiddleware = (req,res,next)=>{
//     //console.log(req)
//     //next()
// //}
// //server.use(mymiddleware)

// server.set("view engine", "ejs")
// // server.set("views","./abc")

// //app.use(express.static('public')) this isused to use a middleware and express.static is builtin middleware that
// //to make public folder public.Publlic folder contains public files that are accessible to anyone
// //middleware modifies your request
// server.use(express.static("public"))

// //app.get or post or delete or app.get(path,handler),app.get("path",async(req,res)=>{})
// //get request means when you enter something on browser like any port is searched on google by me
// //nodemon is used such that whenever you make any change in code it restarts terminal
// server.get("/", async (req,res)=>{
//     res.render("index" )
  
// })

// server.get("/contact", async (req,res)=>{
//     res.render("contact")
// })
// server.get("/shop", async (req,res)=>{
//     res.render("shop")
// })
// server.get("/about",async (req,res)=>{
//     res.render("about")
// })
// server.get("/login",async (req,res)=>{
//     res.render("login")
// })
// server.get("/signup",async (req,res)=>{
//     res.render("signup")
// })
// server.post("/login",async (req,res)=>{
//     res.render("login")
// })





// server.listen(PORT, ()=>{
//     console.log(`Server running on ${PORT} \nhttp://localhost:${PORT}` )
// })

// // server.get("/",":/name", async (req,res)=>{
//     // res.render("index" + req.params.name)
  
// // })

// //expresss and node js are almost same except some changes like you have to manually update anything in node js

// // server.get("/:slug", async (req,res)=>{
// //     console.log(req.params)
// // console.log(req.query
//     //res.render($(req.params.slug))
// //)
// // })

// //for post and put request harry created a function in script of html  for testing


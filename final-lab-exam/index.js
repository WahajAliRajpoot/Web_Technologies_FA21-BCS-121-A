const express = require('express');
const ejsLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const server = express();
const Product = require("./models/product");
const bodyParser = require("body-parser")
const session = require("express-session");

// MongoDB Connection URI
//mongoose provides a connection between mongodb ,nodejs and express

server.use(ejsLayout);
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))


server.use("/api/user", require("./routes/api/user"))

server.get("/products", async (req, res) => {
    let products = await Product.find();
    // console.log(products);
    res.render("products", {products,req:req});
});

server.get("/api/products", async function (req, res) {
    let products = await Product.find();
    res.send(products);
});

server.get("/", async (req,res)=>{
    res.render("index", { req: req});
});



// View cart
server.get('/cart', async (req, res) => {
    
    console.log("HI")
        let cart = req.session.cart ;
        if(!cart){
            req.session.cart = []
            cart= []
        }
        //const productIds = cart.map(item => item.productId);
    
       // const products = await Product.find({ '_id': { $in: productIds } });
    
        // const cartWithDetails = products.map(product => {
        //     const productInCart = cart.find(item => item.productId === product._id.toString());
        //     return {
        //         ...product._doc,
        //         quantity: productInCart.quantity
        //     };
        // });
        res.render('cart', { cart: cart, req: req });
    
    
    });
    
    
  


server.get("/contact", async (req,res)=>{
    res.render("contact", { req: req});
});

server.get("/shop", async (req,res)=>{
    res.render("shop", { req: req});
});



server.get("/about",async (req,res)=>{
    res.render("about", { req: req});
});

server.get("/login",async (req,res)=>{
    res.render("login", { req: req});
});

server.get("/register",async (req,res)=>{
    res.render("signup", { req: req});
});



server.get("/:page", async (req, res) => {
    let page = req.params.page ? req.params.page : 1;
    // console.log("page",page)
    let pageSize = 5;
    let skip = (page - 1) * pageSize;
    let totalProducts = await Product.countDocuments();
    let totalPages = Math.ceil(totalProducts / pageSize);
    // console.log(totalPages)
    let products = await Product.find().limit(pageSize).skip(skip);
    
    res.render("index2", {products,totalPages, currentPage: page, req:req });
});




  // Add product to cart
  server.post('/add-to-cart/:id', (req, res) => {
    const productId = req.params.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(productId)
   // console.log(req.session.cart)

    // const productIndex = req.session.cart.findIndex(item => {
    //     console.log(item)
    //     item.productId.toString() === productId.toString()
    // });

    // if (productIndex > -1) {
    //     req.session.cart[productIndex].quantity += 1;
    // } else {
    //     req.session.cart.push({ productId: productId, quantity: 1 });
    // }
    console.log(req.session.cart)
res.sendStatus(200)
   // res.render('cart', {cart: req.session.cart, req: req});
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


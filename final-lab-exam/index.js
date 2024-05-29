const express = require('express');
const ejsLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const server = express();
const Product = require("./models/product");
const bodyParser = require("body-parser")
const session = require("express-session");
const router = require("./routes/api/products")
const FeaturedProduct = require("./models/FeaturedProducts");

// MongoDB Connection URI
//mongoose provides a connection between mongodb ,nodejs and express

server.use(ejsLayout);
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.json());
server.use(bodyParser.json())
server.use(router);
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
    let featuredProducts = await FeaturedProduct.find();
    let products = await Product.find().limit(pageSize).skip(skip);
    
    res.render("index2", {products,featuredProducts,totalPages, currentPage: page, req:req });
});




  // Add product to cart
  server.post('/add-to-cart/:id', (req, res) => {
    const productId = req.params.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(productId)
   
    console.log(req.session.cart)
res.sendStatus(200)
   // res.render('cart', {cart: req.session.cart, req: req});
});
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }
        if (!req.session.visitedProducts.includes(product._id.toString())) {
            req.session.visitedProducts.push(product._id.toString());
        }

        console.log(req.session.visitedProducts)



        res.render("products", { products: product, req: req})
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/visited-products', async (req, res) => {
    try {
        if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
            return res.render('visited-product', {  products: [], req: req});
        }
        const products = await Product.find({ _id: { $in: req.session.visitedProducts } });


        res.render('visited-product', {  products: products, req: req });
    } catch (err) {
        res.status(500).send(err);
    }
});
server.post('/add-to-cart/:id', (req, res) => {
    const productId = req.params.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(productId);

    res.send({ success: true });
});



// Start the server
server.listen(5500, ()=>{
    console.log(`Server running on 5500 \nhttp://localhost:5500` );
});


mongoose.connect("mongodb://localhost:27017/ProductList").then(function () {
    console.log("Connected to productList DB");
}).catch(function () {
    console.log("Error connecting to database");
});












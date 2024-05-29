const express = require("express");
const router = express.Router();
const User  = require("../../models/User"); // You are importing the Reciever model


router.get("/", async function (req, res) {
    // Fetch all user from the database and send them as a response
    let user = await User.find();
    console.log("user/",user);
    return res.send(user);
});


router.post("/register", async function (req, res) {
console.log("register req body \n",req.body)

    try {
        const user = await User.create(req.body);
        console.log("User created:", user);
        res.redirect("/login"); 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Error creating user" }); // Send an error response
    }
});



router.post("/login", async function (req, res) {


    const { email, password } = req.body
    console.log("Email",email)
    try {
        const user= await User.findOne({email:email });
        console.log("user",user)
         if(!user) return res.redirect("/register")
       console.log("password ",password, user.password)
            if((password !== user.password)) return res.redirect("/login")

       req.session.user = user;
        res.cookie('userLoggedIn', 'true', { maxAge: 900000, httpOnly: true });
        console.log("REQSESSION: ",req.session.user)
        
        res.redirect("/")
    // console.log(user)
    } catch (error) {
        res.redirect("/login")
        throw new Error(error)
        
    }
  //  res.redirect("/login")
    
});



module.exports = router;
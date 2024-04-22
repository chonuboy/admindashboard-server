const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

var userArrLength;
var productArrLength;

mongoose.connect("mongodb+srv://chonu:123@cluster0.4ewp8p0.mongodb.net/dash?retryWrites=true&w=majority").then(function () {
  console.log("Connected with DB...")
}).catch(function (err) {
  console.log("Failed to Connect:",err)
})

app.use(cors())

app.use(express.json())

const PORT=process.env.PORT || 8080;
const HOST="0.0.0.0"

app.listen(PORT,HOST, function () {
  console.log(`Server Started on port : ${PORT} host: ${HOST}`)
})


// Schema for Users..
const users = mongoose.model("users", {
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  createdAt: String,
  verified: Boolean
}, "users")


// Schema for Products...
const products=mongoose.model("products",{
    id: Number,
    title: String,
    color: String,
    producer: String,
    price: String,
    createdAt: String,
    inStock: Boolean
},"products")


app.get("/api/user", async function (req, res) {
  try {
    const retUsers = await users.find();
    res.status(200).json(retUsers);
    userArrLength=retUsers.length+1;
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/api/user",function (req, res) {
  try{
    const userArr={
    id:userArrLength,
    firstName:req.body.formData[0].value,
    lastName: req.body.formData[1].value,
    email: req.body.formData[2].value,
    phone: req.body.formData[3].value,
    createdAt: req.body.formData[4].value,
    verified: req.body.formData[5].value}
  users.insertMany([userArr]).then(function(){
    res.status(201).json({message:"User Added Successfully"});
  })
}catch(err){
  console.log(err);
  res.status(500).send("Internal Server Error");
}
})

app.delete("/api/users/delete/:id", function (req, res) {
  const deluserId = parseInt(req.params.id)
  try{
    users.deleteOne({id:deluserId}).then(function(){
      res.status(200).json({ message: "Data Deleted Successfully..." })
    })
    
  } catch(err) {
    console.log(err);
    res.status.send("Error while Deleting User...")
  }
})

app.get("/api/product", async function (req, res) {
  try {
    const retProducts = await products.find();
    res.status(200).json(retProducts);
    productArrLength=retProducts.length+1;
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/product", function (req, res) {
  try{
  const productArr ={
    id: productArrLength,
    title: req.body.formData[0].value,
    color: req.body.formData[1].value,
    producer: req.body.formData[2].value,
    price: req.body.formData[3].value,
    createdAt: req.body.formData[4].value,
    inStock: req.body.formData[5].value}
    products.insertMany([productArr]).then(function(){
      res.status(201).json({message:"Product Added Successfully..."});
    })
  }
  catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
})

app.delete("/api/products/delete/:id", function (req, res) {
    const delproductId = parseInt(req.params.id);
    try{
      products.deleteOne({id:delproductId}).then(function(){
        res.status(200).json({ message: "Data Deleted Successfully..." });
      })
    } 
    catch(err){
        console.log(err);
        res.status(500).send("Error while Deleting Product...")
    }
});


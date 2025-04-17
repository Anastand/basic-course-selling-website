const express = require("express");
const arouter = express.Router();
const { adminModel } = require("../db");
const { z } = require("zod");
const bcr = require("bcrypt");
const jwt  = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require("../config");
const admin = require("../middlewares/admin");



arouter.post('/signup', async (req, res) => {
  // Set up Zod schema to validate request body fields
  const bodyvalidation = z.object({
    email: z.string().email().min(3).max(100),    // Validates email format and length
    password: z.string().min(3).max(100),         // Ensures password is 3-100 characters
    firstName: z.string().min(3).max(100),        // Checks firstName length is 3-100 characters
    lastName: z.string().min(3).max(100)          // Checks lastName length is 3-100 characters
  });

  // Parse and validate the request body using the Zod schema
  const succededbodyvalidation = bodyvalidation.safeParse(req.body);
  try {
    // If validation fails, send an error response and exit
    if (!succededbodyvalidation) {
      res.send({ msg: "Invalid credentials" });
      return;
    }
  } catch (error) {
    // Catch any unexpected errors during validation and respond with details
    res.send({ msg: "Error during body validation", error: error.message });
    return;
  }

  // Extract user details from the validated request body
  const { email, firstName, lastName, password } = req.body;

  // Hash the password with 5 salt rounds for secure storage
  const hashedpass = await bcr.hash(password, 5);

  try {
    // Save the new user to the database with hashed password
    await adminModel.create({
      email,
      password: hashedpass,
      firstName,
      lastName
      
    });
    // Send success message to the client
    res.send({ msg: "Signup succeeded" });
  } catch (error) {
    // Handle any database errors (e.g., duplicate email) with a generic message
    res.send({ msg: "Something went wrong" });
  }
});

arouter.post('/signin', async (req, res) => {
  console.log("hello from admin signup")
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email })
  console.log(admin)
  if (!admin) {
    res.send({msg:"this email doesnt exist"})
    return
  };
  try {
    const ismatch = await bcr.compare(password, admin.password)
    console.log(ismatch)
    if (!ismatch) {
    res.send({msg:"this password is worng"})
    return
    };
    const admintoken = jwt.sign({ id: admin._id.toString() }, admin123);
    console.log(admintoken)
    res.send({ token: admintoken });
  } catch (e) {
    res.send({msg:"we had some problem in the backend"})
  }
  
});

arouter.post('/Course/create', admin, async (req, res) => {
  console.log('hello from create course admin');
  const adminID = req.adminID;
  const { title, courseID, description, price, imgurl } = req.body;
  const course = await adminModel.create({
    title,
    courseID:adminID,
    description,
    price,
    imgurl
  });
  res.json({
    msg: "Created course",
    courseID: course._id
  })
});
arouter.put('/Course/modify', (req, res) => {
  
  res.json({ msg: 'hello from moify course admin' });
});
arouter.get('/Courses/bulk', (req, res) => {
  res.json({ msg: 'hello from course bulk admin' });
});

module.exports = arouter;
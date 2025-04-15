// Import Express module for creating server routes
const express = require('express');
// Create a router instance to manage user-related endpoints
const urouter = express.Router(); // Create a router for user-related routes
// Import the user model from the database file for MongoDB interaction
const { userModel } = require("../db"); // Import user model from database
// Import Zod library for validating incoming request data
const { z } = require("zod"); // Import Zod for validation
// Import bcrypt for hashing passwords securely
const bcr = require("bcrypt"); // Import bcrypt for password hashing
const jwt  = require('jsonwebtoken');
const { JWT_USERS_PASSWORD } = require('../config');




// Define signup route to handle new user registration
urouter.post('/signup', async (req, res) => {
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
    await userModel.create({
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

// Define signin route as a placeholder for user login functionality
urouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email })
  if (!user) {
    res.send({msg:"this email doesnt exist"})
    return
  };
  try {
    const ismatch = await bcr.compare(password, user.password)
    if (!ismatch) {
    res.send({msg:"this password is worng"})
    return
    };
    const usertoken = jwt.sign({ id: user._id.toString() }, JWT_USERS_PASSWORD);
    console.log(usertoken)
    res.send({ msg: usertoken });
  } catch (e) {
    res.send({msg:"we had some problem in the backedn"})
  }
  
});

// Define purchases route as a placeholder for retrieving user purchase data
urouter.get('/purchases', (req, res) => {
  // Return a simple response (to be expanded with purchase retrieval logic)
  res.json({ msg: 'Hello from purchases' });
});

// Export the router for use in the main application
module.exports = urouter;
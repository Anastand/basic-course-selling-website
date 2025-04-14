const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;


const userschema = schema({
  name: String,
  userID: objectID,
  email: {type:String, unique:true},
  password: String,
  firstName:String,
  lastName:String
})

const adminchema = schema({
  name: String,
  userID: objectID,
  email: {type:String, unique:true},
  password: String,
  firstName:String,
  lastName:String
})

const courseschema = schema({
  title: String,
  courseID: objectID,
  description: String,
  price: Number,
  imgurl: String,
  
})
const purchsedschema = schema({
  userID: objectID,
  courseID: objectID
})

const userModel = mongoose.model("user", userschema);
const adminModel = mongoose.model("admin", adminchema);
const courseModel = mongoose.model("course", courseschema);
const previewModel = mongoose.model("preview", purchsedschema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  previewModel
}
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const userschema = new schema({
  name: String,
  userID: objectID,
  email: {type:String, unique:true},
  password: String,
  firstName:String,
  lastName:String
})

const adminchema = new schema({
  name: String,
  userID: objectID,
  email: {type:String, unique:true},
  password: String,
  firstName:String,
  lastName:String
})

const courseschema = new schema({
  title: String,
  courseID: objectID,
  description: String,
  price: Number,
  imgurl: String,
  
})
const purchsedschema = new schema({
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
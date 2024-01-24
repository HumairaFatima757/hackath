const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/profilepage")
const userschema = new mongoose.Schema({
  projectname: {
    type: String,
  
  },
 
  password: {
    type: String,
   
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  image: {
    type: String,
    
  },
  email: {
    type: String,
   
  
   
  },
  role: {
    type: String,
    default: "user",
   
  },
  phoneNumber: {
    type: String,
   
  },
  projectdesc: {
    type: String,
    
  },
  id: {
    type: String,
   
  },
  
  url: {
    type: String,
   
  },
  username: {
    type: String,
    // require: true,
    
   
  }

});
userschema.plugin(plm)


module.exports = mongoose.model('user', userschema);



const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

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
    dp: {
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
      require: true,
      
     
    },
  
  
  
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  currentDate: {
    type: Date,
    default: Date.now
  },
 

});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;

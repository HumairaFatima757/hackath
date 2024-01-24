const express = require('express');
const router = express.Router();
const userModel = require("./users");
const postModel = require("./Posts");
const passport = require('passport');
const localStrategy = require("passport-local");
const upload = require("./multer")

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/alluserposts",async function (req, res, next) {
//   let user = await userModel
//   .findOne({ _id: "65af89e57474456b08fc1fd3" }).populate("posts")
  
// res.send(user)

// });




// router.get("/createpost", async function (req, res, next) {
//   let createdpost = await postModel.create({
//     postText:"hello everyone ",
//     user: "65af89e57474456b08fc1fd3"
   
//    });

// let user =  await userModel.findOne({_id: "65af89e57474456b08fc1fd3"})
//    user.posts.push(createdpost._id)
//    await user.save();
//    res.send("done")
//  });





router.get('/login', function(req, res,next)  {

  res.render('login' ,{error: req.flash("error")});
});

router.get('/profile', isLoggedIn,async function (req, res,next )  {
  const user = await userModel.findOne({
    username: req.session.passport.user
   
  })
  
  res.render("profile" ,{user , } );
});

// router.get('/addstudent', isLoggedIn,async function (req, res,next )  {
//   const user = await userModel.findOne({
//     username: req.session.passport.user
   
//   })
  
//   res.render("addstudent" ,{user  } );
//   res.redirect("/studentcard");
// });

router.get('/checkin', isLoggedIn, (req, res,next ) => {
  res.render("checkin");
});



router.post('/add', async (req, res) => {
  const {  email, username} = req.body;
  const added = new userModel({  email, username });

  userModel.register(added, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res,async function() {
  

       
      });
    })
    .catch(err => {
      console.error(err);
      res.redirect("/"); // Redirect to home in case of registration failure
    });

    
        


});


// router.get("/addstudent", function (req, res, next) {
//   res.render("addstudent", { title: "Express" });
// });



router.post('/register', (req, res) => {
  const {  email, username} = req.body;
  const userData = new userModel({  email, username });

  userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res,function() {
        res.redirect("/admin");
      });
    })
    .catch(err => {
      console.error(err);
      res.redirect("/"); // Redirect to home in case of registration failure
    });
});


router.get('/studentcard',isLoggedIn, async function(req, res, next ) {
  const user = await userModel.findOne({
    username: req.session.passport.user
   
  }).populate("posts")

  res.render('studentcard'); 
 });




// router.post('/addstudent', (req, res) => {
//   const { email, studentName } = req.body;
//   const studentData = new postModel({ email, studentName });

// postModel.addStudent(studentData, req.body.password)
//     .then(() => {
//       passport.authenticate('local')(req, res, function () {
//         res.redirect('/studentcard');
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.redirect('/'); // Redirect to home in case of registration failure
//     });
// });





// router.post("/addstudent", async function (req, res, next) {
//  let addstudent = await userModel.create({
//     studentName: req.body.studentName,
//     password: req.body.password,
//     posts: [],
  
//     email: req.body.email,
//     phoneNumber: req.body.phoneNumber,
//     course: req.body.course,
//   });
  
//   userModel.addstudent(addstudent, req.body.password)
//     .then(function(){
//       passport.authenticate("local")(req, res,function() {
//         res.redirect("/studentcard");
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.redirect("/"); // Redirect to home in case of registration failure
//     });
// });
 
// router.post("/addstudent", async function (req, res, next) {
//   try {
//     const student = await userModel.addStudent({
//       studentName: req.body.studentName,
//       password: req.body.password,
//       email: req.body.email,
//       phoneNumber: req.body.phoneNumber,
//       course: req.body.course,
//     }, req.body.password);

//     passport.authenticate("local")(req, res, function () {
//       res.redirect("/studentcard");
//     });
//   } catch (error) {
//     console.error(error);
//     res.redirect("/");
//   }
// });



router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// router.post('/addstudent', isLoggedIn,  function(req, res, next ){
//    res.redirect("/profile");
  
// });


router.get('/admin',  function(req, res, next ) {

   res.render('admin'); 
  
  
});

router.get('/feed', function(req, res, next ) {
  res.render('feed'); 
 });
 

 router.post('/upload', upload.single("file"), async function(req, res, next ) {
  if(!req.file){
   return  res.status(  404).send("no files were found ")
  }
  const user = await userModel.findOne({username:req.session.passport.user}).populate("posts")
    const userdata = await postModel.create({
      image: req.file.filename,
      projectname: req.body.username,
      phoneNumber: req.body.phoneNumber,
      projectdesc: req.body.projectdesc,
     
      user: user._id
      })
      // console.log(user)
      user.posts.push(userdata._id);
      await user.save();
    res.render("studentcard", {user});
 });

router.get('/login', function(req, res, next ) {
  res.render('login'); 
 });

 router.post("/update", upload.single("image"), async function (req, res) {
  const user = await userModel.findOneAndUpdate(
    { username: req.session.passport.user },
    {
      username: req.body.username,
      name: req.body.name,
      bio: req.body.bio,
    },
    { new: true }
  );
  if (req.file) {
    user.profileImage = req.file.filename;
  }

  await user.save();
  res.render("profile");
});

router.get('/addproject', function(req, res, next ) {
  res.render('addproject'); 
 });

router.get('/project', function(req, res, next ) {
  res.render('project'); 
});

router.get("/feed", isLoggedIn,async function (req, res) {
  const posts =  await postModel.find().populate("user");
  
   res.render("feed", { footer: true ,posts });
 });


router.get('/logout',function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}



module.exports = router;




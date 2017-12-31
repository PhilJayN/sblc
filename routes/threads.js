var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var middleware = require("../middleware");

//show new form to CREATE threads
router.get('/threads/new', function (req, res) {
  Thread.find({}, function(err, allThreads){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      res.render('threads/new.ejs');
    }
  });
});





//CREATE Route: add thread to DB
router.post('/threads', function (req, res) {
  console.log ('post req occured, here is the req.body:', req.body);
  // var thread = req.body.thread.text; //thread looks like: { thread: 'hey' }
  // var subject = req.body.
  // var date = new Date();
  // var humanDate = date.toDateString();
  // var humanTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}, { timeZone: 'America/Los_Angeles', hour12: true });
  // var author = {
  //   id: req.user._id,
  //   username: req.user.username
  // };
  //
  // ////takes data from variables name and image, and stores into an obj
  // var newComment = {text: thread, submittedDate: humanDate, submittedTime: humanTime, author: author};
  // //save obj into the DB:
  // Comment.create(newComment, function(err, newlyCreated) {
  //   if(err) {
  //     console.log (err);
  //   } else {
  //         console.log('newlyCreated', newlyCreated);
  //         req.flash("success", "New thread added!");
  //         res.redirect('/');
  //   }
  // });

}); //// end post route for /comments








// router.get('/threads', function(req, res) {
//   res.send('threads route!');
// });
//
// router.get('/threads/new', function(req, res) {
//     res.render('threads/new.ejs');
// });


//works to create seeds in DB:
// Thread.create(
//      {
//       subject: 'My subject',
//       text: "my text",
//       submittedOn: "march 1 3000"
//      },
//      function(err, comment){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED thread: ");
//           console.log(comment);
//       }
//     });

module.exports = router;

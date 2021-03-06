var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var middleware = require("../middleware");
// var mainJS = require("../public/js/main.js");


//show new form to CREATE comments on main page:
router.get('/comments/new', middleware.isLoggedIn, function (req, res) {
  Comment.find({}, function(err, allComments){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      res.render('comments/new.ejs');
    }
  });
});

//show form to EDIT a  particular comment that has unique ID
router.get('/comments/:id/edit', function (req, res) {
  // console.log ('params:', req.params.id);
  Comment.findById(req.params.id, function(err, foundComment) {
    res.render('comments/edit.ejs', {comment: foundComment});
    // res.render('comments/edit.ejs', {comment_id: req.params.id, comment: foundComment});
  });
});

//UPDATE route  for comments
router.put('/comments/:id', function(req, res) {
  // res.send('you hit update comment route');
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment) {
    console.log('UPDATED COMMENT', updatedComment);
    if (err) {
      res.redirect('/back');
    } else {
      console.log ('req.body.comment', req.body.comment);
      req.flash("success", "Comment edited!");
      res.redirect('/');
    }
  });
});

//DELETE route for comment
router.delete('/comments/:id', function (req, res) {

  // console.log ('delete route start!!');
  //
  // var ctrlDelItem = function(event) {
  //   //1. asks user to Confirm
  //   var userAns = prompt('Please type in yes, then press DELETE.');
  //   if (userAns.toLowerCase() === 'yes') {
  //     console.log ('asdfjkl;');
  //   }
  // };
  //
  // ctrlDelItem();

  Comment.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect('/');
    }
  });
});

//CREATE Route: add user comment to DB
//when there's a POST request to /comments... (occurs after clicking submit btn on comments/new page)
router.post('/comments', middleware.isLoggedIn, function (req, res) {
  console.log ('post req occured, here is the req.body:', req.body);
  var comment = req.body.comment.text; //comment looks like: { comment: 'hey' }
  var date = new Date();
  var humanDate = date.toDateString();
  var humanTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}, { timeZone: 'America/Los_Angeles', hour12: true });
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  ////takes data from variables name and image, and stores into an obj
  var newComment = {text: comment, submittedDate: date, submittedTime: humanTime, author: author};
  //save obj into the DB:
  Comment.create(newComment, function(err, newlyCreated) {
    if(err) {
      console.log (err);
    } else {
          console.log('newlyCreated', newlyCreated);
          req.flash("success", "New comment added!");
          res.redirect('/');
    }
  });

}); //// end post route for /comments


// Comment.create(
//      {
//          text: "Comment creation test db",
//          submittedOn: "march 1 2050"
//
//      },
//      function(err, comment){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED comment: ");
//           console.log(comment);
//       }
//     });


router.get('/r/:subredditName/:id', function (req, res) {
  res.send('hiii!');
  console.log ('id from params', req.params.id);
  console.log ('subredditName from params', req.params.subredditName);
});


module.exports = router;





























////SEEDS: works to create a comment in the DB:
// Comment.create(
//      {
//          text: "Granite Hill",
//          submittedOn: "march 1 1998"
//
//      },
//      function(err, comment){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED comment: ");
//           console.log(comment);
//       }
//     });

////removes comments from db
// Comment.remove({}, function(err){
//   if(err){
//     console.log (err);
//   } else{
//     console.log('removed all comments from db!');
//   }
// });

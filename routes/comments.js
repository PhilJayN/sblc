var express = require("express");
var router = express.Router({mergeParams: true});
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//show new form to create comments on main page:
router.get('/comments/new', middleware.isLoggedIn, function (req, res) {
  Comment.find({}, function(err, allComments){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      res.render('comments/new.ejs');
    }
  });
});

router.get('/r/:subredditName/:id', function (req, res) {
  res.send('hiii!');
  console.log ('id from params', req.params.id);
  console.log ('subredditName from params', req.params.subredditName);
});


//show form to edit a  particular comment that has unique ID
router.get('/comments/:id/edit', function (req, res) {
  // console.log ('params:', req.params.id);
  Comment.findById(req.params.id, function(err, foundComment) {
    res.render('comments/edit.ejs', {comment: foundComment});
    // res.render('comments/edit.ejs', {comment_id: req.params.id, comment: foundComment});
  });
});

//update route  for comments
router.put('/comments/:id', function(req, res) {
  // res.send('you hit update comment route');
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment) {
    console.log('UPDATED COMMENT', updatedComment);
    if (err) {
      res.redirect('/back');
    } else {
      console.log ('req.body.comment', req.body.comment);
      res.redirect('/');
    }
  });
});

//DELETE route for comment
router.delete('/comments/:id', function (req, res) {
  Comment.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect('/');
    }
  });
});

//EDIT
// router.get('/photos/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
//   Comment.findById(req.params.comment_id, function(err, foundComment) {
//     res.render('comments/edit.ejs', {photo_id: req.params.id, comment: foundComment});
//   });
// });

////works to create a comment in the DB:
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

//CREATE Route: add user comment to DB
//when there's a POST request to /comments... (occurs after clicking submit btn on comments/new page)
router.post('/comments', middleware.isLoggedIn, function (req, res) {
  console.log ('post req occured, here is the req.body:', req.body);
  var comment = req.body.comment.text; //comment looks like: { comment: 'hey' }
  var date = new Date();
  var humanDate = date.toDateString();
  var humanTime = date.toLocaleTimeString('en-US');
  // var dateTimeObj = {
  //   humanDate: date.toDateString(),
  //   humanTime: date.toLocaleTimeString()
  // };
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  console.log ('comment', comment);
  // console.log ('date', humanDate);
  // console.log ('time', humanTime);

  ////takes data from variables name and image, and stores into an obj:
  var newComment = {text: comment, submittedDate: humanDate, submittedTime: humanTime, author: author};
  //put obj into the DB:
  Comment.create(newComment, function(err, newlyCreated) {
    if(err) {
      console.log (err);
    } else {
          console.log('newlyCreated', newlyCreated);
          res.redirect('/');
    }
  });

}); //// end post route for /comments

router.post('/', function(req, res) {
  res.send('there was a post req.');
  //get form data form input fields:
  console.log('req.body.comment input', req.body.comment);
});









//CREATE
router.post('/photos/:id/comments', middleware.isLoggedIn, function(req, res){
  Photo.findById(req.params.id, function(err, photo) {
    if(err) {
      console.log(err);
    } else {
      console.log('req.body.comment input', req.body.comment);
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          req.flash("error", "Oops! Something went wrong.");
          console.log(err);
        } else {
          console.log('comment prior:', comment); //shows comment before anything added
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          console.log('resulting comment', comment);

          photo.comments.push(comment);
          photo.save();
          req.flash("success", "Successfully added new comment.");
          res.redirect("/photos/" + photo._id);
        }
      });
    }
  });
});

//EDIT
router.get('/photos/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    res.render('comments/edit.ejs', {photo_id: req.params.id, comment: foundComment});
  });
});

//UPDATE
router.put('/photos/:id/comments/:comment_id', middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/photos/' + req.params.id);
    }
  });
});

//DELETE
router.delete('/photos/:id/comments/:comment_id', middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect('/photos/' + req.params.id);
    }
  });

});

module.exports = router;

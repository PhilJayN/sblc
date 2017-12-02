var express = require("express");
var router = express.Router({mergeParams: true});
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//ROUTES: COMMENTS
//NEW
//show new form to create comments:
// router.get('/photos/:id/comments/new', middleware.isLoggedIn, function(req, res) {
//   Photo.findById(req.params.id, function(err, foundPhoto) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('comments/new.ejs', {photo: foundPhoto});
//     }
//   });
// });

//show new form to create comments on main page: don't forget to add middleware.isLoggedIn
router.get('/comments/new', function (req, res) {
  Comment.find({}, function(err, allComments){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      res.render('comments/new.ejs');
    }
  });
});


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

//WORK IN PROGRESSS:
//CREATE Route: add user comment to DB
//when there's a POST request to /comments... (occurs after clicking submit btn on comments/new page)
router.post('/comments', function (req, res) {
  console.log ('post req occured, here is the req.body:', req.body);
  var comment = req.body.comment.text; //comment looks like: { comment: 'hey' }
  var date = new Date();
  var humanDate = date.toDateString();
  var humanTime = date.toLocaleTimeString('en-US');
  // var dateTimeObj = {
  //   humanDate: date.toDateString(),
  //   humanTime: date.toLocaleTimeString()
  // };

  console.log ('comment', comment);
  // console.log ('date', humanDate);
  // console.log ('time', humanTime);

  ////takes data from variables name and image, and stores into an obj:
  var newComment = {text: comment, submittedDate: humanDate, submittedTime: humanTime};
  //put obj into the DB:
  Comment.create(newComment, function(err, newlyCreated) {
    if(err) {
      console.log (err);
    } else {
          console.log('newlyCreated', newlyCreated);
          res.redirect('/');
    }
  });



  // router.post('/comments', middleware.isLoggedIn, function (req, res) {
  //   console.log ('post req occured, here is the req.body:', req.body);
  //   var comment = req.body.comment;
  //   var date = new Date();
  //   var humanDate = date.toDateString();
  //   var humanTime = date.toLocaleTimeString('en-US');
  //   console.log ('comment', comment);
  //   console.log ('date', humanDate);
  //   console.log ('time', humanTime);
  //
  //   ////takes data from variables name and image, and stores into an obj:
  //   var newComment = {comment: comment, humanDate: humanDate, humanTime: humanTime};
  //   //put obj into the DB:
  //   Comment.create(newComment, function(err, newlyCreated) {
  //     if(err) {
  //       console.log (err);
  //     } else {
  //           console.log('newlyCreated', newlyCreated);
  //           res.redirect('/');
  //     }
  //   });






  // //CREATE Route: add to DB
  // //when there's a POST request to /photos/addPhoto...
  // router.post('/photos', middleware.isLoggedIn, function (req, res) {
  //   //run these codes:
  //   var name = req.body.name;
  //   var image = req.body.image;
  //   var description = req.body.description;
  //   var author = {
  //     id: req.user._id,
  //     username: req.user.username
  //   };
  //   //takes data from variables name and image, and stores into an obj:
  //   var newImage = {name: name, image: image, description: description, author: author};
  //   Photo.create(newImage, function(err, newlyCreated){
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('newlyCreated', newlyCreated);
  //       res.redirect('/photos');
  //     }
  //   });
  // });


  // var newImage = {name: name, image: image, description: description, author: author};
  // Photo.create(newImage, function(err, newlyCreated){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('newlyCreated', newlyCreated);
  //     res.redirect('/photos');
  //   }
  // });

  // var author = {
  //   id: req.user._id,
  //   username: req.user.username
  // };


///is this a dangling bracket???! :
});



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

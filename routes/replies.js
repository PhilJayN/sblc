var express = require("express");
var router = express.Router({mergeParams: true});
var Reply = require("../models/reply");
var middleware = require("../middleware");

//works to seed in DB:
// Reply.create(
//      {
//       text: "my reply text",
//       submittedOn: "march 1 3000"
//      },
//      function(err, reply){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED reply: ");
//           console.log(reply);
//       }
//     });


//CREATE
router.post('/threads/reply', function(req, res){
  Thread.findById(req.params.id, function(err, photo) {
    if(err) {
      console.log(err);
    } else {
      console.log('req.body.comment input', req.body.comment);
      Reply.create(req.body.comment, function(err, comment) {
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



module.exports = router;

var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var middleware = require("../middleware");
var Reply = require("../models/reply");



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


//show form to REPLY to a  particular thread that has unique ID
router.get('/threads/:id/reply', function (req, res) {
  // console.log ('params:', req.params.id);
  Thread.findById(req.params.id, function(err, foundThread) {
    res.render('threads/reply.ejs', {thread: foundThread});
  });
});




//CREATE DELETE ANYTIME
// router.post('/photos/:id/comments', middleware.isLoggedIn, function(req, res){
//   Photo.findById(req.params.id, function(err, photo) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log('req.body.comment input', req.body.comment);
//       Comment.create(req.body.comment, function(err, comment) {
//         if(err) {
//           req.flash("error", "Oops! Something went wrong.");
//           console.log(err);
//         } else {
//           console.log('comment prior:', comment); //shows comment before anything added
//           //add username and id to comment
//           comment.author.id = req.user._id;
//           comment.author.username = req.user.username;
//           comment.save();
//           console.log('resulting comment', comment);
//
//           photo.comments.push(comment);
//           photo.save();
//           req.flash("success", "Successfully added new comment.");
//           res.redirect("/photos/" + photo._id);
//         }
//       });
//     }
//   });
// });


//CREATE, add data to threads replies in DB
//post req. occurs when submit btn on form is clicked
router.post('/threads/reply', function (req, res) {
  console.log ('post req occured due to reply btn submit', req.body);
  console.log('req.user', req.user);
  //use body-parser to get data from 'name' attribute in form
  var reply = req.body.reply;
  //id has its roots in main.js, where .getAttribute helps us get the id of thread from HTML attribute.
  var id = req.body.threadId;
  console.log ('id:!!!', id);

  //find a thread in DB by its ID. get ID from hidden input field in HTML
  Thread.findById(id, function(err, foundThread) {
    if(err) {
      console.log (err);
    } else {
      console.log ('foundThread from db', foundThread);
      
      // Reply.create(req.body.reply, function(err, reply) {
      //   if(err) {
      //     console.log(err);
      //   } else {
      //     console.log('reply from user', reply);
      //
      //     // reply.author.id = req.user._id;
      //     // reply.author.username = req.user.username;
      //     // reply.save();
      //     // console.log('resulting reply', reply);
      //
      //
      //     //now for data association between thread and reply:
      //     // foundThread.replies.push(reply);
      //     // foundThread.save();
      //     // req.flash("success", "Successfully added new reply.");
      //
      //   }
      //
      // });

      res.redirect('/');

    }
  });

});



//keep track of author
// var author = {
//   id: req.user._id,
//   username: req.user.username
// };


//CREATE Route: add thread to DB
router.post('/threads', function (req, res) {
  console.log ('post req occured, here is the req.body:', req.body);
  console.log ('subject:', req.body.thread.subject);
  console.log ('text:', req.body.thread.text);

  var subject = req.body.thread.subject; //thread looks like: { thread: 'hey' }
  var text = req.body.thread.text;
  var date = new Date();
  var humanDate = date.toDateString();
  var humanTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}, { timeZone: 'America/Los_Angeles', hour12: true });
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var teddy = 'hi teddy';
  // ////takes data from variables name and image, and stores into an obj
  var newThread = { subject: subject, text: text, submittedDate: humanDate, submittedTime: humanTime, author: author};
  // //save obj into the DB:
  // console.log ('new thread obj var: ', newThread);
  console.log ('newThread var:', newThread);
  Thread.create(newThread, function(err, newlyCreated) {
    if(err) {
      console.log (err);
    } else {
          console.log('newlyCreated thread:', newlyCreated);
          console.log('newlyCreated thread subject:', newlyCreated.submittedDate);

          // req.flash("success", "New thread added!");
          res.redirect('/');
    }
  });

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

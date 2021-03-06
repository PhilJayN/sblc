var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var middleware = require("../middleware");
var replySchema = require("../models/reply");
var moment = require('moment');

//show form to create new thread
router.get('/threads/new', function (req, res) {
  Thread.find({}, function(err, allThreads){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      res.render('threads/new.ejs');
    }
  });
});

//CREATE Route: add thread to DB (runs on clicking submit btn)
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
    username: req.user.username,
    avatar: req.user.avatar
  };
  //takes data from variables name and image, and stores into an obj
  var newThread = { subject: subject, text: text, submittedDate: date, submittedTime: humanTime, author: author};
  //save obj into the DB:
  console.log ('newThread var:', newThread);
  Thread.create(newThread, function(err, newlyCreated) {
    if(err) {
      console.log (err);
    } else {
        console.log('newlyCreated thread:', newlyCreated);
        console.log('newlyCreated thread subject:', newlyCreated.submittedDate);
        req.flash("success", "New thread added!");
        res.redirect('/');
    }
  });
});

//READ: info about one thread, with all replies
router.get('/threads/:id', function (req, res) {
  Thread.findById(req.params.id, function(err, foundThread){
    if (err) {
      console.log('ERROR!!', err);
    } else {
      // console.log('foundthread', foundThread);
      // foundThread.sort({replies: {"createdAt": "ascending"}});
      res.render('threads/thread.ejs', {thread: foundThread, moment: moment});
    }
  });
});

//show form to EDIT a  particular thread that has unique ID
router.get('/threads/:id/edit', function (req, res) {
  console.log ('params:', req.params.id);
  Thread.findById(req.params.id, function(err, foundThread) {
    res.render('threads/edit.ejs', {thread: foundThread});
    // res.render('comments/edit.ejs', {comment_id: req.params.id, comment: foundThread});
  });
});

//UPDATE route  for threads
router.put('/threads/:id', function(req, res) {
  console.log(req.params.id, req.body.thread);
  Thread.findByIdAndUpdate(req.params.id, req.body.thread, function(err, updatedThread) {
    // console.log('foundThread', updatedThread);
    if (err) {
      res.redirect('/back');
    } else {
      req.flash("success", "Thread edited");
      res.redirect('/');
    }
  });
});

//PSEUDO DELETE route. We don't want the original poster to delete the whole thread,
//especially if that thread has other user's replies. This just updates the thread and username
//to show [deleted] instead
// <form class="delete-form" action="/threads/<%= thread._id %>?_method=PUT" method="POST">
router.put('/threads/del/:id', function(req, res) {
  console.log('asdfasdf', req.params.id);
  var deleted = {
    text: '[deleted]',
    author: {
      id: req.user._id,
      username: '[deleted]'
    }
  };
  Thread.findByIdAndUpdate(req.params.id, deleted, function(err, updatedThread) {
    if (err) {
      res.redirect('/back');
    } else {
      console.log('updated thread', updatedThread);
      req.flash("success", "Thread deleted");
      res.redirect('/');
    }
  });
});

//show form to REPLY to a particular thread that has unique ID
router.get('/threads/:id/reply', function (req, res) {
  Thread.findById(req.params.id, function(err, foundThread) {
    res.render('threads/reply.ejs', {thread: foundThread});
  });
});












module.exports = router;

//works to create seeds in DB:
// Thread.create(
//      {
//       subject: 'My teddy',
//       text: "my teddy txt",
//       submittedOn: "march 456 3000"
//      },
//      function(err, comment){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED thread: ");
//           console.log(comment);
//       }
//     });

//works to create seeds in DB:
    // Reply.create(
    //      {
    //       text: "my reply sadjfk;lsaj;kldfdfjsakl;",
    //       submittedDate: "march 4444 9000"
    //      },
    //      function(err, reply){
    //       if(err){
    //           console.log(err);
    //       } else {
    //           console.log("NEWLY CREATED reply: ");
    //           console.log(reply);
    //       }
    //     });

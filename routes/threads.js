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

//CREATE, add data to threads replies in DB
//post req. occurs when submit btn on form is clicked
router.post('/threads/reply', function (req, res) {
  //use body-parser to get data from 'name' attribute in form
  //id has its roots in main.js, where .getAttribute helps us get the id of thread from HTML attribute.
  // var id = req.body.threadId;

  //find a thread in DB by its ID. get ID from hidden input field in HTML
  Thread.findById(req.body.threadId, function(err, foundThread) {
    if(err) {
      console.log (err);
    } else {
      console.log ('foundThread from db', foundThread);
      // console.log ('req.body', req.body, 'threadId:', req.body.threadId, 'reply', req.body.reply);
      console.log('-------------------------');
      var date = new Date();
      var humanDate = date.toDateString();
      var humanTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}, { timeZone: 'America/Los_Angeles', hour12: true });
      //Add user reply to DB
      var reply = {
        text: req.body.reply,
        author: {
          id: req.user._id,
          username: req.user.username,
          avatar: req.user.avatar
        },
        submittedDate: date,
        submittedTime: humanTime
      };
      foundThread.replies.push(reply);
      foundThread.save();
      // });
      res.redirect('/threads/' + foundThread._id);
    }
  });
});

//replying to a reply route...
router.post('/threads/:id/replies/:reply_id/replies', function (req, res) {
  // get value of input element by giving input el a 'name' and 'value' attribute. on a post req (clicking a btn),
  //use req.body.[attributeName] to get the value.
  // console.log(req.params.id, req.params.reply_id);
  Thread.findById(req.params.id).then( (thread) => {
  //fxn to help find a reply
    const findReply = (id, replies) => {
      //iterate through array
      if (replies.length > 0) {
        for (var i = 0; i < replies.length; i++) {
          // for every reply, assign it into a variable
          const reply = replies[i];
            //each reply is now an object
          if (reply._id == id) {
            return reply;
          }
          // now invoke the findReply fxn with arguments
          // reply.replies is just dot notation, trying to access a property of the reply obj.

          // const foundReply = findReply(id, reply.replies);
          // if (foundReply) {
          //   console.log ('foundReply:', foundReply);
          //   return foundReply;
          // }

        }
      }
    };
    // console.log('B4 putting args', req.params.reply_id, thread.replies);
    const reply = findReply(req.params.reply_id, thread.replies); // thread.replies is arr of obj
    // console.log('req.body.replyId', req.body.reply);
    const replyNew = {
      text: req.body.reply,
      author: {
        id: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar
      },
    };
    reply.replies.unshift(replyNew);
    thread.markModified('replies');
    return thread.save();
  }).then((thread) => {
    console.log(thread);
    res.redirect('/threads/' + thread._id);
  }).catch((err)=> {
    console.log(err);
  });
});
// end of .post

router.put('/threads/:id/replies/:reply_id/edit', function (req, res) {
  var threadId = req.params.id;
  var replyId = req.body.replyId;
  Thread.findById(threadId)
    .then((thread) => {
      //req.body.replyId is coming from hidden input element's name and value attr, in HTML
      console.log ('threadId:', req.body.threadId, 'replyId:', req.body.replyId);
      var reply = thread.replies.id(replyId);
      console.log ('reply!!', reply, 'reply.text:', reply.text);
      reply.text = req.body.text;
      thread.save();
      req.flash("success", "Edited!");
      res.redirect('/threads/' + threadId);
    });
});


//pseudo DELETE route for thread MAIN reply
router.put('/threads/:id/replies/:reply_id', function (req, res) {
  // res.send('you hit reply del route!')
  // get value of input element by giving input el a 'name' and 'value' attribute. on a post req (clicking a btn),
  //use req.body.[attributeName] to get the value.
  // console.log(req.params.id, req.params.reply_id);
  Thread.findById(req.params.id).then( (thread) => {
  //fxn to help find a reply
    const findReply = (id, replies) => {
      //iterate through array
      if (replies.length > 0) {
        for (var i = 0; i < replies.length; i++) {
          // for every reply, assign it into a variable
          const reply = replies[i];
            //each reply is now an object
          if (reply._id == id) {
            return reply;
          }
        }
      }
    };
    // console.log('B4 putting args', req.params.reply_id, thread.replies);
    const reply = findReply(req.params.reply_id, thread.replies); // thread.replies is arr of obj
    // reply variable contains ONE reply from the replies arr.
    // console.log('req.body.replyId', req.body.reply);
    // const replyNew = {
    //   text: '[deleted]',
    //   author: {
    //     username: '[deleted]',
    //     avatar: '[deleted]'
    //   },
    // };

console.log ('reply after running findReply', reply)
// author:
//    { avatar: 'fa-chess-king',
//      username: 'Lizard',
//      id: 5af6237a4c76fd65c0ad42cd },

    reply.text = '[deleted]';
    reply.author.username = '[deleted]';
    reply.author.avatar = '[deleted]';

    thread.markModified('replies');
    return thread.save();

  }).then((thread) => {
    console.log(thread);
    res.redirect('/threads/' + thread._id);
  }).catch((err)=> {
    console.log(err);
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

var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var Reply = require("../models/reply");
var middleware = require("../middleware");

//CREATE, add brand new reply to a thread
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

//edit a main reply text
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

console.log ('reply after running findReply', reply);
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

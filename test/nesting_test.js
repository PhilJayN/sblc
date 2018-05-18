const assert = require('assert');
const mongoose = require('mongoose');
const Thread = require('../models/thread.js');


// Describe our setupEventListeners
describe('Nesting records w/ sub docs', function() {
  //Create tests

  // it('Creates a thread', function(done){
  //
  //   var puppies = new Thread({
  //     subject: 'cats are cute',
  //     text: 'yes!',
  //     replies: [{text: 'another person reply'}]
  //   });
  //
  //   puppies.save().then(function() {
  //     Thread.findOne({subject: 'cats are cute'}).then(function(record) {
  //       assert(record.subject.length > 1);
  //       done();
  //     });
  //   });
  //
  // });

  beforeEach(function(done) {
    mongoose.connection.collections.threads.drop(function(){
      done();
    });
  });


  it('Adds replies to a thread', function(done) {

    var puppies = new Thread({
      subject: 'monkeys are cute',
      text: 'yes!',
      replies: [{text: 'new reply'}]
    });

    puppies.save().then(function() {
      Thread.findOne({subject: 'monkeys are cute'}).then(function(thread) {
        //now add to the replies array
        thread.replies.push({
          text: 'another reply',
          submittedTime: '3PM',
          // replies: 'keirioeuroi'
        });
        thread.save().then(function() {
          var id = thread._id;
          Thread.findById(id).then(function(thread) {
            // simulate that id already exists from using ex: req.params:
            var replyId = thread.replies[0]._id;
            console.log (replyId);

            var reply = thread.replies.id(replyId);
            console.log ('found reply:', reply);
            reply.replies.push({text: 'jsafkl;duj36534l6jk'});
            thread.save(function(err, savedReply) {
              if (err) {
                console.log (err);
              } else {
                return savedReply;
              }
            });
            done();


            // var thirdReplyId = thread.replies[0].replies[0].replies[0]._id;
            // thread.replies.id(replyId).replies.id(nestedReplyId).replies.id(thirdReplyId).push({text: 'DEEP'});
            // // replies.id(thirdReplyId).text = 'so deep';
            //
            // thread.save();


          });

        });
      });
    });

  });

  // it('find a thread', function (done) {
  //
  //   Thread.findOneAndUpdate({subject: 'parrots are cute'}).then(function(record) {
  //     console.log('record', record);
  //     done();
  //
  //
  //   });
  //
  // });

});




// WORKS to edit a main reply
// it('Adds replies to a thread', function(done) {
//
//   var puppies = new Thread({
//     subject: 'monkeys are cute',
//     text: 'yes!',
//     replies: [{text: 'new reply'}]
//   });
//
//   puppies.save().then(function() {
//     Thread.findOne({subject: 'monkeys are cute'}).then(function(record) {
//       //now add to the replies array
//       record.replies.push({text: 'another reply'});
//       record.save().then(function() {
//         var id = record._id;
//         Thread.findById(id).then(function(result) {
//           var replyId = result.replies[0]._id;
//           console.log (replyId);
//           result.replies.id(replyId);
//           var modReply = result.replies.id(replyId);
//           console.log ('found reply!!', modReply);
//           modReply.text = '[deleted!!]';
//           result.save();
//           done();
//         });
//
//       });
//     });
//   });
//
// });






// working to save to db:
// it('Adds replies to a thread', function(done) {
//
//   var puppies = new Thread({
//     subject: 'monkeys are cute',
//     text: 'yes!',
//     replies: [{text: 'new reply'}]
//   });
//
//   puppies.save().then(function() {
//     Thread.findOne({subject: 'monkeys are cute'}).then(function(record) {
//       //now add to the replies array
//       record.replies.push({text: 'another reply'});
//       record.save().then(function() {
//         Thread.findOne({subject: 'monkeys are cute'}).then(function(result) {
//           assert(result.replies.length === 2);
//           // console.log ('result: ', result.replies);
//           console.log ('access',            result.replies[0].text);
//           done();
//         });
//       })
//     });
//   });
//
// });

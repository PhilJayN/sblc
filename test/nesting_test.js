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
      subject: 'bears are cute',
      text: 'yes!',
      replies: [{text: 'new reply'}]
    });

    puppies.save().then(function() {
      Thread.findOne({subject: 'bears are cute'}).then(function(record) {
        //now add to the replies array
        record.replies.push({text: 'another reply'});
        record.save().then(function() {
          Thread.findOne({subject: 'bears are cute'}).then(function(result) {
            assert(result.replies.length === 2);
            done();
          });
        })
      });
    });

  });


});

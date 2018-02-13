// var assert = require('assert');
//
// describe('Creating records', function() {
//   it('saves a user', function() {
//       assert(1+1 === 2);
//   });
// });

var assert = require('assert');
var User = require('../models/user.js');
var Reply = require('../models/reply.js');


describe('Creating records', function() {
  it('saves a user', function() {
    var joe = new User({username: 'JoeBlow'}); //joe is NOT yet saved to db.
    //joe is an object, which has many methods, one of which is .save()
    //now to save to db:
    joe.save();
  });
});


describe('Creating records', function() {
  it('saves a reply', function() {
    var dinner = new Reply({text: 'Food!'});
    console.log(dinner, 'type:', typeof dinner);
    dinner.save();
  });
});


// console.log('joe type', typeof joe);
// assert(joe === 'JoeBlow' );

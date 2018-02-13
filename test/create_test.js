const assert = require('assert');
const User = require('../models/user.js');
const Reply = require('../models/reply.js');

describe('Creating records', function() {
  it('saves a user', function(done) {
    const joe = new User({username: 'JoeBlow'}); //joe is NOT yet saved to db.
    //joe is an object, which has many methods, one of which is .save()
    //now to save to db: (remember .save() also takes a certain amt. of time to run)
    console.log('isNew b4 save', joe.isNew); //expect true

    joe.save()
      //has joe been saved Successfully?
      .then(() =>{
        assert(!joe.isNew);
        done();
        // console.log('isNew after save', joe.isNew); //expect false
      });
  });
});


// describe('Creating records', function() {
//   it('saves a reply', function() {
//     var dinner = new Reply({text: 'Food!'});
//     console.log(dinner, 'type:', typeof dinner);
//     dinner.save();
//   });
// });


// console.log('joe type', typeof joe);
// assert(joe === 'JoeBlow' );

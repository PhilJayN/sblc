const assert = require('assert');
const User = require('../models/user.js');
const Reply = require('../models/reply.js');

describe('Creating records', function() {
  it('saves a user', function(done) {
    const joe = new User({username: 'Joe Blow'}); //joe is NOT yet saved to db.
    //joe is an object, which has many methods, one of which is .save()
    //now to save to db: (remember .save() also takes a certain amt. of time to run), therefore use .then
    joe.save()
      //has joe been saved Successfully?
      .then(() =>{
        assert(!joe.isNew);
        done();
      });
  });
});

const assert = require('assert');
const User = require('../models/user.js');

describe('Reading users out of the DB', () => {
  let joe;

  // purpose of this beforeEach is insert a new user, so that we have
  // some data to use in our 'it' fxn below to search
  beforeEach((done) => {
    joe = new User({ username: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with name of joe', (done) => {

    User.findOne({ _id: joe._id })
      .then((user) => {
        // console.log('found user:', user, 'here is id:', user._id);
        // console.log ('compare ids:', users[0]._id.toString() === joe._id.toString());
        assert(user.username === 'Joe')
        done();
      });

  });
});

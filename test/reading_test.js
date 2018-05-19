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

    User.find({ username: 'Joe'})
      .then((users) => {
        console.log('found users:', users);
        // console.log ('compare ids:', users[0]._id.toString() === joe._id.toString());
        done();
      });

  });
});


// const assert = require('assert');
// const Reply = require('../models/reply.js');
//
// describe('Reading replies out of the DB', () => {
//   let cat;
//
//   beforeEach((done) => {
//     cat = new Reply({ text: 'cat' });
//     cat.save()
//       .then(() => done());
//   });
//
//   it('finds all replies with text of cat ', (done) => {
//     Reply.find({ text: 'cat'})
//       .then((replies) => {
//         console.log('found replies:', replies);
//         done();
//       });
//   });
// });

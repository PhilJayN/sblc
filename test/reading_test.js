// const assert = require('assert');
// const User = require('../models/user.js');
//
// describe('Reading users out of the DB', () => {
//   let joe;
//
//   beforeEach((done) => {
//     joe = new User({ name: 'Joe' });
//     joe.save()
//       .then(() => done());
//   });
//
//   it('finds all users with name of joe', (done) => {
//     User.find({ username: 'Joe'})
//       .then((users) => {
//         console.log('found users:', users);
//         done();
//       });
//
//   });
// });


const assert = require('assert');
const Reply = require('../models/reply.js');

describe('Reading replies out of the DB', () => {
  let cat;

  beforeEach((done) => {
    cat = new Reply({ text: 'cat' });
    cat.save()
      .then(() => done());
  });

  it('finds all replies with text of cat ', (done) => {
    Reply.find({ text: 'cat'})
      .then((replies) => {
        console.log('found replies:', replies);
        done();
      });
  });
});

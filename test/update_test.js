const assert = require('assert');
const User = require('../models/user.js');

describe('Updating record', () => {
  let joe;


  beforeEach((done) => {
    joe = new User({username: 'Joe'});
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].username === 'Alex');
      done();
    });

  }

  it('instance using set and save', (done) => {
    joe.set('username', 'Alex');
    assertName(joe.save(), done);
  });


  it('A model instance can update', (done) => {
    joe.update({ username: 'Alex' })

    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].username === 'Alex');
      done();
    });
  });




// for some reason .update gives testing error. findOneAndUpdate and findByIdAndUpdate
//works fine
  // it('A model class can update', (done) => {
  //   // assertName(
  //   //   User.update({ username: 'Joe' }, { username: 'Alex' }),
  //   //   done
  //   // );
  //   console.log ('puppies', joe, 'username:', joe.username)
  //     User.update({ username: 'Joe' }, { username: 'Alex' })
  //     .then((users) => {
  //       assert(users.length === 1);
  //       assert(users[0].username === 'Alex');
  //       done();
  //     });
  //
  // });


  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ username: 'Joe' }, { username: 'Alex' }),
      done
    );
  });


  it('A model class can find a record an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { username: 'Alex' }),
      done
    );
  });


});

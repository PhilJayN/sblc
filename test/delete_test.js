const assert = require('assert');
const User = require('../models/user.js');

describe('Deleting user', () => {
let joe;

  beforeEach((done) => {
    joe = new User({ username: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class remove findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe'})
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class remove fineByIdAndRemove', (done) => {
    User.findOneAndRemove(joe._id)
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

});

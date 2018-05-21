const assert = require('assert');
const Thread = require('../models/thread.js');

describe('Creating records', () => {
  let puppies;

  beforeEach((done) => {
    puppies = new Thread({
      subject: 'monkeys are cute',
      text: 'yes!',
      // replies: [{text: 'new reply'}]
    });
    puppies.save()
      .then(() => done());
  });

  it('Updates a thread', (done) => {

    puppies.update({ subject: 'my new subj' })
    .then(() => Thread.find({}))
    .then((threads) => {
      assert(threads.length === 1);
      assert(threads[0].subject === 'my new subj');
      assert(2+1 === 3);
      done();
    });
  });


  it('can create a sub doc in a thread', (done) => {
// console.log   ('puppies' , puppies)

    puppies.update({subject: 'cat', text: 'dog'})
    .then(() => Thread.find({}))
    .then((threads) => {
      console.log ('found threads', threads);
      assert(threads.length === 1);
      assert(threads[0].subject === 'cat');
      assert(threads[0].text === 'dog');
      done();
    });
  });
  //
  // it('adds numbers', () => {
  //   assert(2+1 === 3);
  //   assert(2+2 === 4);
  // });
  //
  // it('adds numbers', () => {
  //   assert(2+1 === 3);
  //   assert(2+2 === 4);
  // });
  //
  // it('adds numbers', () => {
  //   assert(2+1 === 3);
  //   assert(2+2 === 4);
  // });


});

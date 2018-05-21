const assert = require('assert');
const Thread = require('../models/thread.js');

// Describe our setupEventListeners
describe('Creating records', function() {
  let puppies;

  beforeEach((done) => {

    puppies = new Thread({
      subject: 'monkeys are cute',
      text: 'yes!',
      replies: [{text: 'new reply'}]
    });
    puppies.save()
      .then(() => done());

  });

  it('Adds a thread', function(done) {

    puppies.update({ subject: 'my subj' })

    .then(() => Thread.find({}))
    .then((threads) => {
      assert(threads.length === 1);
      assert(threads[0].subject === 'my subj');
      done();
    });


  });

});

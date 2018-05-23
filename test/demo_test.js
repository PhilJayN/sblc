const assert = require('assert');
const Thread = require('../models/thread.js');

describe('Creating records', () => {

  it('can create a thread', (done) => {
    const puppies = new Thread({
      subject: 'monkeys are cute',
      text: 'yes!',
      // replies: [{text: 'new reply'}]
    });
    puppies.save()
      .then(() => Thread.findOne({subject: "monkeys are cute"}))
      .then((thread) => {
        // console.log ('thread', thread);
        done();
      });


  });

  it('can find a thread', (done) => {
    const puppies = new Thread({
      subject: 'monkeys are cute',
      text: 'yes!',
      // replies: [{text: 'new reply'}]
    });
    puppies.save()
      // .then(function() {
      //   var id = puppies._id;
      //   Thread.findById(id).then(function(thread) {
      //     console.log ('got it', thread);
      //     done();
      //   });
      // });
      .then(() => {
        var id = puppies._id;
        console.log ('puppies id:', id);
        Thread.findById(id).then((thread) => {
          // console.log ('found thread', thread, 'id:', id);
          done();
        });
      })

  });

  it('can update a thread', (done) => {
    const puppies = new Thread({
      subject: 'cats are cute',
      text: 'yes!',
      // replies: [{text: 'new reply'}]
    });
    puppies.save()
      .then(() => {
        var id = puppies._id;
        // console.log ('puppies id:', id);
        Thread.findOneAndUpdate(id, {subject: 'dogs are cute'})
          .then(() => {
            Thread.findOne({subject: 'dogs are cute'})
              .then((thread) => {
                assert(thread.subject === 'dogs are cute');
                done();
              });
          });
      });

  });


  it('can add subdocuments to an existing record', (done) => {
    const food = new Thread({
      subject: 'fav food?',
      text: 'pizza',
      replies: []
    });

    food.save()
      .then(() => Thread.findOne({subject: 'fav food?'}))
      .then((thread) => {
        // console.log ('thread!!', thread);
        thread.replies.push({text: 'soup man myself'});
        return thread.save();
      })
      .then(() => Thread.findOne({subject: 'fav food?'}))
      .then((thread) => {
        console.log ('threaj;kld', thread);
        assert(thread.replies[0].text === 'soup man myself');
        done();
      });
  });

});


// const assert = require('assert');
// const Thread = require('../models/thread.js');
//
// describe('Creating records', () => {
//   let puppies;
//
//   beforeEach((done) => {
//     puppies = new Thread({
//       subject: 'monkeys are cute',
//       text: 'yes!',
//       // replies: [{text: 'new reply'}]
//     });
//     puppies.save()
//       .then(() => done());
//   });
//
//   it('Updates a thread', (done) => {
//
//     puppies.update({ subject: 'my new subj' })
//     .then(() => Thread.find({}))
//     .then((threads) => {
//       assert(threads.length === 1);
//       assert(threads[0].subject === 'my new subj');
//       assert(2+1 === 3);
//       done();
//     });
//   });
//
//
//   it('can create a sub doc in a thread', (done) => {
// // console.log   ('puppies' , puppies)
//
//     puppies.update({subject: 'cat', text: 'dog'})
//     .then(() => Thread.find({}))
//     .then((threads) => {
//       console.log ('found threads', threads);
//       assert(threads.length === 1);
//       assert(threads[0].subject === 'cat');
//       assert(threads[0].text === 'dog');
//       done();
//     });
//   });
//
//
//
// });

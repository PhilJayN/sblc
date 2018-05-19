const mongoose = require('mongoose');

//fix for DeprecationWarning: Mongoose: mpromise (mongoose's default promise library)
mongoose.Promise = global.Promise;

//to be sure test start only if successful connection to mongo.
before((done) => {
  mongoose.connect('mongodb://localhost/users_test'); //DO NOT CHANGE THIS to another db name! IF YOU DO users.drop
  //will work an drop all users due to beforeEach hook below. (mongoose.connection.collections.users.drop(()
  mongoose.connection
      .once('open', () => { done(); })
      .on('error', (error) => {
        console.warn('Warning', error);
      });
});

//hook (ex: beforeEach): a function that will be exec before any tests get executed inside our test suite
beforeEach((done) => { //"done" is provided by mocha
  // const { users, comments } = mongoose.connection.collections;
  // users.drop(() => {
  //   done();
  // });

  mongoose.connection.collections.users.drop(() => {
    //ready to run test
    done();
  });
});


// users.drop(() => {
//   comments.drop() => {
//     //ready to run next test, right after db collection has been dropped
//     done();
//   }
// });



//callback of DOOM due to Mongo not supporting dropping collections all at the
//same time. Alternative is to just use a loop to iterate one collection at a time.

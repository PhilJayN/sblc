const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
      console.warn('Warning', error);
    });


//hook (ex: beforeEach): a function that will be exec before any tests get executed inside our test suite
beforeEach((done) => { //"done" is provided by mocha
  mongoose.connection.collections.users.drop(() => {
    //ready to run next test, right after db collection has been dropped
    done();
  });
});

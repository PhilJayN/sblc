var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var middleware = require("../middleware");

router.get('/threads', function(req, res) {
  res.send('threads route!');
    // res.render('resources/index.ejs');
});

router.get('/threads/new', function(req, res) {
    res.render('threads/new.ejs');
});


Thread.create(
     {
         text: "thread",
         submittedOn: "march 1 1998"

     },
     function(err, comment){
      if(err){
          console.log(err);
      } else {
          console.log("NEWLY CREATED thread: ");
          console.log(comment);
      }
    });


module.exports = router;

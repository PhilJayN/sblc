var express = require("express");
var router = express.Router({mergeParams: true});
var Reply = require("../models/reply");
var middleware = require("../middleware");
var Thread = require("../models/thread");


//works to seed in DB:
// Reply.create(
//      {
//       text: "my reply text",
//       submittedOn: "march 1 3000"
//      },
//      function(err, reply){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED reply: ");
//           console.log(reply);
//       }
//     });


//CREATE
router.post('/threads/reply', function(req, res){
  console.log('rep params: ', req.params);

});



module.exports = router;

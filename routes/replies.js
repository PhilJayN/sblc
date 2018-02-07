var express = require("express");
var router = express.Router({mergeParams: true});
var Reply = require("../models/reply");
var middleware = require("../middleware");

// Reply.create(
//   {
//   text: 'hey this is a reply test1'
// },
//   function(err, reply) {
//     if (err) {
//       console.log (err);
//     } else {
//       console.log ('newly created reply:');
//       console.log (reply);
//     }
//   }
// );
//



Reply.create(
     {
      text: "my reply text",
      submittedOn: "march 1 3000"
     },
     function(err, reply){
      if(err){
          console.log(err);
      } else {
          console.log("NEWLY CREATED reply: ");
          console.log(reply);
      }
    });


module.exports = router;

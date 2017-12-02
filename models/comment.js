var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  text: String,
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  },
  // submittedOn:
  // {
  //   humanDate: String,
  //   humanTime: String
  // }
  submittedDate: String,
  submittedTime: String
});

module.exports = mongoose.model("Comment", commentSchema);


//correct obj:
// commentSchema = {
// 	text: 'hi',
// 	username: 'Teddy',
//   submittedOn:
//     {
//       humanDate: 'date',
//       humanTime: 'time'
// 	  }
// }

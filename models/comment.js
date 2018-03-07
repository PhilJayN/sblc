var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  text: String,
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  },
  submittedDate: {type: Date, default: Date.now},
  submittedTime: String
});

module.exports = mongoose.model("Comment", commentSchema);

//obj visualization:
// commentSchema = {
// 	text: 'hi',
// 	username: 'Teddy',
//   submittedOn:
//     {
//       humanDate: 'date',
//       humanTime: 'time'
// 	  }
// }

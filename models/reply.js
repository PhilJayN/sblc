var mongoose = require("mongoose");

var replySchema = mongoose.Schema({
  text: String,
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  },
  submittedDate: String,
  submittedTime: String
});

module.exports = mongoose.model("Reply", replySchema);

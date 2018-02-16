var mongoose = require("mongoose");
var replySchema = require("./reply");

var threadSchema = mongoose.Schema({
  subject: String,
  text: String,
  // text: String,
  isCollapsed: {type: Boolean, default: false},
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  },
  replies: [replySchema],
  submittedDate: String,
  submittedTime: String
});

module.exports = mongoose.model("Thread", threadSchema);

var mongoose = require("mongoose");

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
  replies:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"  //points to the model definition of Reply, in models/reply.js
    }
  ],
  submittedDate: String,
  submittedTime: String
});

module.exports = mongoose.model("Thread", threadSchema);

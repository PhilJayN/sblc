var mongoose = require("mongoose");
var replySchema = require("./reply");

var threadSchema = new mongoose.Schema({
  subject: String,
  text: String,
  isCollapsed: {type: Boolean, default: false},
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String,
      avatar: String
  },

  // replies: [replySchema],
  replies: {
    type: [replySchema]
  },

  submittedDate: {type: Date, default: Date.now},
  submittedTime: String
},

// { timestamps: { createdAt: 'created_at' } }
{ timestamps: true }

);

module.exports = mongoose.model("Thread", threadSchema);

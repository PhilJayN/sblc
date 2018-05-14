var mongoose = require("mongoose");

var replySchema = new mongoose.Schema({
  text: String,
  author:
  {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String,
      avatar: String
  },

  replies: {
    type: [replySchema]
  },

  // submittedDate: String,
  submittedDate: {type: Date, default: Date.now},
  submittedTime: String
},

{ timestamps: true }

);

//no need to write mongoose.model, because the replySchema will be embedded, NOT referenced
// in threads model.
module.exports = replySchema;

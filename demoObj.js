

//EXAMPLE from google groups
 // https://groups.google.com/forum/#!topic/mongodb-user/PzXD-yiJG1I
{
  comments: [
    { user: 'gates', text: 'first post'
      replies: [
        { user: 'jim', text: 'I was too slow' }
      ]
    },
    { user: 'jim', text: 'second post' }
  ]
}


// my commment DB from mlabs:
{
    "_id": {
        "$oid": "5a446c16260d3c0014e771a5"
    },
    "text": "Hi! How's it going?",
    "submittedDate": "Wed Dec 27 2017",
    "submittedTime": "7:59 PM",
    "author": {
        "id": {
            "$oid": "5a446c09260d3c0014e771a4"
        },
        "username": "Jennifer"
    },
    "__v": 0
}




// var mongoose = require("mongoose");
//
// var threadSchema = mongoose.Schema({
//   subject: String,
//   text: String,
//   // text: String,
//   isCollapsed: {type: Boolean, default: false},
//   author:
//   {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//       },
//       username: String
//   },
//   submittedDate: String,
//   submittedTime: String,
//   replies: [
//
//   ]
// });
//
// module.exports = mongoose.model("Thread", threadSchema);




{
  "_id": ObjectId("5a22360f457b205e7c16ee16"),
  "text": "heeeyjalkdfj there",
  "submittedDate": "Fri Dec 01 2017",
  "submittedTime": "9:11:43 PM",
  "author": {
    "id": ObjectId("5a1f4be8fb061a1c943fca2a"),
    "username": "Mike"
  },
  "__v": 0
} {
  "_id": ObjectId("5a223652457b205e7c16ee17"),
  "text": "this is cool",
  "submittedDate": "Fri Dec 01 2017",
  "submittedTime": "9:12:50 PM",
  "author": {
    "id": ObjectId("5a1f4be8fb061a1c943fca2a"),
    "username": "Mike"
  },
  "__v": 0
} {
  "_id": ObjectId("5a22369e457b205e7c16ee19"),
  "text": "hellooo",
  "submittedDate": "Fri Dec 01 2017",
  "submittedTime": "9:14:06 PM",
  "author": {
    "id": ObjectId("5a223690457b205e7c16ee18"),
    "username": "Phil"
  },
  "__v": 0
} {
  "_id": ObjectId("5a231ce17e399326e8474cd3"),
  "text": "this if fudge!!",
  "submittedDate": "Sat Dec 02 2017",
  "submittedTime": "1:36:33 PM",
  "author": {
    "id": ObjectId("5a223690457b205e7c16ee18"),
    "username": "Phil"
  },
  "__v": 0
} {
  "_id": ObjectId("5a23420e5490024ea845890c"),
  "text": "Hi!!",
  "submittedDate": "Sat Dec 02 2017",
  "submittedTime": "4:15:10 PM",
  "author": {
    "id": ObjectId("5a223690457b205e7c16ee18"),
    "username": "Phil"
  },
  "__v": 0
}


[{
  _id: 5 a1f4e91fb061a1c943fca2c,
  text: 'hey eja;lkdsfj',
  __v: 0,
  author: {
    id: 5 a1f4be8fb061a1c943fca2a,
    username: 'Mike'
  }
}]
allComments[{
  _id: 5 a1f4e91fb061a1c943fca2c,
  text: 'hey eja;lkdsfj',
  __v: 0,
  author: {
    id: 5 a1f4be8fb061a1c943fca2a,
    username: 'Mike'
  }
}]
allComments[{
  _id: 5 a1f4e91fb061a1c943fca2c,
  text: 'hey eja;lkdsfj',
  __v: 0,
  author: {
    id: 5 a1f4be8fb061a1c943fca2a,
    username: 'Mike'
  }
}]
allComments[{
  _id: 5 a1f4e91fb061a1c943fca2c,
  text: 'hey eja;lkdsfj',
  __v: 0,
  author: {
    id: 5 a1f4be8fb061a1c943fca2a,
    username: 'Mike'
  }
}]

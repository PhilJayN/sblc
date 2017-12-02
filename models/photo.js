var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  },
  comments:
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
});

module.exports = mongoose.model("Photo", photoSchema);


// //CREATE Route: add to DB
// //when there's a POST request to /photos/addPhoto...
// router.post('/photos', middleware.isLoggedIn, function (req, res) {
//   //run these codes:
//   var name = req.body.name;
//   var image = req.body.image;
//   var description = req.body.description;
//   var author = {
//     id: req.user._id,
//     username: req.user.username
//   };
//   //takes data from variables name and image, and stores into an obj:
//   var newImage = {name: name, image: image, description: description, author: author};
//   Photo.create(newImage, function(err, newlyCreated){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('newlyCreated', newlyCreated);
//       res.redirect('/photos');
//     }
//   });
// });

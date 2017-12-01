var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");







var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Cat.create({
//   name: 'Snow',
//   age: 15,
//   temperament: 'Bland'
// }, function(err, cat) {
//   if (err) {
//     console.log('err!');
//     console.log(err);
//   } else {
//     console.log('all the cats...');
//     console.log(cat);
//   }
// });

// Cat.find({}, function(err, cats) {
//   if(err){
//     console.log ('error!');
//     console.log (err);
//   } else {
//     console.log ('All the cats');
//     console.log (cats)
//   }
// });


app.get("/cats", function(req, res){
  //get all cats from DB:
  Cat.find({}, function(err, cats) {
    if(err){
      console.log ('error!');
      console.log (err);
    } else {
      console.log ('All the cats');
      console.log (cats)
      res.render("cats.ejs", {cats: cats});
    }
  });

});


//
// app.get("/campgrounds/new", function(req, res){
//    res.render("cats.ejs");
// });

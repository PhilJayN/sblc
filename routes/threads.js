var express = require('express');
var router = express.Router();

router.get('/threads', function(req, res) {
  res.send('threads route!');
    // res.render('resources/index.ejs');
});

router.get('/threads/new', function(req, res) {
    res.render('threads/new.ejs');
});





module.exports = router;

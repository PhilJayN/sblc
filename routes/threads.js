var express = require('express');
var router = express.Router();

router.get('/threads', function(req, res) {
  res.send('threads route!');
    // res.render('resources/index.ejs');
});


module.exports = router;

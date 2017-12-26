var express = require('express');
var router = express.Router();

router.get('/cat', function(req, res) {
    res.send('resources pg newsadfasdf');
});


// router.get('/cat', function(req, res) {
//     res.send('resources pg new');
// });

module.exports = router;

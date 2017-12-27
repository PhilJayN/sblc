var express = require('express');
var router = express.Router();

router.get('/resources', function(req, res) {
    res.render('resources/index.ejs');
});


module.exports = router;

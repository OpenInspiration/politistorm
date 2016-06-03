var express = require('express');
var router = express.Router();


/* GET home page. */
/*
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
*/

router.get('/', function (req, res) {
    var db = req.db;
    // db.collection('tweets').save({tweet: "Hi" + (new Date()).toDateString()})

    db.collection('tweets').find().toArray(function(err, results) {
        console.log(results)
        res.render('tweets', {
            'title': "Trumpswing",
            'tweets': results
        });
    })

});

module.exports = router;

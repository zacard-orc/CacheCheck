var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.setHeader('Cache-contral','max-age=315360000');
  res.render('index', { title: 'Express' });
});


router.get('/news', function(req, res) {
    res.render('news', { title: 'Express' });
});

router.get('/htable', function(req, res) {
    res.render('htable', { title: 'HTable' });
});

router.get('/hv', function(req, res) {
    res.render('hview', { });
});

router.get('/hext', function(req, res) {
    res.render('hext', {title:'Table Extend' });
});


module.exports = router;

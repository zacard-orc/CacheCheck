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
    var xdata=[
        {
            "name":"上海",
            "os":"Windows 7",
            "timing":
            {
                "t_dns":4.3,
                "t_conn":4.5,
                "t_send":9.8,
                "t_wait":13.7,
                "t_recv":39.2
            },
            "geo":1131
        },
        {
            "name":"广州",
            "os":"Safari",
            "timing":
            {
                "t_dns":14.3,
                "t_conn":9.5,
                "t_send":3.8,
                "t_wait":11.7,
                "t_recv":8.2
            },
            "geo":571
        }
    ]
    res.render('htable', { title: 'HTable', restxt:xdata});
});


router.get('/hext', function(req, res) {
    res.render('hext', {title:'Table Extend' });
});


module.exports = router;

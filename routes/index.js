var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.setHeader('Cache-contral','max-age=315360000');
  res.render('index', { title: 'Express' });
});

router.get('/bid',function(req,res){
    res.render('bid',{title:'Big Screen'});
});


router.get('/h5',function(req,res){ res.render('h5',{title:'H5 Canvas'});});
router.get('/gif',function(req,res){res.render('gif',{title:'H5 Canvas'});});
router.get('/cool',function(req,res){res.render('cool',{title:'H5 Canvas'});});
router.get('/cool2',function(req,res){res.render('cool2',{title:'H5 Canvas'});});
router.get('/my',function(req,res){res.render('my',{title:'H5 Canvas'});});
router.get('/cap',function(req,res){res.render('cap',{title:'H5 Canvas'});});
router.get('/div',function(req,res){res.render('div_css',{title:'H5 Canvas'});});
router.get('/div2',function(req,res){res.render('div_css2',{title:'H5 Canvas'});});
router.get('/div3',function(req,res){res.render('div_css3',{title:'H5 Canvas'});});
router.get('/zr_1',function(req,res){res.render('zr_1',{title:'H5 Canvas'});});
router.get('/file',function(req,res){res.render('file',{title:'H5 Canvas'});});
router.get('/side',function(req,res){res.render('slider',{title:'H5 Canvas'});});
router.get('/jt',function(req,res){res.render('jdata',{title:'H5 Canvas'});});

var a=0;

router.get('/news', function(req, res) {

    console.log(req.cookies);
    console.log(req.session);

    var session = req.session;
    session.count = session.count || 0;
    var n = session.count++;
    console.log('hello, session id:' + session.id + ' count:' + n);
    req.session.x_user='linly'

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
        },
        {
            "name":"东京",
            "os":"FireFox",
            "timing":
            {
                "t_dns":11.3,
                "t_conn":12.5,
                "t_send":7.8,
                "t_wait":9.7,
                "t_recv":7.2
            },
            "geo":801
        },
        {
            "name":"成都",
            "os":"Maxthon",
            "timing":
            {
                "t_dns":22.3,
                "t_conn":12.5,
                "t_send":6.8,
                "t_wait":13.7,
                "t_recv":3.2
            },
            "geo":399
        }
    ];
    var hardata=[
        {
            "xtime":"2014-11-30 10:30:00",
            "site":"www.baidu.com",
            "timing":15.8,
            "detail":[
                {"url":"http://www.ctrip.com/1.png","delay":2.34,"stime":"2014-11:30 10:50:50:323"},
                {"url":"http://www.ctrip.com/2.png","delay":7.23,"stime":"2014-11:30 10:50:58:923"},
            ],
            "headers":
            [
                {"XFF":"1.1.1.1","Cache":3600},
                {"XFF":"2.2.2.2","Cache":7200}
            ]
        },
        {
            "xtime":"2014-11-30 11:30:00",
            "site":"www.baidu.com",
            "timing":9.2,
            "detail":[
                {"url":"http://www.ctrip.com/1.png","delay":5.93,"stime":"2014-11:30 10:50:50:323"},
                {"url":"http://www.ctrip.com/2.png","delay":3.43,"stime":"2014-11:30 10:50:55:323"},
                {"url":"http://www.ctrip.com/3.png","delay":6.63,"stime":"2014-11:30 10:50:59:323"},
            ],
            "headers":
                [
                    {"XFF":"3.3.3.3"},
                    {"XFF":"4.4.4.4"},
                    {"XFF":"5.5.5.5"},
                    {"XFF":"6.6.6.6"}

                ]
        }
    ];
    res.render('htable', { title: 'HTable', restxt:xdata,ggtxt:hardata});
});


router.get('/hext', function(req, res) {
    res.render('hext', {title:'Table Extend' });
});

router.post('/autoinfo',function(req,res){
   res.send([{id:1,city:'Shanghai'},{id:2,city:'Tokoy'}])
});

router.post('/svr_dataload_1001',function(req,res){
   // console.log(req)
    console.log(req.files)
    console.log(req.body)
    res.send([{id:1,city:'Shanghai'},{id:2,city:'Tokoy'}])
});


module.exports = router;

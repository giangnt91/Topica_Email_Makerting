// load mongoose package
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//controller
var _groups = require('./controller/groupsCtrl');
var _mails = require('./controller/mailCtrl');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // res.setHeader('Access-Control-Allow-Origin', 'http://marketing.hapit.vn');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//-- Start Mail API --//
//get all mail
app.get('/all', function (req, res) {
    _mails.get_all_mail(req, res);
});

//create new mail
app.post('/create', function (req, res) {
    _mails.create_new_mail(req, res);
});

// get mail by id
app.get('/id/:id', function (req, res) {
    _mails.get_mail_byId(req, res);
});

// update status delete mail by id
app.put('/delete/:id', function (req, res) {
    _mails.delete_mail(req, res);
});

//get groups mail
app.get('/groups', function (req, res) {
    _groups.getGroups(req, res);
});

//get group by id
app.get('/gid/:id', function (req, res) {
    _groups.getByid(req, res);
})

//create new group mail
app.post('/cgroup', function (req, res) {
    _groups.Create(req, res);
})

//update group mail
app.post('/updateGroup', function (req, res) {
    _groups.updateByid(req, res);
})

//detete group mail
app.post('/gdelete/:id', function (req, res) {
    _groups.delete_group(req, res);
})

app.listen(port);
console.log('Mail box API server started on: ' + port);
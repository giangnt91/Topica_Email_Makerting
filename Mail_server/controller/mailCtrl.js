var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var mongoMail = require('../model/mail');

function Create_new_mail(_fileId, _mailAuth, _mailTo, _mailTitle, _mailContent, _file, _time, _status, _delete) {
    var tmp = JSON.parse(_file);
    var tmp_2 = JSON.parse(_mailTo);
    var _create = new mongoMail({ file_Id: _fileId, mail_Auth: _mailAuth, mail_To: tmp_2, mail_Title: _mailTitle, mail_Content: _mailContent, File: tmp, create_Time: _time, Status: _status, Delete: _delete });
    _create.save(function (err) {
        if (err) console.log(err);
        else
            return "OK";
    });
}


module.exports = {
    get_all_mail: function (req, res) {
        var response = {};
        mongoMail.find({ Delete: false }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': "Error fetching data" };
            } else {
                response = { 'error': false, 'mail': data };
            }
            res.json(response);
        }).sort({ file_Id: -1 });
    },
    create_new_mail: function (req, res) {
        Create_new_mail(req.body.file_Id, req.body.mail_Auth, req.body.mail_To, req.body.mail_Title, req.body.mail_Content, req.body.File, req.body.Time, req.body.Status, req.body.Delete);
        res.status(200).json({
            'status': true
        });
    },
    get_mail_byId: function (req, res) {
        var response = {};
        mongoMail.findById({ _id: req.params.id }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': "Error fetching data" };
            } else {
                response = { 'error': false, 'mail': data };
            }
            res.json(response);
        });
    },
    delete_mail: function (req, res) {
        var response = {};
        mongoMail.findById({ _id: req.params.id }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': 'Error fetching data' };
            } else {
                data.Delete = 1;
                data.save(function (err) {
                    if (err) {
                        response = { 'error': true, 'message': 'Error updating data' };
                    } else {
                        response = { 'error': false, 'mail': 'data update success' };
                    }
                    res.json(response);
                });
            }
        });
    }
}
var express = require('express');
var crypto = require('crypto');

var Usermodel = require('../model/users');

function create_user(_username, _fullname, _signature, _provider) {
    // tmp_password = crypto.createHash('sha1').update(_password).digest('base64');
    var _create = new Usermodel({
        username: _username,
        // password: tmp_password,
        fullname: _fullname,
        signature: _signature,
        provider: _provider
    });
    _create.save(function (err) {
        if (err) console.log(err);
    });
}

module.exports = {
    createUser: function (req, res) {
        var response = {};
        Usermodel.find({ username: req.body.username }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': 'error fetching data' };
            } else {
                if (data.length > 0) {
                    response = { 'error': true, 'message': 'username already exists' }
                } else {
                    create_user(req.body.username, req.body.fullname, req.body.signature, req.body.provider);
                    response = { 'error': false, 'message': 'Create account complete' };
                }
            }
            res.status(200).json(response);
        });
    },
    getUser: function (req, res) {
        var response = {};
        // tmp_password = crypto.createHash('sha1').update(req.body.password).digest('base64');
        Usermodel.find({ username: req.body.username }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': 'error fetching data' };
            } else {
                if (data.length > 0) {
                    response = { 'error': false, 'profile': data };
                } else {
                    response = { 'error': true, 'message': 'username incorrect' };
                }
            }
            res.status(200).json(response);
        });
    },
    update_signature: function (req, res) {
        var response = {};
        Usermodel.find({ username: req.body.username }, function (err, data) {
            if (err) {
                response = {
                    'error': true,
                    'message': 'error fetching data'
                };
            } else {
                if (data === null) {
                    response = {
                        'error': true,
                        'message': 'username do not exits'
                    };
                } else {
                    data[0].signature = req.body.signature;
                    //save data to database
                    data[0].save(function (err) {
                        if (err) {
                            response = {
                                'error': true,
                                'message': 'error updating data'
                            };
                        }
                    });
                    response = {
                        'error': false,
                        'profile': data
                    };
                }
            }
            res.status(200).json(response);
        });
    }
}
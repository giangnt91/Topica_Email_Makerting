var express = require('express');
var app = express();

var mongoGroups = require('../model/groups');

function create_groups(_name, _groups, _total, _create_time) {
    tmp_groups = JSON.parse(_groups);
    var _create = new mongoGroups({
        Name: _name,
        Groups: tmp_groups,
        Total: _total,
        create_Time: _create_time
    });
    _create.save(function (err) {
        if (err) console.log(err);
    });
}

module.exports = {
    getGroups: function (req, res) {
        var response = {};
        mongoGroups.find({}, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': "Error fetching data" };
            } else {
                response = { 'error': false, 'groups': data };
            }
            res.json(response);
        }).sort({ file_Id: -1 });
    },
    getByid: function(req, res){
        var response = {};
        mongoGroups.findById({_id: req.params.id}, function(err, data){
            if(err){
                response = {'error': true, 'message':'Error fetching data'};
            }else{
                response ={'error': false, 'group': data};
            }
            res.status(200).json(response);
        });
    },
    updateByid: function(req, res){
        var response = {};
        mongoGroups.findById(req.body._id, function(err, data){
            if(err){
                response = {'error': true, 'message':'Error fetching data'};
            }else{
                if(data === null){
                    response = { 'error': true, 'message': 'groups not exists' };
                }else{
                    _group = JSON.parse(req.body.Groups);
                    data.Name = req.body.Name;
                    data.Groups = _group;
                    data.Total = req.body.Total;
                    data.create_Time = req.body.create_Time;

                    data.save(function(err){
                        if(err){
                            response = { 'error': true, 'message': 'error update data' };
                        }
                    });
                    response = { 'error': false, 'message': 'Update success !' }
                }
                res.status(200).json(response);
            }
        });
    },
    Create: function (req, res) {
        var response = {};
        mongoGroups.find({ Name: req.body.Name }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': 'error fetching data' };
            } else {
                if (data.length > 0) {
                    response = { 'error': true, 'message': 'Name group already exists, retry with another Name' }
                } else {
                    create_groups(req.body.Name, req.body.Groups, req.body.Total, req.body.create_Time);
                    response = { 'error': false, 'message': 'Create group complete' };
                }
            }
            res.status(200).json(response);
        });
    },
    delete_group: function (req, res) {
        var response = {};
        mongoGroups.findById({ _id: req.params.id }, function (err, data) {
            if (err) {
                response = { 'error': true, 'message': 'Error fetching data' };
            } else {
                mongoGroups.remove({_id: req.params.id}, function(err){
                    if (err) {
                        response = { 'error': true, 'message': 'Error updating data' };
                    }else {
                        response = {"error" : false, "message" : "Group is deleted"};
                    }
                     res.status(200).json(response);
                });
            }
        });
    }
}
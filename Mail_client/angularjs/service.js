angular.module('Mail.Service', [])
    .factory('fileUpload', function ($http) {
        var api_gateway_url = 'http://localhost:3000/';
        // var api_gateway_url = 'http://210.211.116.79:3000/';
        var parameter;
        var url;
        return {
            uploadFileToServer: function (fileId, mailAuth, mailTo, mailTitle, mailContent, file, createTime, status, deletes) {
                url = api_gateway_url + 'create/';
                return $http({
                    method: 'POST',
                    dataType: 'jsonp',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: { file_Id: fileId, mail_Auth: mailAuth, mail_To: mailTo, mail_Title: mailTitle, mail_Content: mailContent, File: file, Time: createTime, Status: status, Delete: deletes }
                }).success(function () { });
            }
        }
    })
    .factory('DataContent', function ($http) {
        var api_gateway_url = 'http://localhost:3000/';
        // var api_gateway_url = 'http://210.211.116.79:3000/';
        var parameter;
        return {
            Get_All_Mail: function () {
                url = api_gateway_url + 'all/';
                return $http.get(url);
            },
            Get_Mail_By_Id: function (mailId) {
                url = api_gateway_url + 'id/';
                return $http.get(url + mailId);
            },
            Get_Groups: function () {
                url = api_gateway_url + 'groups/';
                return $http.get(url);
            },
            Get_group_by_id: function (groupId) {
                url = api_gateway_url + 'gid/';
                return $http.get(url + groupId);
            },
            Create_Groups: function (Name, Groups, Total, create_Time) {
                url = api_gateway_url + 'cgroup/';
                return $http({
                    method: 'POST',
                    dataType: 'jsonp',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: { Name: Name, Groups: Groups, Total: Total, create_Time: create_Time }
                }).success(function () { });
            },
            Update_group: function (id, Name, Groups, Total, create_Time) {
                url = api_gateway_url + 'updateGroup/';
                return $http({
                    method: 'POST',
                    dataType: 'jsonp',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {_id: id, Name: Name, Groups: Groups, Total: Total, create_Time: create_Time }
                }).success(function () { });
            },
            Delete_group: function(id){
                url = api_gateway_url + 'gdelete/';
                return $http.post(url + id);
            }
        }
    })
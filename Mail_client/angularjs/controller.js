angular.module('Mail.controller', ['ngRoute', 'textAngular', 'Mail.Service', 'ngFileUpload', 'directive.g+signin', 'angular-md5', 'ngDialog', 'ngTagsInput'])
    .directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    })

    .filter('startFrom', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }
            start = +start; //parse to int
            return input.slice(start);
        }
    })

    .controller('LoginCtrl', function ($rootScope, $scope) {
        //google login
        //logout
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            gapi.auth2.getAuthInstance().disconnect();
        });

        //login
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            $scope.resultg = authResult;
            angular.forEach($scope.resultg, function (item) {
                userg = authResult.w3.U3;
            });
            password = "123456";
            window.localStorage.setItem('auth', userg);
            window.location.href = '#/home';
            window.location.reload(true);
        });
    })

    .controller('MailCtrl', function ($rootScope, $scope, $routeParams, DataContent) {
        $scope.auth = window.localStorage.getItem('auth');
        $scope.back = function () {
            window.location.href = '#/home';
        }
        DataContent.Get_Mail_By_Id($routeParams.id).then(function (response) {
            $scope.dataResult = response.data.mail;
        });
    })

    .controller('GroupsCtrl', function ($scope, $filter, $routeParams, ngDialog, DataContent) {
        $scope.auth = window.localStorage.getItem('auth');
        $scope._group_name;
        $scope._group_email;
        $scope._group_update_name;
      
        //get groups from server
        get_all_groups = function () {
            DataContent.Get_Groups().then(function (response) {
                $scope.groups_total = response.data.groups.length;
                $scope.groups = response.data.groups;
            });
        }
        get_all_groups();

        $scope.back = function () {
            $scope._detail = false;
            $scope._group_update_name
        }

        // create new groups
        $scope.cancel_groups = function () {
            $scope._group_name = '';
            $scope._group_email = '';
        }
        $scope.save_groups = function () {

            if ($scope._group_name === undefined || $scope._group_name === '' || $scope._group_email === undefined || $scope._group_email === '') {
                ngDialog.open({
                    template: '<h2 style="margin-top:10px"><center>Name group and email address not empty</center></h2>',
                    plain: true,
                    showClose: true,
                });
            } else {
                var time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                var tmp_json_email = JSON.stringify($scope._group_email);
                DataContent.Create_Groups($scope._group_name, tmp_json_email, $scope._group_email.length, time).then(function (response) {
                    if (response.data.error === false) {
                        ngDialog.open({
                            template: '<h2 style="margin-top:10px"><center>' + response.data.message + '</center></h2>',
                            plain: true,
                            showClose: true,
                        });
                        $scope._group_name = '';
                        $scope._group_email = '';
                        get_all_groups();
                    } else {
                        ngDialog.open({
                            template: '<h2 style="margin-top:10px"><center>' + response.data.message + '</center></h2>',
                            plain: true,
                            showClose: true,
                        });
                    }
                })
            }

        }

        //get group by id
        $scope.get_detail_group = function (id) {
            DataContent.Get_group_by_id(id).then(function (response) {
                if (response.data.error === false) {
                    $scope._detail = true;
                    $scope.result = response.data.group;
                    var tags_tmp = [];
                    for (var i = 0; i < $scope.result.Groups.length; i++) {
                        tags_tmp.push({
                            text: $scope.result.Groups[i].text
                        });
                    }
                    $scope.detail_mails = tags_tmp;
                    $scope._group_update_name = $scope.result.Name;
                } else {
                    ngDialog.open({
                        template: '<h2 style="margin-top:10px"><center>' + response.data.message + '</center></h2>',
                        plain: true,
                        showClose: true,
                    });
                }
            });
        }

        //update group by id
        $scope.update_group = function () {
            if ($scope._group_update_name === undefined || $scope._group_update_name === '') {
                $scope._group_update_name = $scope.result.Name;
            }
            if ($scope.detail_mails === undefined || $scope.detail_mails === '') {
                $scope.detail_mails = $scope.result.Groups;
            } else {
                var time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                var tmp_json_email = JSON.stringify($scope.detail_mails);
                DataContent.Update_group($scope.result._id, $scope._group_update_name, tmp_json_email, $scope.detail_mails.length, time).then(function (response) {
                    if (response.data.error === false) {
                        ngDialog.open({
                            template: '<h2 style="margin-top:10px"><center>' + response.data.message + '</center></h2>',
                            plain: true,
                            showClose: true,
                        });
                        get_all_groups();
                    } else {
                        ngDialog.open({
                            template: '<h2 style="margin-top:10px"><center>' + response.data.message + '</center></h2>',
                            plain: true,
                            showClose: true,
                        });
                    }
                });
            }
        }

        //delete group by id
        $scope.delete_group = function(id){

            ngDialog.openConfirm({
                template: '<div class="ngdialog-message">' +
                ' <center> <h3 class="confirmation-title">You want to delete this group ?</h3> </center> <br/>' +
                '    <div class="ngdialog-buttons" style="padding:0">' +
                '      <button type="button" class="ngdialog-button green darken-4" style="color:#fff; background:#0E7700" ng-click="confirm(confirmValue)">Okay</button>' +
                '      <button type="button" class="ngdialog-button green darken-4" style="color:#fff; background:#292B2C" ng-click="closeThisDialog()">Cancel</button> '+
                '    </div>' +
                '</div>',
                plain: true,
                showClose: false,
            }).then(function (confirm) {
                DataContent.Delete_group(id).then(function (response) {
                    ngDialog.open({
                            template: '<h2 style="margin-top:10px"><center>'+response.data.message+'</center></h2>',
                            plain: true,
                            showClose: true,
                        });
                    get_all_groups();
                });

            });

        }
    })

    .controller('ComposeCtrl', function ($rootScope, $q, $http, $scope, $filter, md5, fileUpload, ngDialog, DataContent) {
        $scope.auth = window.localStorage.getItem('auth');
        $scope.Compose = true;

        $scope.go_backcompose = function () {
            window.scrollTo(0, 0);
            $scope.Compose = false;
            window.location.href = '#/home';
            document.getElementById('fileToUpload').value = null;
        }

        DataContent.Get_Groups().then(function (response) {
            var groups_length = response.data.groups.length;
            var groups = response.data.groups;
            //    console.log($scope._tags)

            var tags_tmp = [];
            for (var i = 0; i < groups.length; i++) {
                tags_tmp.push({
                    id: groups[i]._id,
                    text: groups[i].Name
                });
            }
            $scope.tags = tags_tmp;
        });


        var tmp = [];
        $scope.onFileSelect = function ($files) {
            var time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            var newname = md5.createHash($scope.auth + time);
            $scope.filesize = true;
            for (var i = 0; i < $files.length; i++) {
                if ($files[i].size > 5242880) {
                    document.getElementById('fileToUpload').value = null;
                    alert("Sorry, your file is too large.");
                    $scope.filesize = false;
                }
                else
                    tmp.push({
                        File_Name: $files[i].name,
                        File_Url: 'file/upload/' + $files[i].name + newname
                    })
                $scope.array_file = JSON.stringify(tmp);
            }

        }

        $scope._send_mail = function (data) {
            $scope.tags_2 = JSON.stringify($scope.tags);
            $scope.fileId = $filter('date')(new Date(), 'ddMMyyyyHHmmss');
            $scope.uploadTime = $filter('date')(new Date(), 'HH:mm:ss dd/MM/yyyy');
            if (data.subject === undefined) {
                alert("subject is null !");
            }
            else {
                if ($scope.array_file === undefined) {
                    $scope.array_file = null;
                }
                fileUpload.uploadFileToServer($scope.fileId, $scope.auth, $scope.tags_2, data.subject, data.content, $scope.array_file, $scope.uploadTime, 0, 0).then(function (response) {
                    $scope.result = response.data;
                    if ($scope.result.status === true) {

                        ngDialog.openConfirm({
                            template: '<div class="ngdialog-message">' +
                            ' <center> <h3 class="confirmation-title">Your Email Send Success !</h3> </center> <br/>' +
                            '    <div class="ngdialog-buttons" style="padding:0">' +
                            '      <button type="button" class="ngdialog-button green darken-4" style="color:#fff; background:#0E7700" ng-click="confirm(confirmValue)">Okay</button>' +
                            '    </div>' +
                            '</div>',
                            plain: true,
                            showClose: false,
                        }).then(function (confirm) {
                            data = null;
                            document.getElementById('fileToUpload').value = null;
                            window.location.href = '#/home';
                            window.scrollTo(0, 0);
                        });
                    }
                });
            }
        }

    })

    .controller('HomeCtrl', function ($rootScope, $scope, $filter, $http, Upload, fileUpload, md5, DataContent) {
        $scope.auth = window.localStorage.getItem('auth');
        var date = new Date();

        $scope.logout = function () {
            window.localStorage.clear();
            window.location.reload(true);
        }
        $scope.readmailbyId = function (keys) {
            window.location.href = '#/mail/' + keys;
        }

        $scope.go_inbox = function () {
            $rootScope.AI = false;
            window.location.href = '#/home';
        }

        $scope.go_send = function () {
            $rootScope.AI = true;
            window.location.href = '#/home';
        }

        $scope.go_compose = function () {
            window.location.href = '#/compose';
        }

        $scope.go_groups = function () {
            window.location.href = '#/groups';
        }

        // $scope.trash = function(){
        //     window.location.href = '#/trash';
        // }

        $scope.Search_Mail = '';
        $scope.currentPage = 0;
        $scope.pageSize = 50;
        // get data
        $scope.reloadData = function () {
            DataContent.Get_All_Mail().then(function (response) {
                $scope.results = response.data.mail;
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.results.length / $scope.pageSize);
                }
            });
        }
        $scope.reloadData();

    });




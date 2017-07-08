angular.module('Mail', ['ngRoute','Mail.controller','Mail.Service'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/home", { templateUrl: "partials/home.html", controller: "HomeCtrl" })
    .when("/login", { templateUrl: "partials/login.html", controller:"LoginCtrl" })
    .when("/signature", { templateUrl: "partials/signature.html", controller:"SignatureCtrl" })
    .when("/mail/:id", { templateUrl: "partials/mail.html", controller:"MailCtrl" })
    .when("/compose", { templateUrl: "partials/compose.html", controller:"ComposeCtrl" })
    .when("/groups", { templateUrl: "partials/groups.html", controller: "GroupsCtrl" })
    .when("/trash", { templateUrl: "partials/trash.html", controller:"trashCtrl" })
    .otherwise({ redirectTo: '/login' });
}])

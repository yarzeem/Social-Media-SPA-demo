"use strict";

// Node Modules
import angular from "angular";
import ngRoute from "angular-route";
import ngAria from "angular-aria";
import ngCookies from "angular-cookies";
import ngAnimate from "angular-animate";
import ngMaterial from "angular-material";
import angularInView from "angular-inview";
// Services
import UserService from "./service/user.service";
import NotificationService from "./service/notification.service";
import RedirectService from "./service/redirect.service";
import ContentService from "./service/content.service";
// Controllers
import LoginController from "./controller/login.controller";
import WallController from "./controller/wall.controller";
import AppbarController from "./controller/appbar.controller";

angular
    .module('app', ['ngRoute', 'ngAria', 'ngCookies', 'ngAnimate', 'ngMaterial', 'angular-inview'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/", {
            redirectTo: '/wall'
        })
            .when("/wall", {
            templateUrl : "./assets/partials/wall.view.html"
        })
            .when("/login", {
            templateUrl : "./assets/partials/login.view.html"
        })
    }])
    .config( ['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'filesystem:**',
            'https://www.youtube.com/**'
        ]);
    }])
    .service("userService", UserService)
    .service("notificationService", NotificationService)
    .service("redirectService", RedirectService)
    .service("contentService", ContentService)
    .controller("loginController", LoginController)
    .controller("wallController", WallController)
    .controller("appbarController", AppbarController)
    .run(['$rootScope', 'redirectService', 'userService', function($rootScope, redirectService, userService) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if (!userService.isUserSignedIn()) {
                var browserUser = userService.getBrowserUser();
                if (browserUser !== undefined) {
                    userService.signUserIn(browserUser);
                } else {
                    if (next.templateUrl == "./assets/partials/login.view.html") {
                        // do nothing
                    } else {
                      redirectService.toLogin();
                    }
                }
            } else {
                if (next.templateUrl == "./assets/partials/login.view.html") {
                    redirectService.toWall();
                }
            }
        });
    }]);

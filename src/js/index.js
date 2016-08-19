/**
 * js/index.js - w3bp
 * Basic AngularJS setup for routing.
 * 
 * Licensed under MIT license.
 * Copyright (C) 2016 Karim Alibhai.
 */

window.app = function () {
    'use strict';

    const app = angular.module('w3bp', ['ngRoute', 'ngAnimate']);

    app.config(['$routeProvider', '$locationProvider', function ($router, $location) {
        $router.when('/', {
            templateUrl: '/views/index.html'
        });

        $location.html5Mode(true);
    }]);

    return app;
}();
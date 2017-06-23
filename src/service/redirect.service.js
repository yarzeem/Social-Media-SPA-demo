"use strict";

class RedirectService {

    constructor($location) {
        this.$location = $location;
    }

    toWall() {
        this.$location.path("/wall");
    }

    toLogin() {
        this.$location.path("/login");
    }

}

RedirectService.$inject = ['$location'];
export default RedirectService;

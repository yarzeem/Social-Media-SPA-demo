"use strict";

class UserService {

    constructor($http, $rootScope, $cookies) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$cookies = $cookies;
    }

    getUser() {
        return this.$rootScope.user.response;
    }

    isUserSignedIn() {
        return this.$rootScope.user !== undefined;
    }

    getBrowserUser() {
        var userJson = this.$cookies.get('user');
        if (userJson !== undefined) {
            return JSON.parse(userJson);
        }
        return undefined;
    }

    signUserIn(userData) {
        console.log("Signing user in!");
        this.$rootScope.user = userData;
        this.$cookies.put("user", JSON.stringify(this.$rootScope.user));
    }

    signUserOut() {
        console.log("Signing user out ...");
        this.$rootScope.user = undefined;
        this.$cookies.remove("user");
    }

    requestUser(email, password) {
        if (email === "test@account.com") {
            return this.$http.get("mocks/user.success.response.json");
        } else {
            return this.$http.get("mocks/user.error.response.json");
        }
    }

}

UserService.$inject = ['$http', '$rootScope', '$cookies'];
export default UserService;

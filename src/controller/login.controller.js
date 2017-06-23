"use strict";

class LoginController {

    constructor(userService, notificationService, redirectService) {
        this.userService = userService;
        this.notificationService = notificationService;
        this.redirectService = redirectService;
    }

    submit() {
        var userService = this.userService;
        var notificationService = this.notificationService;
        var redirectService = this.redirectService;
        userService.requestUser(this.email, this.password)
        .then(function (response) {
            if (response.data.result === "success") {
                userService.signUserIn(response.data);
                var user = userService.getUser();
                notificationService.raise("Hello " + user.firstName + "!");
                redirectService.toWall();
            } else {
                notificationService.raise(response.data.response.errorMessage);
            }
        });
    }

    assignTestUser() {
        console.log("Assigning test user");
        this.email = "test@account.com";
        this.password = "test";
    }

    resetUser() {
        console.log("Reseting user");
        this.email = "";
        this.password = "";
    }

}

LoginController.$inject = ['userService', 'notificationService', 'redirectService'];
export default LoginController;

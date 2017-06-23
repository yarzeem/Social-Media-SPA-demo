"use strict";

class AppbarController {

    constructor(userService, redirectService, notificationService) {
        this.userService = userService;
        this.redirectService = redirectService;
        this.notificationService = notificationService;
        var self = this;
        this.items = [
            {
              icon : "person_add",
              redirect : "/requests",
              click : function () {},
              ariaLabel : "Friends Requests"
            },
            {
              icon : "notifications",
              redirect : "/alerts",
              click : function () {},
              ariaLabel : "Alerts"
            },
            {
              icon : "chat",
              redirect : "/messages",
              click : function () {},
              ariaLabel : "Messages"
            },
            {
              icon : "home",
              redirect : "/wall",
              click : function () {},
              ariaLabel : "Wall"
            },
            {
              icon : "account_box",
              redirect : "/profile",
              click : function () {},
              ariaLabel : "Profile"
            },
            {
              icon : "cancel",
              redirect : undefined,
              click : function () { self.signOut(); },
              ariaLabel : "Sign Out"
            }
        ];
    }

    currentLocation() {
        return "/wall";
    }

    signedIn() {
        return this.userService.isUserSignedIn();
    }

    signOut() {
        console.log("sign out...");
        var user = this.userService.getUser();
        this.notificationService.raise("Bye " + user.firstName + " " + user.lastName + "!");
        this.userService.signUserOut();
        this.redirectService.toLogin();
    }
}

AppbarController.$inject = ['userService', 'redirectService', 'notificationService'];
export default AppbarController;

"use strict";

class NotificationService {

    constructor($mdToast) {
        this.$mdToast = $mdToast;
    }

    raise(message) {
        var mdToast = this.$mdToast;
        mdToast.show(
          mdToast.simple()
          .textContent(message)
          .hideDelay(3000)
        );
    }

}

NotificationService.$inject = ['$mdToast'];
export default NotificationService;

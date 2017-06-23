"use strict";

class ContentService {

    constructor($http) {
        this.$http = $http;
    }

    getWallContent(userId) {
        if (userId == 1) {
            return this.$http.get("mocks/content.wall.success.response.json");
        }
    }

    getContentComments(contentId) {
        return this.$http.get("mocks/content.comments.success.response.json");
    }

}

ContentService.$inject = ['$http'];
export default ContentService;

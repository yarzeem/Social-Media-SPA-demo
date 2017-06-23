"use strict";

class WallController {

    constructor(notificationService, redirectService, userService, contentService) {
        this.notificationService = notificationService;
        this.redirectService = redirectService;
        this.userService = userService;
        this.contentService = contentService;

        this.reactions = [
            'sentiment_very_dissatisfied',
            'sentiment_dissatisfied',
            'sentiment_neutral',
            'sentiment_satisfied',
            'sentiment_very_satisfied'
        ]
        this.content = [];
    }

    loadContent() {
        console.log("Loading wall content...");
        var self = this;
        this.contentService.getWallContent(this.userService.getUser().userId)
        .then(function (response) {
            if (response.data.result === "success") {
                response.data.response.forEach((item, index) => {
                    item.contentId = index + self.content.length;
                });
                self.content = self.content.concat(response.data.response);
            } else {
                notificationService.raise("Impossible to load content");
            }
        });
    }

    loadComments(contentId) {
        var self = this;
        this.contentService.getContentComments(contentId)
        .then(function (response) {
            if (response.data.result === "success") {
                self.getContent(contentId).comments = response.data.response;
                console.log(self.getComment(contentId, 4));
            } else {
                notificationService.raise("Impossible to load comments");
            }
        });
    }

    getContent(contentId) {
        return this.content.filter(function(item) {
            return item.contentId === contentId;
        })[0];
    }

    getComment(contentId, commentId) {
        var result = undefined;
        this.getContent(contentId).comments.forEach((comment) => {
            if (result !== undefined) return;
            if (comment.commentId === commentId) {
                result = comment;
            } else {
                result = comment.comments.filter(function(item) {
                    return item.commentId === commentId;
                })[0];
            }
        });
        return result;
    }

    vote(contentId, value) {
        this.getContent(contentId).vote = value;
        this.notificationService.raise("Thanks for your vote!");
    }



}

WallController.$inject = ['notificationService', 'redirectService', 'userService', 'contentService'];
export default WallController;

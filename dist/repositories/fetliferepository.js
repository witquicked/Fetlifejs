import * as Constants from '../constants';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
var FetlifeRepository = (function () {
    function FetlifeRepository(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    FetlifeRepository.prototype.login = function (username, password, redirectUri) {
        var body = {
            username: username,
            password: password,
            grant_type: Constants.GRANT_TYPE_PASSWORD
        };
        return fetch(Constants.BASE_URL + "/api/oauth/token?client_id=" + this.clientId + "&client_secret=" + this.clientSecret, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    };
    FetlifeRepository.prototype.refreshToken = function (refreshToken) {
        var form = new FormData();
        form.append('refresh_token', refreshToken);
        form.append('client_secret', this.clientSecret);
        form.append('redirect_uri', Constants.REDIRECT_URL);
        form.append('grant_type', Constants.GRANT_TYPE_PASSWORD);
        return fetch(Constants.BASE_URL + "/api/oauth/token?client_id=" + this.clientId, {
            body: form,
            method: 'POST'
        });
    };
    FetlifeRepository.prototype.getMe = function (tokenType, accessToken) {
        return fetch(Constants.BASE_URL + "/api/v2/me", {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.getConversations = function (tokenType, accessToken, limit, page, orderBy) {
        return fetch(Constants.BASE_URL + "/api/v2/me/conversations?order_by=" + orderBy + "&limit=" + limit + "&page=" + page, {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.getConversationMessages = function (tokenType, accessToken, conversationId, sinceMessageId, untilMessageId, limit) {
        return fetch(Constants.BASE_URL + "/api/v2/me/conversations/" + conversationId + "/messages?since_id=" + sinceMessageId + "&until_id=" + untilMessageId + "&limit={limit}", {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.replyToConversation = function (tokenType, accessToken, conversationId, message) {
        return fetch(Constants.BASE_URL + "/api/v2/conversations/" + conversationId + "/messages", {
            method: 'POST',
            headers: { Authorization: tokenType + "\u00A0" + accessToken },
            body: message
        });
    };
    FetlifeRepository.prototype.createConversation = function (tokenType, accessToken, userId, subject, message) {
        var conversation = {
            user_id: userId,
            subject: subject,
            body: message
        };
        return fetch(Constants.BASE_URL + "/api/v2/me/conversations", {
            method: 'POST',
            headers: { Authorization: tokenType + "\u00A0" + accessToken },
            body: JSON.stringify(conversation)
        });
    };
    FetlifeRepository.prototype.setMessageAsRead = function (tokenType, accessToken, conversationId, ids) {
        var body = { ids: ids };
        return fetch(Constants.BASE_URL + "/api/v2/me/conversations/" + conversationId + "/messages/read", {
            method: 'PUT',
            headers: { Authorization: tokenType + "\u00A0" + accessToken },
            body: JSON.stringify(body)
        });
    };
    FetlifeRepository.prototype.getFriends = function (tokenType, accessToken, limit, page) {
        return fetch(Constants.BASE_URL + "/api/v2/me/friends?limit=" + limit + "&page=" + page, {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.getFriendRequests = function (tokenType, accessToken, limit, page) {
        return fetch(Constants.BASE_URL + "/api/v2/me/friendrequests?limit=" + limit + "&page=" + page, {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.acceptFriendRequest = function (tokenType, accessToken, friendRequestId) {
        return fetch(Constants.BASE_URL + "/api/v2/me/friendrequests/" + friendRequestId, {
            method: 'PUT',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.deleteFriendRequest = function (tokenType, accessToken, friendRequestId) {
        return fetch(Constants.BASE_URL + "/api/v2/me/friendrequests/" + friendRequestId, {
            method: 'DELETE',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.createFriendRequest = function (tokenType, accessToken, memberId) {
        var body = { memberId: memberId };
        return fetch(Constants.BASE_URL + "/api/v2/me/friendrequests", {
            method: 'POST',
            headers: { Authorization: tokenType + "\u00A0" + accessToken },
            body: JSON.stringify(body)
        });
    };
    FetlifeRepository.prototype.getProfile = function (tokenType, accessToken, memberId) {
        return fetch(Constants.BASE_URL + "/api/v2/members/" + memberId, {
            method: 'GET',
            headers: { Authorization: tokenType + "\u00A0" + accessToken }
        });
    };
    FetlifeRepository.prototype.uploadPicture = function (tokenType, accessToken, picture, isAvatar, friendsOnly, caption, isFromUser) {
        var body = {
            picture: picture,
            caption: caption,
            is_avatar: isAvatar,
            only_friends: friendsOnly,
            is_of_or_by_user: isFromUser
        };
        return fetch(Constants.BASE_URL + "/api/v2/me/pictures", {
            method: 'POST',
            headers: { Authorization: tokenType + "\u00A0" + accessToken },
            body: JSON.stringify(body)
        });
    };
    return FetlifeRepository;
}());
export { FetlifeRepository };
//# sourceMappingURL=fetliferepository.js.map
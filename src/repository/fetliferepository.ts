import IFetlifeRepository               from './ifetliferepository';
import * as Constants                   from '../constants';

import { 
    AuthBodyRequest, 
    TokenRefreshRequest,
    LoginRequest,
    CreateConversationRequest 
}                                       from '../requests';

import fetch, { RequestInit, RequestMode, Response } from 'node-fetch';
import FormData                         from 'form-data';

export default class FetlifeRepository implements IFetlifeRepository {    
    private clientId: string;
    private clientSecret: string;

    public constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public login(username: string, password: string, redirectUri: string) : Promise<Response> {
        const body = <AuthBodyRequest>{
            username,
            password,
            grant_type: Constants.GRANT_TYPE_PASSWORD
        };
        
        return fetch(`${Constants.BASE_URL}/api/oauth/token?client_id=${this.clientId}&client_secret=${this.clientSecret}`, <RequestInit>{
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    public refreshToken(refreshToken: string): Promise<Response> {
        let form = new FormData();
        
        form.append('refresh_token', refreshToken);
        form.append('client_secret', this.clientSecret);
        form.append('redirect_uri', Constants.REDIRECT_URL);
        form.append('grant_type', Constants.GRANT_TYPE_PASSWORD);
        
        return fetch(`${Constants.BASE_URL}/api/oauth/token?client_id=${this.clientId}`, <RequestInit>{
            body: form,
            method: 'POST'
        });
    }

    public getMe(tokenType: string, accessToken: string) : Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public getConversations(tokenType: string, accessToken: string, order_by: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations?order_by=${order_by}&limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public getConversationMessages(tokenType: string, accessToken: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations/${conversationId}/messages?since_id=${sinceMessageId}&until_id=${untilMessageId}&limit={limit}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public replyToConversation(tokenType: string, accessToken: string, conversationId: string, message: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/conversations/${conversationId}/messages`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: `${tokenType} ${accessToken}` },
            body: message
        });
    }

    public createConversation(tokenType: string, accessToken: string, userId: string, subject: string, message: string): Promise<Response> {
        const conversation = {
            user_id: userId,
            subject: subject,
            body: message
        };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: `${tokenType} ${accessToken}` },
            body: JSON.stringify(conversation)
        });
    }

    public setMessageAsRead(tokenType: string, accessToken: string, conversationId: string, ids: Array<string>): Promise<Response> {
        const body = { ids }
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations/${conversationId}/messages/read`, <RequestInit>{
            method: 'PUT',
            headers: { Authorization: `${tokenType} ${accessToken}` },
            body: JSON.stringify(body)
        });
    }

    public getFriends(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friends?limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public getFriendRequests(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests?limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public acceptFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests/${friendRequestId}`, <RequestInit>{
            method: 'PUT',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public deleteFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests/${friendRequestId}`, <RequestInit>{
            method: 'DELETE',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public createFriendRequest(tokenType: string, accessToken: string, memberId: string): Promise<Response> {
        const body = { memberId };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: `${tokenType} ${accessToken}` },
            body: JSON.stringify(body)
        });
    }

    public getProfile(tokenType: string, accessToken: string, memberId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/members/${memberId}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: `${tokenType} ${accessToken}` }
        });
    }

    public uploadPicture(tokenType: string, accessToken: string, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<any> {
        const body = {
            picture,
            caption,
            is_avatar: isAvatar,
            only_friends: friendsOnly,
            is_of_or_by_user: isFromUser
        };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/pictures`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: `${tokenType} ${accessToken}` },
            body: JSON.stringify(body)
        });
    }
}
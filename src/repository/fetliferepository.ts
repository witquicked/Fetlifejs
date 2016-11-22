import IFetlifeRepository               from './ifetliferepository';
import * as Constants                   from '../constants';

import IAuthBody                        from '../requests/iauthbody';
import ITokenRefreshRequest             from '../requests/itokenrefreshrequest';
import ILoginRequest                    from '../requests/iloginrequest';
import ICreateConversationRequest       from '../requests/icreateconversationrequest';

import ITokenResponse                   from '../responses/itokenresponse';
import IUser                            from '../responses/iuser';
import IConversation                    from '../responses/iconversation';
import IMessage                         from '../responses/imessage';
import IFriend                          from '../responses/ifriend';
import IFriendRequest                   from '../responses/ifriendrequest';

import fetch, { RequestInit, RequestMode, Response } from 'node-fetch';

export default class FetlifeRepository implements IFetlifeRepository {    
    private clientId: string;
    private clientSecret: string;

    public constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public login(username: string, password: string, redirectUri: string) : Promise<Response> {
        const body = <IAuthBody>{
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
        const body = <ITokenRefreshRequest>{
            refresh_token: refreshToken,
            redirect_uri: Constants.REDIRECT_URL,
            grant_type: Constants.GRANT_TYPE_PASSWORD
        };
        
        return fetch(`${Constants.BASE_URL}/api/oauth/token?client_id=${this.clientId}&client_secret=${this.clientSecret}`, <RequestInit>{
            body: JSON.stringify(body),
            method: 'POST'
        });
    }

    public getMe(authorisation: string) : Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public getConversations(authorisation: string, order_by: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations?order_by=${order_by}&limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public getConversationMessages(authorisation: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations/${conversationId}/messages?since_id=${sinceMessageId}&until_id=${untilMessageId}&limit={limit}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public replyToConversation(authorisation: string, conversationId: string, message: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/conversations/${conversationId}/messages`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: authorisation },
            body: message
        });
    }

    public createConversation(authorisation: string, userId: string, subject: string, message: string): Promise<Response> {
        const conversation = {
            user_id: userId,
            subject: subject,
            body: message
        };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: authorisation },
            body: JSON.stringify(conversation)
        });
    }

    public setMessageAsRead(authorisation: string, conversationId: string, ids: Array<string>): Promise<Response> {
        const body = { ids }
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/conversations/${conversationId}/messages/read`, <RequestInit>{
            method: 'PUT',
            headers: { Authorization: authorisation },
            body: JSON.stringify(body)
        });
    }

    public getFriends(authorisation: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friends?limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public getFriendRequests(authorisation: string, limit: number, page: number): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests?limit=${limit}&page=${page}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public acceptFriendRequest(authorisation: string, friendRequestId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests/${friendRequestId}`, <RequestInit>{
            method: 'PUT',
            headers: { Authorization: authorisation }
        });
    }

    public deleteFriendRequest(authorisation: string, friendRequestId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests/${friendRequestId}`, <RequestInit>{
            method: 'DELETE',
            headers: { Authorization: authorisation }
        });
    }

    public createFriendRequest(authorisation: string, memberId: string): Promise<Response> {
        const body = { memberId };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/friendrequests`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: authorisation },
            body: JSON.stringify(body)
        });
    }

    public getProfile(authorisation: string, memberId: string): Promise<Response> {
        return fetch(`${Constants.BASE_URL}/api/v2/members/${memberId}`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public uploadPicture(authorisation, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<any> {
        const body = {
            picture,
            caption,
            is_avatar: isAvatar,
            only_friends: friendsOnly,
            is_of_or_by_user: isFromUser
        };
        
        return fetch(`${Constants.BASE_URL}/api/v2/me/pictures`, <RequestInit>{
            method: 'POST',
            headers: { Authorization: authorisation },
            body: JSON.stringify(body)
        });
    }
}
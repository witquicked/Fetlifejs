import IFetlifeRepository               from './ifetliferepository';
import * as Constants                   from '../constants';

import IAuthBody                        from '../requests/iauthbody';
import ITokenRefreshRequest             from '../requests/itokenrefreshrequest';
import ILoginRequest                    from '../requests/iloginrequest';

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

    public refreshToken(refreshToken: string): Promise<ITokenResponse> {
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

    public getMe(authorisation: string) : Promise<IUser> {
        return fetch(`${Constants.BASE_URL}/api/v2/me`, <RequestInit>{
            method: 'GET',
            headers: { Authorization: authorisation }
        });
    }

    public getConversations(authorisation: string, order_by: string, limit: number, page: number): Promise<Array<IConversation>> {
        return Promise.reject('not implemented');
    }

    public getConversationMessages(authorisation: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Array<IMessage>> {
        return Promise.reject('not implemented');
    }

    public replyToConversation(authorisation: string, conversationId: string, message: string): Promise<IMessage> {
        return Promise.reject('not implemented');
    }

    public createConversation(authorisation: string, userId: string, subject: string, message: string): Promise<IConversation> {
        return Promise.reject('not implemented');
    }

    public setMessageAsRead(authorisation: string, conversationId: string, ids: Array<string>): Promise<any> {
        return Promise.reject('not implemented');
    }

    public getFriends(authorisation: string, limit: number, page: number): Promise<Array<IFriend>> {
        return Promise.reject('not implemented');
    }

    public getFriendRequests(authorisation: string, limit: number, page: number): Promise<Array<IFriendRequest>> {
        return Promise.reject('not implemented');
    }

    public acceptFriendRequest(authorisation: string, friendRequestId: string): Promise<IFriendRequest> {
        return Promise.reject('not implemented');
    }

    public deleteFriendRequest(authorisation: string, friendRequestId: string): Promise<IFriendRequest> {
        return Promise.reject('not implemented');
    }

    public createFriendRequest(authorisation: string, memberId: string): Promise<IFriendRequest> {
        return Promise.reject('not implemented');
    }

    public getProfile(authorisation: string, memberId: string): Promise<IUser> {
        return Promise.reject('not implemented');
    }

    public uploadPicture(authorisation, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<any> {
        return Promise.reject('not implemented');
    }
}
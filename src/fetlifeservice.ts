import IFetlifeService          from './ifetlifeservice';
import * as Constants           from './constants';

import IAuthBody                from './requests/iauthbody';
import ILoginRequest            from './requests/iloginrequest';

import ITokenResponse           from './responses/itokenresponse';
import IUser                    from './responses/iuser';
import IConversation            from './responses/iconversation';

import fetch, { RequestInit }   from 'node-fetch';

export default class FetlifeService implements IFetlifeService {    
    private clientId: string;
    private clientSecret: string;

    public constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public login(username: string, password: string, redirectUri: string) : Promise<ITokenResponse> {
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
        return Promise.reject('not implemented');
    }

    public getMe(authorisation: string) : Promise<IUser> {
        return Promise.reject('not implemented');
    }

    public getConversations(authorisation: string, order_by: string, limit: number, page: number): Promise<Array<IConversation>> {
        return Promise.reject('not implemented');
    }
}
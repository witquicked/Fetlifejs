import IFetlifeService          from './ifetlifeservice';
import * as Constants           from './constants';

import IAuthBody                from './requests/iauthbody';
import ILoginRequest            from './requests/iloginrequest';

import ITokenResponse           from './responses/itokenresponse';

import fetch, { RequestInit }   from 'node-fetch';

export default class FetlifeService implements IFetlifeService {    
    public login(username: string, password: string) : Promise<ITokenResponse> {
        const body = <IAuthBody>{
            username,
            password,
            grant_type: Constants.GRANT_TYPE_PASSWORD
        };
        
        return fetch(`${Constants.BASE_URL}/api/oauth/token`, <RequestInit>{
            body: JSON.stringify(body),
            method: 'POST'
        });
    }
}
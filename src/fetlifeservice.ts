import IFetlifeService      from './ifetlifeservice';
import * as Constants       from './constants';

import IFetlifeRepository   from './repository/ifetliferepository';
import FetlifeRepository    from './repository/fetliferepository';

import {
    TokenResponse
}                           from './responses';

import { isSuccess }        from './helpers/responsehelpers';

export default class FetlifeService implements IFetlifeService {
    private readonly repository: IFetlifeRepository;
    
    private currentToken: TokenResponse; 
    
    public constructor() {
        let clientId, clientSecret;

        this.repository = new FetlifeRepository(clientId, clientSecret);
    }

    public async login(username: string, password: string): Promise<TokenResponse> {
        let response = await this.repository.login(username, password, Constants.REDIRECT_URL);

        if(isSuccess(response))
        {
            this.currentToken = await response.json<TokenResponse>();
            return this.currentToken;
        }

        return Promise.reject('invalid login');
    }
}
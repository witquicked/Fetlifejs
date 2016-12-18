import { IFetlifeService }  from './ifetlifeservice';
import * as Constants       from '../constants';

import {
    IFetlifeRepository,
    FetlifeRepository
}                           from '../repositories';

import {
    MemberResponse,
    TokenResponse
}                           from '../responses';

import { isSuccess }        from '../helpers/responsehelpers';

export class FetlifeService implements IFetlifeService {
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

    public async getMe(): Promise<MemberResponse> {
        if(!this.currentToken)
            return Promise.reject('Need to login first');

        let response = await this.repository.getMe(this.currentToken.token_type, this.currentToken.access_token);

        return response.json<MemberResponse>();
    }

    public async getConversations() {
        if(!this.currentToken)
            return Promise.reject('Need to login first');

        let response = await this.repository.getConversations(this.currentToken.token_type, this.currentToken.access_token);
    }
}
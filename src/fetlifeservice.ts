import IFetlifeService      from './ifetlifeservice';
import * as Constants       from './constants';

import IFetlifeRepository   from './repository/ifetliferepository';
import FetlifeRepository    from './repository/fetliferepository';

import ITokenResponse       from './responses/itokenresponse';

import { isSuccess }        from './helpers/requesthelpers';

export default class FetlifeService implements IFetlifeService {
    private readonly repository: IFetlifeRepository;
    
    private currentToken: ITokenResponse; 
    
    public constructor() {
        let clientId, clientSecret;

        this.repository = new FetlifeRepository(clientId, clientSecret);
    }

    public async login(username: string, password: string): Promise<ITokenResponse> {
        let response = await this.repository.login(username, password, Constants.REDIRECT_URL);

        if(isSuccess(response))
        {
            this.currentToken = await response.json<ITokenResponse>();
            return this.currentToken;
        }

        return Promise.reject('invalid login');
    }
}
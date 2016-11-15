import ITokenResponse           from './responses/itokenresponse';

interface IFetlifeService {
    login(username: string, password: string, redirectUri: string): Promise<ITokenResponse>;
    

}

export default IFetlifeService;
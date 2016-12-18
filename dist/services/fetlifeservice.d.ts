import { IFetlifeService } from './ifetlifeservice';
import { MemberResponse, TokenResponse } from '../responses';
export declare class FetlifeService implements IFetlifeService {
    private readonly repository;
    private currentToken;
    constructor();
    login(username: string, password: string): Promise<TokenResponse>;
    getMe(): Promise<MemberResponse>;
    getConversations(): Promise<void>;
}

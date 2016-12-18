import {
    MemberResponse,
    TokenResponse
}                           from '../responses';

export interface IFetlifeService {
    login(username: string, password: string): Promise<TokenResponse>;
}
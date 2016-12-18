import { AuthBodyRequest } from './authbodyrequest';

export type LoginRequest = {
    client_id: string,
    
    client_secret: string,
    
    redirect_uri: string | null,
    
    authBody: AuthBodyRequest
}
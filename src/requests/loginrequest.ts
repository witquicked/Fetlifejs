import { AuthBody } from './authbody';

export type LoginRequest = {
    client_id: string,
    
    client_secret: string,
    
    redirect_uri: string | null,
    
    authBody: AuthBody
}
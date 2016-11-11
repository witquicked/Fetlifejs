interface ILoginRequest {
    client_id: string,
    
    client_secret: string,
    
    redirect_uri: string | null,
    
    authBody: {}
}

export default ILoginRequest;
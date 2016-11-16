interface ITokenRefreshRequest {
    refresh_token: string,
    
    redirect_uri: string,
    
    grant_type: string
}

export default ITokenRefreshRequest;
const AUTH_HEADER_PREFIX         = "Bearer ";

export function authorizationFactory(accessToken: string): any {
    return {
        Authorization: `${AUTH_HEADER_PREFIX} ${accessToken}`
    }
}
import * as FormData from "form-data";

const GRANT_TYPE = "refresh_token";

export function refreshTokenFactory(refreshToken: string, clientSecret: string, redirectUrl?: string): FormData {
    let body = new FormData();

    body.append("client_secret", clientSecret);
    body.append("grant_type", GRANT_TYPE);
    body.append("refresh_token", refreshToken);
    body.append("redirect_uri", redirectUrl);

    return body;
}
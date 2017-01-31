const GRANT_TYPE = "password";

export function authBodyFactory(username: string, password: string) : any {
    return {
        username,
        password,
        grant_type: GRANT_TYPE
    };
}
import { Response }     from 'node-fetch';

export function isSuccess(response: Response): boolean {
    return response.ok;
}
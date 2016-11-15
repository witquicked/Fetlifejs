import IMember from './IMember';

interface IUser extends IMember {
    refresh_token: string;

    access_token: string;
}

export default IUser;
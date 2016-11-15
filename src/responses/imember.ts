import IAvatar from './iavatar';

interface IMember {
    id: string;

    nickname: string;

    notification_token: string;

    meta_line: string;

    avatar: IAvatar;

    url: string;

    avatarLink: string;
}

export default IMember;
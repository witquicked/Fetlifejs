import { AvatarResponse } from './avatarresponse';
export declare type UserResponse = {
    refresh_token: string;
    access_token: string;
    id: string;
    nickname: string;
    notification_token: string;
    meta_line: string;
    avatar: AvatarResponse;
    url: string;
    avatarLink: string;
};

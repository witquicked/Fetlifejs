import { AvatarResponse } from './avatarresponse';

export type MemberResponse = {
    id: string;

    nickname: string;

    notification_token: string;

    meta_line: string;

    avatar: AvatarResponse;

    url: string;

    avatarLink: string;
}
import { MemberResponse } from './memberresponse';
export declare type FriendRequestResponse = {
    clientId: string;
    id: string;
    created_at: string;
    member: MemberResponse;
    date: number;
    pendingState: number;
    pending: boolean;
    memberId: string;
    memberLink: string;
    nickname: string;
    metaInfo: string;
    avatarLink: string;
};

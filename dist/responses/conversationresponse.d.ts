import { MemberResponse } from './memberresponse';
export declare type ConversationResponse = {
    id: string;
    subject: string;
    created_at: string;
    updated_at: string;
    date: number;
    has_new_messages: boolean;
    member: MemberResponse;
    nickname: string;
    avatarLink: string;
    memberLink: string;
    memberId: string;
};

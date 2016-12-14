import { MemberResponse } from './memberresponse';

export type MessageResponse = {
    clientId: string;

    id: string;

    body: string;

    created_at: string

    member: MemberResponse;

    is_new: boolean;

    date: number;

    conversationId: string;

    senderId: string;

    senderNickname: string;

    pending: boolean;

    failed: boolean;
}
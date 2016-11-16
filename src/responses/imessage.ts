import IMember from './imember';

interface IMessage {
    clientId: string;

    id: string;

    body: string;

    created_at: string

    member: IMember;

    is_new: boolean;

    date: number;

    conversationId: string;

    senderId: string;

    senderNickname: string;

    pending: boolean;

    failed: boolean;
}

export default IMessage;
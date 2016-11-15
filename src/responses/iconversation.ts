import IMember from './imember';

interface IConversation {
    id: string;

    subject: string;

    created_at: string;

    updated_at: string;

    date: number;

    has_new_messages: boolean;

    member: IMember;

    nickname: string;

    avatarLink: string;

    memberLink: string;

    memberId: string;
}

export default IConversation;
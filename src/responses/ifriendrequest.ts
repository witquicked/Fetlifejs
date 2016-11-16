import IMember from './imember';

interface IFriendRequest {
    clientId: string;

    id: string;

    created_at: string;

    member: IMember;

    date: number;

    pendingState: number;

    pending: boolean;

    memberId: string;

    memberLink: string;

    nickname: string;

    metaInfo: string;

    avatarLink: string;
}

export default IFriendRequest;
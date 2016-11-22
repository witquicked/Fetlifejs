import ITokenResponse           from '../responses/itokenresponse';
import IUser                    from '../responses/iuser';
import IConversation            from '../responses/iconversation';
import IMessage                 from '../responses/imessage';
import IFriend                  from '../responses/ifriend';
import IFriendRequest           from '../responses/ifriendrequest';

import { Response }             from 'node-fetch';

interface IFetlifeRepository {
    login(username: string, password: string, redirectUri: string): Promise<Response>;
    
    refreshToken(refreshToken: string): Promise<Response>;

    getMe(authorisation: string) : Promise<Response>;

    getConversations(authorisation: string, order_by: string, limit: number, page: number): Promise<Response>;

    getConversationMessages(authorisation: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Response>;

    replyToConversation(authorisation: string, conversationId: string, message: string): Promise<Response>;

    createConversation(authorisation: string, userId: string, subject: string, message: string): Promise<Response>;

    setMessageAsRead(authorisation: string, conversationId: string, ids: Array<string>): Promise<Response>;

    getFriends(authorisation: string, limit: number, page: number): Promise<Response>;

    getFriendRequests(authorisation: string, limit: number, page: number): Promise<Response>;

    acceptFriendRequest(authorisation: string, friendRequestId: string): Promise<Response>;

    deleteFriendRequest(authorisation: string, friendRequestId: string): Promise<Response>;

    createFriendRequest(authorisation: string, memberId: string): Promise<Response>;

    getProfile(authorisation: string, memberId: string): Promise<Response>;

    uploadPicture(authorisation, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<Response>;
}

export default IFetlifeRepository;
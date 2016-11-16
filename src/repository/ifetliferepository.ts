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

    getMe(authorisation: string) : Promise<IUser>;

    getConversations(authorisation: string, order_by: string, limit: number, page: number): Promise<Array<IConversation>>;

    getConversationMessages(authorisation: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Array<IMessage>>;

    replyToConversation(authorisation: string, conversationId: string, message: string): Promise<IMessage>;

    createConversation(authorisation: string, userId: string, subject: string, message: string): Promise<IConversation>;

    setMessageAsRead(authorisation: string, conversationId: string, ids: Array<string>): Promise<any>;

    getFriends(authorisation: string, limit: number, page: number): Promise<Array<IFriend>>;

    getFriendRequests(authorisation: string, limit: number, page: number): Promise<Array<IFriendRequest>>;

    acceptFriendRequest(authorisation: string, friendRequestId: string): Promise<IFriendRequest>;

    deleteFriendRequest(authorisation: string, friendRequestId: string): Promise<IFriendRequest>;

    createFriendRequest(authorisation: string, memberId: string): Promise<IFriendRequest>;

    getProfile(authorisation: string, memberId: string): Promise<IUser>;

    uploadPicture(authorisation, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<any>;
}

export default IFetlifeRepository;
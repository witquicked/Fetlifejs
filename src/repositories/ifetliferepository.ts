import { Response }             from 'node-fetch';

export interface IFetlifeRepository {
    login(username: string, password: string, redirectUri: string): Promise<Response>;
    
    refreshToken(refreshToken: string): Promise<Response>;

    getMe(tokenType: string, accessToken: string) : Promise<Response>;

    getConversations(tokenType: string, accessToken: string): Promise<Response>;
    getConversations(tokenType: string, accessToken: string, limit?: number | undefined, page?: number | undefined): Promise<Response>;
    getConversations(tokenType: string, accessToken: string, limit?: number | undefined, page?: number | undefined, orderBy?: string | undefined): Promise<Response>;

    getConversationMessages(tokenType: string, accessToken: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Response>;

    replyToConversation(tokenType: string, accessToken: string, conversationId: string, message: string): Promise<Response>;

    createConversation(tokenType: string, accessToken: string, userId: string, subject: string, message: string): Promise<Response>;

    setMessageAsRead(tokenType: string, accessToken: string, conversationId: string, ids: Array<string>): Promise<Response>;

    getFriends(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response>;

    getFriendRequests(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response>;

    acceptFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response>;

    deleteFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response>;

    createFriendRequest(tokenType: string, accessToken: string, memberId: string): Promise<Response>;

    getProfile(tokenType: string, accessToken: string, memberId: string): Promise<Response>;

    uploadPicture(tokenType: string, accessToken, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<Response>;
}
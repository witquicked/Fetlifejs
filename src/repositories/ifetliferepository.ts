import { Response }         from "node-fetch";
import { Maybe }            from "../types";

export interface IFetlifeRepository {
    // @POST("/api/oauth/token")
    // Call<Token> login(@Query("client_id") String clientId, @Query("client_secret") String clientSecret, @Query("redirect_uri") String redirectUrl, @Body() AuthBody authBody);
    login(username: string, password: string, redirectUrl?: string): Promise<Response>;


    // @FormUrlEncoded
    // @POST("/api/oauth/token")
    // Call<Token> refreshToken(@Query("client_id") String clientId, @Field("client_secret") String clientSecret, @Field("redirect_uri") String redirectUrl, @Field("grant_type") String grantType, @Field("refresh_token") String refreshToken);
    refreshToken(refreshToken: string, clientId: string, clientSecret: string, redirectUrl?: string): Promise<Response>;

    // @GET("/api/v2/me")
    // Call<User> getMe(@Header("Authorization") String authHeader);
    getMe(authHeader: string): Promise<Response>;

    // @GET("/api/v2/me/conversations")
    // Call<List<Conversation>> getConversations(@Header("Authorization") String authHeader, @Query("order_by") String orderBy, @Query("limit") int limit, @Query("page") int page);
    getConversations(authHeader: string): Promise<Response>;
    getConversations(authHeader: string, orderBy?: Maybe<string>): Promise<Response>;
    getConversations(authHeader: string, orderBy?: Maybe<string>, limit?: Maybe<number>): Promise<Response>;
    getConversations(authHeader: string, orderBy?: Maybe<string>, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response>;

    // @?GET("/api/v2/me/conversations/{conversationId}")
    // Call<Conversation> getConversation(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId);
    getConversation(authHeader: string, conversationId: string): Promise<Response>;

    // @GET("/api/v2/me/friends")
    // Call<List<Friend>> getFriends(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFriends(authHeader: string): Promise<Response>;
    getFriends(authHeader: string, limit?: Maybe<number>): Promise<Response>;
    getFriends(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response>;

    // @GET("/api/v2/me/conversations/{conversationId}/messages")
    // Call<List<Message>> getMessages(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Query("since_id") String sinceMessageId, @Query("until_id") String untilMessageId, @Query("limit") int limit);
    getMessages(authHeader: string, conversationId: string): Promise<Response>;
    getMessages(authHeader: string, conversationId: string, sinceMessageId?: Maybe<string>): Promise<Response>;
    getMessages(authHeader: string, conversationId: string, sinceMessageId?: Maybe<string>, untilMessageId?: Maybe<string>): Promise<Response>;
    getMessages(authHeader: string, conversationId: string, sinceMessageId?: Maybe<string>, untilMessageId?: Maybe<string>, limit?: Maybe<number>): Promise<Response>;

    // @GET("/api/v2/members/{memberId}")
    // Call<Member> getMember(@Header("Authorization") String authHeader, @Path("memberId") String conversationId);
    getMember(authHeader: string, memberId: string): Promise<Response>;

    // @FormUrlEncoded
    // @POST("/api/v2/me/conversations/{conversationId}/messages")
    // Call<Message> postMessage(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("body") String body);
    postMessage(authHeader: string, conversationId: string, body: string): Promise<Response>;

    // @FormUrlEncoded
    // @PUT("/api/v2/me/conversations/{conversationId}/messages/read")
    // Call<ResponseBody> setMessagesRead(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("ids") String[] ids);
    setMessagesRead(authHeader: string, conversationId: string, ids: Array<string>): Promise<Response>;

    // @FormUrlEncoded
    // @POST("/api/v2/me/conversations")
    // Call<Conversation> postConversation(@Header("Authorization") String authHeader, @Field("user_id") String userId, @Field("subject") String subject, @Field("body") String body);
    postConversation(authHeader: string, userId: string, subject: string, body: string): Promise<Response>;

    // @GET("/api/v2/me/friendrequests")
    // Call<List<FriendRequest>> getFriendRequests(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFriendRequests(authHeader: string): Promise<Response>;
    getFriendRequests(authHeader: string, limit?: Maybe<number>): Promise<Response>;
    getFriendRequests(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response>;

    // @PUT("/api/v2/me/friendrequests/{friendRequestId}")
    // Call<FriendRequest> acceptFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
    acceptFriendRequests(authHeader: string, friendRequestId: string): Promise<Response>;

    // @DELETE("/api/v2/me/friendrequests/{friendRequestId}")
    // Call<FriendRequest> removeFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
    removeFriendRequests(authHeader: string, friendRequestId: string): Promise<Response>;

    // @FormUrlEncoded
    // @POST("/api/v2/me/friendrequests")
    // Call<FriendRequest> createFriendRequest(@Header("Authorization") String authHeader, @Field("member_id") String friendId);
    createFriendRequest(authHeader: string, friendId: string): Promise<Response>;

    // @Multipart
    // @POST("/api/v2/me/pictures")
    // Call<ResponseBody> uploadPicture(@Header("Authorization") String authHeader, @Part("picture\"; filename=\"android_app.png\" ") RequestBody picture,  @Part("is_avatar") RequestBody isAvatar, @Part("only_friends") RequestBody friendsOnly, @Part("caption") RequestBody caption, @Part("is_of_or_by_user") RequestBody isFromUser);
    // //TODO: solve dynamic file name
    // //https://github.com/square/retrofit/issues/1063

    // @GET("/api/v2/me/feed")
    // Call<Feed> getFeed(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFeed(authHeader: string);
    getFeed(authHeader: string, limit?: Maybe<number>);
    getFeed(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>);

    // @PUT("/api/v2/me/loves/{content_type}/{content_id}")
    // Call<ResponseBody> putLove(@Header("Authorization") String authHeader, @Path("content_id") String contentId, @Path("content_type") String contentType);
    putLove(authHeader: string, contentId: string, contentType: string);

    // @DELETE("/api/v2/me/loves/{content_type}/{content_id}")
    // Call<ResponseBody> deleteLove(@Header("Authorization") String authHeader, @Path("content_id") String contentId, @Path("content_type") String contentType);
    deleteLove(authHeader: string, contentId: string, contentType: string);

}
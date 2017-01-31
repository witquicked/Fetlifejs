import { IFetlifeRepository }           from "./ifetliferepository";

import { 
    AuthBodyRequest, 
    TokenRefreshRequest,
    LoginRequest,
    CreateConversationRequest 
}                                       from "../requests";

import fetch, { 
    RequestInit, 
    RequestMode, 
    Response }                          from "node-fetch";

import {
    authBodyFactory,
    authorizationFactory,
    refreshTokenFactory
}                                       from "./factories";

import { Maybe }                        from "../types";

const BASE_URL      = "https://fetlife.com/api";
const API_VERSION   = "/v2";
const GRANT_TYPE    = "password";

export class FetlifeRepository implements IFetlifeRepository {    
    private clientId: string;
    private clientSecret: string;

    public constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    // public login(username: string, password: string, redirectUri: string) : Promise<Response> {
    //     const body = <AuthBodyRequest>{
    //         username,
    //         password,
    //         grant_type: GRANT_TYPE
    //     };
        
    //     return fetch(`${BASE_URL}${API_VERSION}/oauth/token?client_id=${this.clientId}&client_secret=${this.clientSecret}`, <RequestInit>{
    //         body: JSON.stringify(body),
    //         method: 'POST'
    //     });
    // }

    // public refreshToken(refreshToken: string): Promise<Response> {
    //     let form = new FormData();
        
    //     form.append('refresh_token', refreshToken);
    //     form.append('client_secret', this.clientSecret);
    //     form.append('redirect_uri', Constants.REDIRECT_URL);
    //     form.append('grant_type', GRANT_TYPE);
        
    //     return fetch(`${BASE_URL}${API_VERSION}/oauth/token?client_id=${this.clientId}`, <RequestInit>{
    //         body: form,
    //         method: 'POST'
    //     });
    // }

    // public getMe(tokenType: string, accessToken: string) : Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public getConversations(tokenType: string, accessToken: string): Promise<Response>;
    // public getConversations(tokenType: string, accessToken: string, limit?: number | undefined, page?: number | undefined): Promise<Response>;
    // public getConversations(tokenType: string, accessToken: string, limit?: number | undefined, page?: number | undefined, orderBy?: string | undefined): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/conversations?order_by=${orderBy}&limit=${limit}&page=${page}`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public getConversationMessages(tokenType: string, accessToken: string, conversationId: string, sinceMessageId: string, untilMessageId: string, limit: number): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/conversations/${conversationId}/messages?since_id=${sinceMessageId}&until_id=${untilMessageId}&limit={limit}`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public replyToConversation(tokenType: string, accessToken: string, conversationId: string, message: string): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/conversations/${conversationId}/messages`, <RequestInit>{
    //         method: 'POST',
    //         headers: { Authorization: `${tokenType} ${accessToken}` },
    //         body: message
    //     });
    // }

    // public createConversation(tokenType: string, accessToken: string, userId: string, subject: string, message: string): Promise<Response> {
    //     const conversation = {
    //         user_id: userId,
    //         subject: subject,
    //         body: message
    //     };
        
    //     return fetch(`${BASE_URL}${API_VERSION}/me/conversations`, <RequestInit>{
    //         method: 'POST',
    //         headers: { Authorization: `${tokenType} ${accessToken}` },
    //         body: JSON.stringify(conversation)
    //     });
    // }

    // public setMessageAsRead(tokenType: string, accessToken: string, conversationId: string, ids: Array<string>): Promise<Response> {
    //     const body = { ids }
        
    //     return fetch(`${BASE_URL}${API_VERSION}/me/conversations/${conversationId}/messages/read`, <RequestInit>{
    //         method: 'PUT',
    //         headers: { Authorization: `${tokenType} ${accessToken}` },
    //         body: JSON.stringify(body)
    //     });
    // }

    // public getFriends(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/friends?limit=${limit}&page=${page}`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public getFriendRequests(tokenType: string, accessToken: string, limit: number, page: number): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/friendrequests?limit=${limit}&page=${page}`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public acceptFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/friendrequests/${friendRequestId}`, <RequestInit>{
    //         method: 'PUT',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public deleteFriendRequest(tokenType: string, accessToken: string, friendRequestId: string): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/me/friendrequests/${friendRequestId}`, <RequestInit>{
    //         method: 'DELETE',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public createFriendRequest(tokenType: string, accessToken: string, memberId: string): Promise<Response> {
    //     const body = { memberId };
        
    //     return fetch(`${BASE_URL}${API_VERSION}/me/friendrequests`, <RequestInit>{
    //         method: 'POST',
    //         headers: { Authorization: `${tokenType} ${accessToken}` },
    //         body: JSON.stringify(body)
    //     });
    // }

    // public getProfile(tokenType: string, accessToken: string, memberId: string): Promise<Response> {
    //     return fetch(`${BASE_URL}${API_VERSION}/members/${memberId}`, <RequestInit>{
    //         method: 'GET',
    //         headers: { Authorization: `${tokenType} ${accessToken}` }
    //     });
    // }

    // public uploadPicture(tokenType: string, accessToken: string, picture: any, isAvatar: boolean, friendsOnly: boolean, caption: string, isFromUser: boolean): Promise<any> {
    //     const body = {
    //         picture,
    //         caption,
    //         is_avatar: isAvatar,
    //         only_friends: friendsOnly,
    //         is_of_or_by_user: isFromUser
    //     };
        
    //     return fetch(`${BASE_URL}${API_VERSION}/me/pictures`, <RequestInit>{
    //         method: 'POST',
    //         headers: { Authorization: `${tokenType} ${accessToken}` },
    //         body: JSON.stringify(body)
    //     });
    // }


    // @POST("/api/oauth/token")
    // Call<Token> login(@Query("client_id") String clientId, @Query("client_secret") String clientSecret, @Query("redirect_uri") String redirectUrl, @Body() AuthBody authBody);
    //login(redirectUrl: string, authBody: AuthBody): Promise<Response>;
    public login(username: string, password: string, redirectUri?: string) : Promise<Response> {
        const body = authBodyFactory(username, password)
        
        return fetch(`${BASE_URL}/oauth/token?client_id=${this.clientId}&client_secret=${this.clientSecret}`, <RequestInit>{
            method: "POST",
            body: JSON.stringify(body)
        });
    }


    // @FormUrlEncoded
    // @POST("/api/oauth/token")
    // Call<Token> refreshToken(@Query("client_id") String clientId, @Field("client_secret") String clientSecret, @Field("redirect_uri") String redirectUrl, @Field("grant_type") String grantType, @Field("refresh_token") String refreshToken);
    refreshToken(refreshToken: string, clientId: string, clientSecret: string, redirectUrl?: string): Promise<Response> {
        const body = refreshTokenFactory(refreshToken, clientSecret, redirectUrl);
        
        return fetch(`${BASE_URL}/oauth/token?client_id=${clientId}`, <RequestInit>{
            method: "POST",
            body: body
        });
    }

    // @GET("/api/v2/me")
    // Call<User> getMe(@Header("Authorization") String authHeader);
    getMe(authHeader: string): Promise<Response> {
        const headers  = authorizationFactory(authHeader);
        
        return fetch(`${BASE_URL}${API_VERSION}/me`, <RequestInit>{
            method: "GET",
            headers: headers
        });
    }

    // @GET("/api/v2/me/conversations")
    // Call<List<Conversation>> getConversations(@Header("Authorization") String authHeader, @Query("order_by") String orderBy, @Query("limit") int limit, @Query("page") int page);
    getConversations(authHeader: string, orderBy?: Maybe<string>, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response> {
        const headers = authorizationFactory(authHeader);
        
        return fetch(`${BASE_URL}${API_VERSION}/me/conversations?order_by=${orderBy}&limit=${limit}&page=${page}`, <RequestInit>{
            method: "GET",
            headers: headers
        }); 
    }

    // @GET("/api/v2/me/conversations/{conversationId}")
    // Call<Conversation> getConversation(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId);
    getConversation(authHeader: string, conversationId: string): Promise<Response>{
        const headers = authorizationFactory(authHeader);
        
        return fetch(`${BASE_URL}${API_VERSION}/me/conversations/${conversationId}`, <RequestInit>{
            method: "GET",
            headers: headers
        });
    }

    // @GET("/api/v2/me/friends")
    // Call<List<Friend>> getFriends(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFriends(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response> {
        const headers = authorizationFactory(authHeader);
        
        return fetch(`${BASE_URL}${API_VERSION}/me/friends?limit=${limit}&page=${page}`, <RequestInit>{
            method: "GET",
            headers: headers
        });
    }

    // @GET("/api/v2/me/conversations/{conversationId}/messages")
    // Call<List<Message>> getMessages(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Query("since_id") String sinceMessageId, @Query("until_id") String untilMessageId, @Query("limit") int limit);
    getMessages(authHeader: string, conversationId: string, sinceMessageId?: Maybe<string>, untilMessageId?: Maybe<string>, limit?: Maybe<number>): Promise<Response> {
        return Promise.reject("");
    }

    // @GET("/api/v2/members/{memberId}")
    // Call<Member> getMember(@Header("Authorization") String authHeader, @Path("memberId") String conversationId);
    getMember(authHeader: string, memberId: string): Promise<Response>{
        return Promise.reject("");
    }

    // @FormUrlEncoded
    // @POST("/api/v2/me/conversations/{conversationId}/messages")
    // Call<Message> postMessage(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("body") String body);
    postMessage(authHeader: string, conversationId: string, body: string): Promise<Response>{
        return Promise.reject("");
    }

    // @FormUrlEncoded
    // @PUT("/api/v2/me/conversations/{conversationId}/messages/read")
    // Call<ResponseBody> setMessagesRead(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("ids") String[] ids);
    setMessagesRead(authHeader: string, conversationId: string, ids: Array<string>): Promise<Response>{
        return Promise.reject("");
    }

    // @FormUrlEncoded
    // @POST("/api/v2/me/conversations")
    // Call<Conversation> postConversation(@Header("Authorization") String authHeader, @Field("user_id") String userId, @Field("subject") String subject, @Field("body") String body);
    postConversation(authHeader: string, userId: string, subject: string, body: string): Promise<Response>{
        return Promise.reject("");
    }

    // @GET("/api/v2/me/friendrequests")
    // Call<List<FriendRequest>> getFriendRequests(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFriendRequests(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>): Promise<Response> {
        return Promise.reject("");
    }

    // @PUT("/api/v2/me/friendrequests/{friendRequestId}")
    // Call<FriendRequest> acceptFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
    acceptFriendRequests(authHeader: string, friendRequestId: string): Promise<Response>{
        return Promise.reject("");
    }

    // @DELETE("/api/v2/me/friendrequests/{friendRequestId}")
    // Call<FriendRequest> removeFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
    removeFriendRequests(authHeader: string, friendRequestId: string): Promise<Response>{
        return Promise.reject("");
    }

    // @FormUrlEncoded
    // @POST("/api/v2/me/friendrequests")
    // Call<FriendRequest> createFriendRequest(@Header("Authorization") String authHeader, @Field("member_id") String friendId);
    createFriendRequest(authHeader: string, friendId: string): Promise<Response>{
        return Promise.reject("");
    }

    // @Multipart
    // @POST("/api/v2/me/pictures")
    // Call<ResponseBody> uploadPicture(@Header("Authorization") String authHeader, @Part("picture\"; filename=\"android_app.png\" ") RequestBody picture,  @Part("is_avatar") RequestBody isAvatar, @Part("only_friends") RequestBody friendsOnly, @Part("caption") RequestBody caption, @Part("is_of_or_by_user") RequestBody isFromUser);
    // //TODO: solve dynamic file name
    // //https://github.com/square/retrofit/issues/1063

    // @GET("/api/v2/me/feed")
    // Call<Feed> getFeed(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
    getFeed(authHeader: string, limit?: Maybe<number>, page?: Maybe<number>) {
        return Promise.reject("");
    }

    // @PUT("/api/v2/me/loves/{content_type}/{content_id}")
    // Call<ResponseBody> putLove(@Header("Authorization") String authHeader, @Path("content_id") String contentId, @Path("content_type") String contentType);
    putLove(authHeader: string, contentId: string, contentType: string) {
        return Promise.reject("");
    }

    // @DELETE("/api/v2/me/loves/{content_type}/{content_id}")
    // Call<ResponseBody> deleteLove(@Header("Authorization") String authHeader, @Path("content_id") String contentId, @Path("content_type") String contentType);
    deleteLove(authHeader: string, contentId: string, contentType: string) {
        return Promise.reject("");
    }
}
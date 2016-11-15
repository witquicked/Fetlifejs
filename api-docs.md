# Fetlife API documentation

## Login
**Verb:** `POST`  
**Path:** `/api/oauth/authorize`  
**Query String:**
 - clientId: `string` (ID referring to the client application)
 - client_secret: `string` (Secret key referring to the client application)
 - redirect_uri: `string` (Uri to be redirected once the login has been successful)  
 
**Body JSON:** `AuthBody` (authentication body)
 - username: `string`
 - password: `string`
 - grant_type: `string` (Always password)

**Code:**
```java
@POST("/api/oauth/token")
Call<Token> login(@Query("client_id") String clientId, @Query("client_secret") String clientSecret, @Query("redirect_uri") String redirectUrl, @Body() AuthBody authBody);
```

## Refresh Authentication Token
**Verb:** `POST`  
**Path:** `/api/oauth/token`  
**Params:**
 - client_id: `string`
 - client_secret: `string`
 - redirect_uri: `string`
 - grant_type: `string`
 - refresh_token: `string`

**Code:**
```java
@FormUrlEncoded
@POST("/api/oauth/token")
Call<Token> refreshToken(@Query("client_id") String clientId, @Field("client_secret") String clientSecret, @Field("redirect_uri") String redirectUrl, @Field("grant_type") String grantType, @Field("refresh_token") String refreshToken);
```

## Get User Profile
**Verb:** `GET`  
**Path:** `/api/v2/me`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/me")
Call<User> getMe(@Header("Authorization") String authHeader);
```

## Get User List of Conversations
**Verb:** `GET`  
**Path:** `/api/v2/me/conversations`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/me/conversations")
Call<List<Conversation>> getConversations(@Header("Authorization") String authHeader, @Query("order_by") String orderBy, @Query("limit") int limit, @Query("page") int page);
```

## Get User List of Friends
**Verb:** `GET`  
**Path:** `/api/v2/me/friends`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/me/friends")
Call<List<Friend>> getFriends(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
```

## Get User Conversation List of Messages
**Verb:** `GET`  
**Path:** `/api/v2/me/conversations/{conversationId}/messages`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/me/conversations/{conversationId}/messages")
Call<List<Message>> getMessages(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Query("since_id") String sinceMessageId, @Query("until_id") String untilMessageId, @Query("limit") int limit);
```

## Get Member Profile
**Verb:** `GET`  
**Path:** `/api/v2/members/{memberId}`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/members/{memberId}")
Call<Member> getMember(@Header("Authorization") String authHeader, @Path("memberId") String conversationId);
```

## Reply to Conversation
**Verb:** `POST`  
**Path:** `/api/v2/me/conversations/{conversationId}/messages`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@FormUrlEncoded
@POST("/api/v2/me/conversations/{conversationId}/messages")
Call<Message> postMessage(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("body") String body);
```

## Set Message as Read
**Verb:** `PUT`  
**Path:** `/api/v2/me/conversations/{conversationId}/messages/read`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@FormUrlEncoded
@PUT("/api/v2/me/conversations/{conversationId}/messages/read")
Call<ResponseBody> setMessagesRead(@Header("Authorization") String authHeader, @Path("conversationId") String conversationId, @Field("ids") String[] ids);
```

## Create Conversation
**Verb:** `POST`  
**Path:** `/api/v2/me/conversations`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@FormUrlEncoded
@POST("/api/v2/me/conversations")
Call<Conversation> postConversation(@Header("Authorization") String authHeader, @Field("user_id") String userId, @Field("subject") String subject, @Field("body") String body);
```

## Get User List of Friend Requests
**Verb:** `GET`  
**Path:** `/api/v2/me/friendrequests`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@GET("/api/v2/me/friendrequests")
Call<List<FriendRequest>> getFriendRequests(@Header("Authorization") String authHeader, @Query("limit") int limit, @Query("page") int page);
```

## Accept Friend Request
**Verb:** `PUT`  
**Path:** `/api/v2/me/friendrequests/{friendRequestId}`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@PUT("/api/v2/me/friendrequests/{friendRequestId}")
Call<FriendRequest> acceptFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
```

## Delete Friend Request
**Verb:** `DELETE`  
**Path:** `/api/v2/me/friendrequests/{friendRequestId}`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@DELETE("/api/v2/me/friendrequests/{friendRequestId}")
Call<FriendRequest> removeFriendRequests(@Header("Authorization") String authHeader, @Path("friendRequestId") String friendRequestId);
```

## Create Friend Request
**Verb:** `POST`  
**Path:** `/api/v2/me/friendrequests`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@FormUrlEncoded
@POST("/api/v2/me/friendrequests")
Call<FriendRequest> createFriendRequest(@Header("Authorization") String authHeader, @Field("member_id") String friendId);
```

## Add Picture to User Album
**Verb:** `GET`  
**Path:** `/api/v2/me/pictures`  
**Headers:**
 - Authorization: `string`

**Code:**
```java
@Multipart
@POST("/api/v2/me/pictures")
Call<ResponseBody> uploadPicture(@Header("Authorization") String authHeader, @Part("picture\"; filename=\"android_app.png\" ") RequestBody picture,  @Part("is_avatar") RequestBody isAvatar, @Part("only_friends") RequestBody friendsOnly, @Part("caption") RequestBody caption, @Part("is_of_or_by_user") RequestBody isFromUser);
//TODO: solve dynamic file name
//https://github.com/square/retrofit/issues/1063
```

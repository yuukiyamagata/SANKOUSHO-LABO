またユニークな値となる項目は重要な項目です。
設計の時点でしっかり考慮しておきましょう。
今回はユニークな項目には (+) というマークをつけることにします。
(id は必ずユニークとなるようにします)

ブックマーク情報
(posts_recommendations)
{
"id": "bookmark1"(①),
"title": "Example site"(②),
"url(+)": "http://example.com",
"createdAt": "2019-07-05T13:11:05.223Z",
"comments": [
{
"id": "comment1",
"comment": "test comment",
"userID(+)": "user1",
"commentedAt": "2019-07-05T13:11:05.223Z",
"stars": ["user2", "user3"]
},
{
"id": "comment2",
"comment": "sample comment",
"userID": "user2",
"commentedAt": "2019-07-06T10:09:19.494Z"
}
]
}

ユーザー情報
(user)
{
"id": "user1",
"authId(+)": "xxxxx",
"name": "userName1",
"gravatarUrl": "email1",
"bookmarks": [
(favorite_post)
{
"bookmarkId": "bookmark1"(①),
"title": "Example site"(②),
"url(+)": "http://example.com",
"comment": "test comment",
"bookmarkedAt": "2019-07-06T10:09:19.494Z"
}
]
}

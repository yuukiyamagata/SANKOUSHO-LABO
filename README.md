# SANKOUSHO LABO
大学受験の参考書に特化した投稿型アプリです。
私がそうだったように一冊の参考書との出会いが、嫌いな勉強を好きになるきっかけとなるかもしれない。そんな体験をさせてくれるような参考書と出会えるきっかけをつくれればという思いでこのアプリを作成しました。

https://user-images.githubusercontent.com/88731483/168116160-77057869-9335-4455-99f9-cab640645db1.mp4

# アプリURL
https://myapp-6affc.web.app/

# 環境構築 
- `node 14.8.3 `
- `npm install`
- `npm run dev`


# 使用技術
- Nuxt.js 2.15.8
- firebase 9.7.0
- @nuxtjs/axios 5.13.6
- vuetify 2.6.1
- 楽天BooksAPI

# 実装機能
- ユーザー新規登録、ログイン(GoogleLogin, 匿名ログイン) 退会機能
- 参考書投稿機能 投稿する参考書の検索用に楽天BooksAPIを使用
-  投稿内容の編集、詳細閲覧、削除機能
- 一覧表示機能 教科別でフィルタリング表示機能つき
- お気に入り登録機能、詳細閲覧、削除機能
- ページネーション機能

# 今後の実装予定機能
- フォローフォロワー機能
- 全文検索機能
- コメント機能

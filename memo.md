## ログイン周り

## 参考URL
Firebase Firebase全般
https://www.youtube.com/watch?v=dHlXQd-xY_w&list=PLvlhfbht1OYK5g7uq_0zLn7Ls4lD4TTVu&index=4&ab_channel=progLearning%E3%80%9C.%E7%88%86%E9%80%9F%E3%81%A7%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%BC%E3%81%AB%E3%81%AA%E3%82%8B%E3%80%9C


ログイン周り
https://firebase.google.com/docs/auth/web/manage-users?hl=ja

Googleログイン参考
https://www.youtube.com/watch?v=LrhYbXOGLZo&t=212s&ab_channel=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB

## やること
Index画面のハートアイコン
ログイン時に既にログイン済みならどうするか


~~~








export default function({
  $firebase, store, state, redirect
})
{
  const isAuthenticated = store.getters['auth/getLoggedIn']
  string.match(/文字列/)の文字列を含むかのチェック
  if(!isAuthenticated && !route.path.match(/\auth\/)){
    // \（バックスラッシュ）で逃している
    redirect('/auth/login')
  }

}


   middleware/authenticatd.js

   // import { getAuth, onAuthStateChanged} from 'firebase/auth'

// export default function({
//   $firebase,
//   store,
//   route,
//   redirect,

// })
// {
//   const auth = getAuth($firebase)
//   if(!store.getters['auth/getLoggedIn']){
//     onAuthStateChanged(auth, user => {
//       if(user){
//         store.dispatch('auth/addUserInfo', user)
//       }else if (!route.path.match(/\/auth\//)){
//         redirect('/auth/login')
//       }
//     })
//   }

// }

Hosting

configあり
Use an existing project

What do you want to use as your public directory?
A, dist

Configure as a single-page-app?
y

Git build
N

デプロイ
firebase serve --only Hosting
公開用ファイルを生成する必要あり

npm run generate
・・・distフォルダ内に必要ファイルが生成

デプロイ
fireabse deploy








## authエラーハンドリング
  // エラー画面へ遷移
  actionに書く dispathで呼ぶ
  errorEmail({ commit }) {
    this.$router.push('errorEmail')
  },

    //パスワード変更メールを送信
  changePassword({ commit }, email) {
    auth.sendPasswordResetEmail(email)
  },




   async signIn({ dispatch, commit }, { email, password }) {
    this.$router.push('signInLoading')
    try {
        const result = await auth.signInWithEmailAndPassword(email, password)
        // dispatch('profile/setUser', result.user, { root: true })
        dispatch('profile/getUser', null, { root: true })

    } catch (error) {
        if (error.code == "auth/wrong-password") {
          alert('パスワードが間違っています。')
        } else if (error.code == "auth/user-not-found") {
          alert('メールアドレスが間違っています。')
        } else {
          alert('ログインできません。')
          dispatch('logout')
        }
        




  <v-container fluid>
        <v-row>
          <v-col
            v-for="book in myFavBooks"
            :key="book.recommendation_book_id"
            cols="8"
            sm="6"
            md="4"
            class="sp-display"
          >
            <v-card
              color="grey lighten-5"
              maxWidth="300px"
              >
              <v-container fluid>
                <v-row noGutters>
                    <v-col cols="6" class="mx-auto">
                      <v-responsive :aspectRatio="16/9">
                        <v-img
                          :src="book.recommendation_book_imageURL"
                        >
                        </v-img>
                      </v-responsive>
                    </v-col>
                  <v-col cols="12">
                    <v-card-title>
                      {{ book.title }}
                    </v-card-title>

                    <v-divider class="mb-4"></v-divider>
                  </v-col>

                  <v-col cols="9">
                      <nuxt-link
                      :to="`/books/${sankousho.recommendation_book_id }`">
                      詳細をみる
                    </nuxt-link>
                  </v-col>

                </v-row>
              </v-container>

            </v-card>

          </v-col>
        </v-row>
    </v-container>




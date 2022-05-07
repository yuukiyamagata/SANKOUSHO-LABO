## やること
Index画面のハートアイコン


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


## Hosting

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


~~~js
middleware/authenticatd.js

import { getAuth, onAuthStateChanged} from 'firebase/auth'

export default function({
  $firebase,
  store,
  route,
  redirect,

})
{
  const auth = getAuth($firebase)
  if(!store.getters['auth/getLoggedIn']){
    onAuthStateChanged(auth, user => {
      if(user){
        store.dispatch('auth/addUserInfo', user)
      }else if (!route.path.match(/\/auth\//)){
            // string.match(/文字列/)の文字列を含むかのチェック
            // \（バックスラッシュ）で逃している
        redirect('/auth/login')
      }
    })
  }

}
~~~













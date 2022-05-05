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



onAuthStateChanged
引数に認証の状態が変わった時に呼び出されるコールバック関数を受け取れる
ログインやログアウトした際に引数の関数がよばれる
ログインした際には 引数にuserのオブジェクトが渡ってくる

ログアウトした際にはにnullが渡ってくくる



~~~js
//ログインしているかどうかの情報を持たせる

import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

// stateの参照はgetters

export const getters = {
  getLoggedIn: state => !!state.isLoggedIn, // !!で真偽値にキャスト
  getUserUid:state => state.userUid,
  getEmail: state => state.email

}

export const mutations = {
  setLoginState( state, loggedIn ){
    state.isLoggedIn = loggedIn
  },
  setUserUid( state, userUid ){
    state.userUid = userUid
  },
  setEmail( state, email ){
    state.email = email
  }
}


export const actions = {
  async login( { commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
    .then( userCredential => {
      // UserCredditanal に色々なデータが入っている
      commit('setLoginState', true)
      commit('setUserUid', userCredential.user.uid)
      commit('setEmail', userCredential.user.email)
      console.log('うまくいきました')
      this.$router.push('/')
    })
    .catch(e => {
      console.error(e)
    })
  },
  async logout( { commit }){
    const auth = getAuth(this.$firebase)
    await signOut(auth)
    .then(() => {
      commit('setLoginState', false)
      commit('setUserUid', '')
      commit('setEmail', '')
      this.$router.push('/auth/login')
      console.log('ログアウト成功')
    })
    .catch(e => {
      console.log(es)
    })
  },
  // addUserInfo({ commit }, payload){
  //   commit('setLoginUser', true)
  //   commit('setUserUId', payload.uid)
  //   commit('setEmial', payload.email)
  // }
}


~~~


ページ表示時

ログインしてるかどうか確認
-> ログインしていればそのまま表示
-> していなければログインページにリダイレクト

ログイン必要な全てのページで確認が必要

middleware 読み込み時に確証状態の確認

vuex 確証状態の保持


input checkBox checkedプロパティ
チェックされた状態であるかどうかを示す値を取得または設定します。
チェックボックスがONの場合 True、そうでなければ False。デフォルト値は False です。

未ログインならリダイレクト
middleware/authenticatd.jsを作成
middlewareはNuxtの機能なのでcontextを使える
pliginは$をつけて取得できる

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
リロードでstateが消える問題について
onAuthStateChanged()を実行
するとログインしているユーザーついての情報が得られる
ログイン状態であればStateに保存してからリダイレクトする

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



ユーザーのプロフィールを取得する
ユーザーのプロフィール情報を取得するには、User のインスタンスのプロパティを使用します。次に例を示します
~~~js
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}
~~~



## ログインユーザーの取得
onAuthStateChangedの説明
引数に認証の状態が変わった時に呼び出されるコールバック関数を受け取れる
ログインやログアウトした際に引数の関数がよばれる
ログインした際には 引数にuserのオブジェクトが渡ってくる

auth.onAuthStateChanged( user => {
  if( user ){
    setLoginUser(user)
    if(this.$router.currentRoute.name === 'Home')
    router.push('/')
  }else {
    this.deleteLoginUser(user)
    this.router.push('/login')
  }
})

ログインによる分岐

state login_user
ログインユーザーが存在する時 v-if

getters {
  userName: : state => state.login_user ? state.login_user.dissplayName : ''
  photoURL: state => state.login_user ? state.login_user.photoURL: '',
  uid: state => state.logiin_user ? state.login_user.uid


}

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
        
    }
  },
  // ログアウト処理
  logout({ commit }) {
    auth.signOut().then(function (result) {
    })
    commit('authCheckLogout')
    commit('profile/logoutReset', null, { root: true })
    commit('posts/logoutReset', null, { root: true })
    commit('getPosts/logoutReset', null, { root: true })
    commit('myPageProfile/logoutReset', null, { root: true })
    this.$router.push('/')
  },
  // ログイン状態にする
  authCheck({ commit }) {
    commit('authCheck')
  }
}


  // Googleでログイン
     async signInWithGoogle(){
      try {
          const auth = getAuth(this.$firebase)
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider)
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user
          console.log('Credential ' + credential)
          console.log('user ' + user)
          console.log(auth.currentUser.photoURL)
          console.log(auth.currentUser.displayName)
          console.log('Googleのサインインが成功しました')
      }catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
      }
    }
  }
  // メールアでレスでログインc



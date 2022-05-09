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











<template>
  <v-container>
    <div>
      <span>現在登録されているメールアドレス：</span>
      <div class="d-inline">
        <div class="my-5">
          {{ email }}
        </div>
        <v-form v-show="!change" style="width: 500px">
          <v-row align="center">
            <v-col cols="10">
          <v-text-field type="text" color="info" label="新しいメールアドレス"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn class="save white--text" @click='changeEmail'>変更</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <v-btn class="save white--text" @click="change = !change">メールアドレスを変更する</v-btn>
    </div>
    <v-divider class="mt-2 mb-6"></v-divider>
    <div>
      <v-btn class="save white--text" @click="passwordReset">パスワードを変更する</v-btn>
      <p class="mt-4">
        現在登録されているメールアドレスにパスワード変更メールが送信されます。
      </p>
    </div>
    <v-divider class="mt-2 mb-6"></v-divider>
    <div>
      <v-btn @click="logOut">ログアウト</v-btn>
      <v-btn @click="unregister" class="red white--text ml-6"
        >退会する</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "navbar",
  middleware: ["checkLogin"],
  data() {
    return {
      email: "",
      change: true,
    };
  },
  methods: {
    changeEmail() {
      const user = this.$auth();
      user
        .updateEmail(this.email)
        .then(function () {
          this.email = "";
          alert("メールアドレスが正常に変更されました。");
        })
        .catch(function (error) {
          alert(
            "メールアドレスが正常に変更されませんでした。もう一度入力し直してください。"
          );
          this.email = "";
        });
    },
    passwordReset() {
      if (
        window.confirm(
          "現在登録されているメールアドレスにパスワード変更のメールを送信しますか？"
        )
      ) {
        const user = this.$fireAuth.currentUser;
        this.$fireAuth
          .sendPasswordResetEmail(user.email)
          .then(function () {
            // Email sent.
            alert("Email sent");
          })
          .catch(function (error) {
            // An error happened.
          });
      }
    },
 
  },
  async created() {
    const user = await this.$auth();
    this.email = user.email;
  },
};
</script>

<style>
</style>



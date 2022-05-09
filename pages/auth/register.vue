<template>
  <div class="py-5">
    <Loading :isLoading="isLoading" />
  <v-card
    class="mx-auto text-center"
    maxWidth="384"
    >
      <v-img
        class="mx-auto"
        height="120"
        width="170"
        :src="image_src"
      />
  <v-form ref="form" v-model="valid">
    <v-card-title>
      <p class="mx-auto font-weight-black pa-0">新規登録</p>
    </v-card-title>


    <v-card-text class="d-flex flex-column mx-auto">
      <v-text-field
        v-model="userName"
        label="ユーザー名"
        placeholder="30文字以内"
        :rules="nameRules"
      />
      <v-text-field
        v-model="email"
        label="メールアドレス"
        placeholder="aaaa@example.com"
        :rules="mailRules"
      />
      <v-text-field
        v-model="password"
        label="パスワード"
        autocomplete="off"
        placeholder="半角英数字8以上"
        :type="isShow ? 'text' : 'password'"
        :rules="passwordRules"
        :appendIcon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="isShow = !isShow"
      />
    </v-card-text>
      <v-card-actions class="pa-0 d-flex flex-column text-center">
        <v-btn
          large
          elevation="1"
          class="mb-4 text-transform-none"
          @click="RegisterWithEmailAndPassword"
        >
        EmailとPassWordでユーザー情報を登録する
      </v-btn>
        <v-btn
          large
          color="primary"
          elevation="0"
          class="mb-4 auth-button-width"
        >
        匿名ユーザーでログインする
      </v-btn>
      </v-card-actions>


    <v-divider class="mx-4"></v-divider>
        <v-form class="mt-4">
          <v-btn
            rounded
            class="mb-6 text-transform-none auth-button-width"
            color="white"
            @click="singInWithGoogle"
          >
          <span>
            <v-img
            height="20px"
            width="20px"
            :src="image_src_google"
            class="mr-4"
            />
          </span>
          Googleアカウントで登録
          </v-btn>
        </v-form>
        <div class="pb-4">
        <span class="text-body-2">すでにアカウントをお持ちの方はこちらから</span>
          <nuxt-link
            color="teal accent-4"
            class="link"
            to="/auth/login"
            >
            ログイン
        </nuxt-link>
        </div>

    </v-form>
  </v-card>
</div>
</template>

<script>
import  Loading  from '@/components/Loading'
export default {
  components:{
    Loading
  },
  layout: 'empty',
  data(){
    return {
      image_src: require('@/static/logo.png'),
      image_src_google: require('@/static/GoogleLogo.png'),
      userName:'',
      email:'',
      password:'',
      isShow: false,
      valid: false,
      isLoading: false,
      nameRules: [
        (v) => !!v || "user name is required",
        (v) => (v && v.length <= 30) || "最大30文字です。",
      ],
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      passwordRules: [
        (v) => !!v || "password is required",
        v => /^[\w-]{8,72}$/.test(v) || '半角英数字8文字以上'],
    }
  },
  methods:{
    validate() {
      this.$refs.form.validate();
    },
    // Emailとパスワードによる新規登録
    RegisterWithEmailAndPassword() {
    this.isLoading = true
    this.$store.dispatch('auth/RegisterWithEmailAndPassword',
    {
      userName: this.userName,
      email: this.email,
      password: this.password
      })
    },
    // Googleで新規登録
    singInWithGoogle(){
      this.$store.dispatch('auth/signInWithGoogle')
    }
  }

}
</script>



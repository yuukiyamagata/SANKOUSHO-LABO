<template>
<div>
  <Loading />
  <v-card
    class="mx-auto text-center flat my-12"
    maxWidth="384"
    color="#fff"
    >
  <v-card-title class="bg-color pa-0">
    <p class="text-center mx-auto pt-4 font-weight-black">ログイン</p>
  </v-card-title>
  <v-card-text>
    <v-form>
      <v-text-field
        v-model="email"
        prependIcon="mdi-email"
        label="メールアドレス" />
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        prependIcon="mdi-lock"
        :appendIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="パスワード"
        @click:append="showPassword = !showPassword"/>
      <v-card-actions class="pa-0 d-flex flex-column text-center">
        <v-btn
          large
          elevation="1"
          class="mb-4 text-transform-none auth-button-width"
          @click="login"
        >
          ログイン
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
      <nuxt-link to="/auth/ResetPassword" class="d-block link">パスワードお忘れの方はこちら</nuxt-link>
    </v-form>
    </v-card-text>

    <v-divider></v-divider>

  <v-form class="my-4">
      <v-btn
        rounded
        class="mb-6"
        color="white"
        style="text-transform: none; width: 85%;"
        @click="loginWithGoogle"
      >
      <span>
        <v-img
        height="20px"
        width="20px"
        :src="image_src_google"
        class="mr-4"
        />
      </span>
      Googleアカウントでログイン
      </v-btn>
  </v-form>
</v-card>

  </div>
</template>



<script>
import  Loading  from '@/components/Loading'
export default {
  components:{
    Loading,
  },
    data(){
    return {
      showPassword: false,
      email: '',
      password: '',
      image_src_google: require('@/static/GoogleLogo.png'),
      isLoading: false,
    }
  },
  methods: {
    login() {
      this.$store.commit('auth/onLoading', true);
      this.$store.dispatch('auth/login',{email: this.email, password: this.password})
    },
    loginWithGoogle() {
      this.$store.dispatch('auth/signInWithGoogle')
    }
  }

}
</script>


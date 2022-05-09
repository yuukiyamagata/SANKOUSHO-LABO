<template>
  <v-container class="mx-auto settings-page-width my-14" fluid>
      <v-form ref="form" v-model="valid" class="mb-4">
        <v-row class="d-flex flex-column justify-space-between">
          <v-col cols="12">
            <p class="text-h6 font-weight-bold">パスワードやメールアドレスの変更をする</p>
            <v-divider class="mb-4"></v-divider>
          </v-col>
          <v-col cols="12">
              <p>現在使用しているメールアドレス: <span class="ml-4">{{ currentEmail }}</span></p>
          </v-col>
          <v-col cols="12" md="9">
            <p class="text-subtitle-1 font-weight-bold">メールアドレスを変更する</p>
            <p class="text-subtitle-2">こちらの入力欄に新しいメールアドレスを入力してください</p>
            <v-text-field
              v-model="newEmail"
              label="新しいメールアドレス"
              dense
              outlined
              placeholder="aaaa@example.com"
              :rules="mailRules"
              color="info"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-btn class="info" elevation="1" @click="updateEmail">このメールアドレスに変更する</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-divider class="my-6"></v-divider>
          <v-col cols="12" md="9">
            <p class="text-subtitle-1 font-weight-bold">パスワードを変更する</p>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="isShow ? 'text' : 'password'"
                :appendIcon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
                label="パスワード"
                @click:append="isShow = !isShow"/>
              <v-btn color="info" elevation="1" @click="resetPassWord">このパスワードに変更する</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="my-6"></v-divider>

      <v-row>
        <v-col cols="9" md="6">
            <v-btn
              color="warning"
              large
              elevation="1"
              @click="withdrawUser"
            >退会する</v-btn>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import { updateEmail, updatePassword, deleteUser } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
export default {
  data(){
    return {
      newEmail:'',
      password: '',
      isShow: false,
      valid: false,
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || "password is required",
        v => /^[\w-]{8,72}$/.test(v) || '半角英数字8文字以上'
      ],
    }
  },
  computed:{
    currentEmail(){
      return this.$store.getters['auth/userEmail']
    },
    uid(){
      return this.$store.getters['userInfo/loginUserInfo'].loginUserUid
    }
  },
  created(){
  },
  methods:{
    confirmAction(text){
      const answer = confirm(text);
      return answer;
    },
    async updateEmail(){
      if(!this.confirmAction('このメールアドレスに変更してもよいですか？')) return
      try{
        await updateEmail(auth.currentUser, this.newEmail);
        alert('メールアドレスが変更されました。');
        this.newEmail = '';
        location.reload();
      }catch(e){
          alert('メールアドレスが変更されませんでした。もう一度入力し直してください。');
          this.newEmail = "";
      }
    },
    async resetPassWord() {
      if(!this.confirmAction('パスワードの変更をしてもよろしいでしょうか？')) return
      const user = auth.currentUser
      try{
        await updatePassword(user, this.password)
        alert('パスワードの変更を完了しました！');
        this.password = '';
        location.reload();
      }catch(error){
        console.error(error);
      }
    },
  async withdrawUser(){
      if(!this.confirmAction('退会してもよろしいですか？')) return
      const user = auth.currentUser;
      const additionalInfo = {
        uid: this.uid,
        message: '退会が完了しました。ユーザーに紐づくデータを全て削除しました。'
      }
      try{
        await deleteUser(user)
        this.$store.dispatch('auth/deleteUser', additionalInfo);
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>


<style lang="scss" scoped>

.settings-page-width {
  max-width: 700px
}

</style>


<template>
  <v-card
    class="mx-auto mt-8"
    max-width="386"
    height="300"
  >
    <v-card-text>
        <p class="text-h6 text--black">
          パスワードの再設定を行います
        </p>
      <p class="font-weight-medium text--black">再設定パスワードを入力してください</p>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="password"
          label="再設定パスワード"
          autocomplete="off"
          placeholder="半角英数字8以上"
          :type="isShow ? 'text' : 'password'"
          :rules="passwordRules"
          :appendIcon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="isShow = !isShow"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="mx-auto">
        <v-btn @click="validate">
          このパスワードで再設定する
        </v-btn>
      </div>
    </v-card-actions>
      </v-card>
</template>

<script>
import { updatePassword } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
export default {
  layout: 'empty',
  data(){
    return{
      password:'',
      isShow: false,
      valid: false,
      passwordRules: [
        (v) => !!v || "password is required",
        v => /^[\w-]{8,72}$/.test(v) || '半角英数字8文字以上'],
    }
  },
  methods:{
    validate(){
      this.$refs.form.validate();
      if(this.valid) this.resetPassWord();
    },
    async resetPassWord() {
      if(!confirm('パスワードの変更をしてもよろしいでしょうか？')) return;
      const user = auth.currentUser;
      try{
        await updatePassword(user, this.password);
        alert('パスワードの変更を完了しました！');
        this.password = '';
        this.$router.push('/auth/login');
      }catch(error){
        console.error(error);
      }
    },
  },
}
</script>


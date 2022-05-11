<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
        >
          <v-card>
            <v-toolbar color="primary" dark>メール確証のお願い</v-toolbar>
            <v-card-text class="pa-8 text-h5 black--text">
                メール確証後ご利用いただけます。<br>
                恐れ入りますが、ご登録のメールアドレス宛に送られた確証メールをご確認ください。
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn @click="sendEmail">確証メールを送信する</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-end">
              <v-btn text @click="closeDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
export default {
  computed:{
    dialog:{
      get(){
        return this.$store.getters['auth/dialog'];
      },
      set(){
        this.$store.commit('auth/changeDialog');
      }
    },
  },
  created(){
    console.log(this.dialog);
  },
  methods:{
    closeDialog(){
      this.$store.commit('auth/changeDialog');
    },
    async sendEmail(){
        const user = auth.currentUser;
        try{
          await sendEmailVerification(user);
        }catch(e){
          alert('送信に失敗しました。再読み込みしてもう一度お試しください。')
        }
    }
  }
}
</script>

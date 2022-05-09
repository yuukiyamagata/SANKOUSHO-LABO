<template>
  <v-container class="mx-auto settings-page-width my-14" fluid>
      <v-form ref="form" v-model="valid" class="mb-4">
        <v-row class="d-flex flex-column justify-space-between">
          <v-col cols="12">
            <p class="text-h6 font-weight-bold">パスワードやメールアドレスの変更をする</p>
            <v-divider class="mb-4"></v-divider>
          </v-col>
          <v-col cols="12">
              <p>現在使用しているメールアドレス: <span class="ml-4">hogehuga@gmial.com</span></p>
          </v-col>
          <v-col cols="12" md="9">
            <p class="text-subtitle-1 font-weight-bold">メールアドレスを変更する</p>
            <p class="text-subtitle-2">こちらの入力欄に新しいメールアドレスを入力してください</p>
            <v-text-field
              v-model="email"
              label="新しいメールアドレス"
              dense
              outlined
              placeholder="aaaa@example.com"
              :rules="mailRules"
              color="info"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-btn class="info" elevation="1">このメールアドレスに変更する</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-divider class="my-6"></v-divider>
          <v-col cols="12" md="9">
            <p class="text-subtitle-1 font-weight-bold">パスワードを変更する</p>
            <v-row>
              <v-col>
                <p class="mb-8">現在ご登録のメールアドレスにパスワード変更メールが送信されます</p>
                <v-btn color="info" elevation="1">パスワードを変更する</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="my-6"></v-divider>

      <v-row>
        <v-col cols="12">
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
export default {
  data(){
    return {
      email:'',
      isShow: false,
      valid: false,
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  created(){
  },
  methods:{
    withdrawUser(){
      const result = confirm('退会してもよろしいですか？')
      if(!result) return
      console.log(result)
    }
  }
}
</script>


<style lang="scss" scoped>

.settings-page-width {
  max-width: 700px
}

</style>


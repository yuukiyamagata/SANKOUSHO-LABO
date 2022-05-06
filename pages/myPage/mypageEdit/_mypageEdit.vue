<template>
  <v-container class="mx-auto edit-myPage-width" fluid>
    <v-row class="d-flex flex-column justify-space-between">
    <v-form ref="form" v-model="valid">
      <v-col cols="12">
        <v-img
            class="logo"
            :src="image_src"
            >
        </v-img>
        <v-divider class="my-4"></v-divider>
      </v-col>
      <v-col cols="12">
        <p class="text-body-1 font-weight-bold">プロフィール編集</p>
        <p class="text-body-2">以下の項目を入力してください</p>
      </v-col>
      <v-col cols="6" class="mb-4">
        <p class="text-caption">アイコン</p>
        <v-avatar class="my-n14">
          <v-img :src="myProfile.iconURL"></v-img>
        </v-avatar>
        <v-btn small class="d-block mt-5" elevation="0">選択</v-btn>

      </v-col>
      <v-col cols="12" md="9">
        <p class="text-caption">ユーザー名</p>
        <v-text-field
            v-model="myProfile.userName"
            class="mt-n4"
            placeholder="ユーザー名を入力"
            dense
            :rules="userNameRules"
            outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="9">
        <p class="text-caption">プロフィール</p>
        <v-textarea
          v-model="myProfile.introduction"
          class="mt-n4"
          placeholder="プロフィールを入力（最大200文字）"
          dense
          outlined
          :rules="introductionRules"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn color="info" small elevation="0" @click="saveEditProfile">保存</v-btn>
          <v-btn class="ml-4"  small elevation="0" @click="goToMyPage">戻る</v-btn>
      </v-col>

    </v-form>

    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  data(){
    return {
      loginUserUid: '',
      image_src: require('@/static/logo.png'),
      valid: false,
      userNameRules: [
        (v) => !!v || "ユーザー名を入力してください",
        (v) => (v && v.length <= 20 ) || "最大20文字です。",
      ],
      introductionRules:[
        (v) => (v && v.length <= 400) || "最大400文字です"
      ],
      myProfile:{
        userName:'',
        introduction: '',
        iconURL: '',
      },
    }
  },
  created(){
    this.loginUserUid = this.$route.params.myPageEdit
    console.log(this.loginUserUid)
    this.myProfile.userName = this.$store.getters['myPageInfo/myProfile'].userName
    this.myProfile.introduction = this.$store.getters['myPageInfo/myProfile'].introduction
    this.myProfile.iconURL = this.$store.getters['myPageInfo/myProfile'].iconURL
  },
  methods:{
    goToMyPage(){
      this.$router.push(`/myPage/${this.loginUserUid}`);
    },
    saveEditProfile(){
      const result = confirm("この内容で保存してもよろしいですか？")
      if(!result) return
      this.$store.dispatch('userInfo/editMyProfile', this.myProfile)
      this.$router.push(`/myPage/${this.loginUserUid}`)
    }
  }
}
</script>


<style lang="scss" scoped>

.edit-myPage-width {
  max-width: 600px
}

</style>





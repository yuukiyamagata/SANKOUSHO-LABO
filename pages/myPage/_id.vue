<template>
  <div class="mx-auto mypage-width mt-12">
    <v-container class="px-12">
      <v-row>
        <v-col cols="9">
            <v-row dense>
              <v-col cols="12">
              <!-- ログインユーザーの画像が入る -->
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <v-avatar size="70" color="primary" class="pt-2">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                        height="200px"
                      ></v-img>
                    </v-avatar>
                    <div class="ml-4">
                      <p class="pt-2" v-text="userName"></p>
                      <v-img :src="image_src" class="twitter-icon-color" height="30px" width="30px"/>
                    </div>
                  </v-col>

                </v-row>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0">
                  <v-card-text v-text="introduction">
                  </v-card-text>
                </v-card>
              </v-col>



            </v-row>

        </v-col>
        <v-col cols="2">
          <v-btn
            color="indigo white--text"
            outlined
            elevation="0"
            @click="goToEditMypage"
            >編集</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <div class="userInfo">
      <v-divider></v-divider>
        <v-tabs>
          <v-tab @click="goToHome">Home</v-tab>
          <v-tab @click="goMyPost">私がおすすめした参考書</v-tab>
          <v-tab @click="goToFav">お気に入りした参考書</v-tab>
      </v-tabs>
      <NuxtChild />
    </div>
  </div>
</template>


<script>

  export default {
    data(){
      return {
        image_src: require('@/static/TwitterLogo.png'),
        mypageUid: '',
      }
    },
    computed:{
      userName(){
        return this.$store.getters["mypageInfo/profileInfo"].userName
      },
      introduction(){
        return this.$store.getters["mypageInfo/profileInfo"].introduction
      }
    },
    created(){
      this.mypageUid = this.$route.params.id
      // プロフィール情報の取得
      this.$store.dispatch("mypageInfo/getUserInfo", this.mypageUid)
    },
    methods:{
      // タブメニューリファクタリング
      goToEditMypage(){
        this.$router.push(`/myPage/mypageEdit/${this.mypageUid}`)
      },
      goToHome(){
        this.$router.push(`/mypage/${this.mypageUid}`)
      },
      goMyPost(){
      this.$router.push(`/mypage/${this.mypageUid}/myPost`)
      },
      goToFav(){
        this.$router.push(`/mypage/${this.mypageUid}/favorite`)
      },
    }
  }
</script>

<style>

.mypage-width {
  max-width: 900px;
}

.twitter-icon-color {
  color: rgba(29,161,242);
}


@media (min-width: 900px){
  .userInfo{
    max-width: 80%;
  }
}

</style>



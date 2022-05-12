<template>
  <div class="mx-auto myPage-width mt-12">
    <v-container class="px-12">
      <v-row>
        <v-col cols="9">
            <v-row dense>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <v-avatar size="70">
                      <v-img
                        :src="iconURL"
                      ></v-img>
                    </v-avatar>
                    <div class="ml-4">
                      <p class="pt-2 text-h5" v-text="userName"></p>
                    </div>
                  </v-col>

                </v-row>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0">
                  <v-card-title>About me</v-card-title>
                  <v-card-text class="font-weight-bold pa-2" v-text="introduction">
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>

        </v-col>
        <v-col cols="2">
          <v-btn
            v-if="isLoggedIn && isMySelf"
            outlined
            elevation="0"
            @click="goToEditMyPage"
            >編集</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <div class="userInfo">
      <v-divider></v-divider>
        <v-tabs>
        <v-tab
          v-if="isLoggedIn && isMySelf"
          @click="goToMyHome"
        >
          Home
        </v-tab>
        <v-tab
          v-for="tab in tabMenu"
          :key="tab.tabText"
          @click="changeTabMenu(tab.link)"
          >
            {{ tab.tabText }}
        </v-tab>
      </v-tabs>
      <NuxtChild
        class="mt-6"
        :isLoggedIn="isLoggedIn"
        :myPageUid="myPageUid"
        :isMySelf="isMySelf"
        />
    </div>
  </div>
</template>


<script>

  export default {
    data(){
      return {
        tabMenu:[
          {tabText: 'MyPost', link: 'myPost'},
          {tabText: 'favorite', link: 'favorite'},
        ],
        myPageUid: '',
        visitorUid:'',
        isMySelf: false,
      }
    },
    computed:{
      userName(){
        return this.$store.getters['myPage/myProfile'].userName
      },
      introduction(){
        return this.$store.getters['myPage/myProfile'].introduction
      },
      iconURL(){
        return this.$store.getters['myPage/myProfile'].iconURL
      },
      isLoggedIn(){
        return this.$store.getters['auth/isLoggedIn']
      },
    },
    created(){
      this.myPageUid = this.$route.params.id
      this.visitorUid = this.$store.getters['userInfo/user'].userUid;
      this.$store.dispatch('myPage/getUserInfo', this.myPageUid);
      this.$store.dispatch('myPage/initMyPosts');
      this.$store.dispatch('myPage/initMyFavoritePosts');
      this.$store.dispatch('myPage/fetchMyFavoritePosts', this.myPageUid);
      this.$store.dispatch('myPage/fetchMyPosts', this.myPageUid);
      if(this.myPageUid === this.visitorUid){
        this.isMySelf = true;
      }else{
        this.isMySelf = false;
      }
    },
    methods:{
      goToEditMyPage(){
        this.$router.push(`/myPage/myPageEdit/${this.myPageUid}`)
      },
      goToMyHome(){
        this.$router.push(`/myPage/${this.myPageUid}`)
      },
      changeTabMenu(link){
        if(link === 'myPost'){
          this.$router.push(`/myPage/${this.myPageUid}/myPost`);
        }else{
            this.$router.push(`/myPage/${this.myPageUid}/favorite`);
          }
      },
    }
  }
</script>

<style>

.myPage-width {
  max-width: 900px;
}


@media (min-width: 900px){
  .userInfo{
    max-width: 80%;
  }
}

</style>



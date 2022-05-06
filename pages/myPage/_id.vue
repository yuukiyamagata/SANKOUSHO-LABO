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
                      <p>About me</p>
                      <!-- <v-img :src="image_src" class="twitter-icon-color" height="30px" width="30px"/> -->
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
        <v-tab
          v-for="tab in tabMenu"
          :key="tab.tabText"
          @click="changeTabMenu(tab.link)"
          >
            {{ tab.tabText }}
        </v-tab>
      </v-tabs>
      <NuxtChild class="mt-6" />
    </div>
  </div>
</template>


<script>

  export default {
    data(){
      return {
        tabMenu:[
          {tabText: 'Home', link: 'home'},
          {tabText: 'MyPost', link: 'myPost'},
          {tabText: 'favorite', link: 'favorite'},
        ],
        image_src: require("@/static/TwitterLogo.png"),
        myPageUid: '',
        visitorUid:'',
      }
    },
    computed:{
      userName(){
        return this.$store.getters["myPageInfo/myProfile"].userName
      },
      introduction(){
        return this.$store.getters["myPageInfo/myProfile"].introduction
      },
      iconURL(){
        return this.$store.getters["myPageInfo/myProfile"].iconURL
      }
    },
    created(){
      this.myPageUid = this.$route.params.id
      this.visitorUid = this.$store.getters["userInfo/user"]
      this.$store.dispatch("myPageInfo/getUserInfo", this.myPageUid)
    },
    methods:{
      goToEditMypage(){
        this.$router.push(`/myPage/myPageEdit/${this.myPageUid}`)
      },
      changeTabMenu(link){
        switch(link){
          case 'home':
            this.$router.push(`/myPage/${this.myPageUid}`);
            break;
          case 'myPost':
            this.$router.push(`/myPage/${this.myPageUid}/myPost`);
            break;
          case 'favorite':
            this.$router.push(`/myPage/${this.myPageUid}/favorite`);
            break;
        }
      }
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



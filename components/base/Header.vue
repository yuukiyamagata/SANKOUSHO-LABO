<template>
  <div>
    <NavigationList
      ref="navDrawer"
      :isLoggedIn="isLoggedIn"
      @nav-click="navClick"
    />
    <v-app-bar app class="white m-0" clipped-left elevation="1">
      <v-app-bar-nav-icon v-if="isLoggedIn"  @click="drawerChange">
      </v-app-bar-nav-icon>

      <header class="p-0" @click="$router.push('/')">
        <v-img :src="img_src" class="logo" />
        <div class="header-title">SANKOUSYO LABO</div>
      </header>
      <v-spacer></v-spacer>



    <!-- 未ログイン -->
      <nuxt-link to="/auth/login" class="link-border-line-none">
          <span v-if="!isLoggedIn">
            <v-btn
              outlined
              color="indigo"
              class="mr-4">
                ログイン
            </v-btn>
          </span>
      </nuxt-link>
      <nuxt-link to="/auth/register" class="link-border-line-none">
          <span v-if="!isLoggedIn">
            <v-btn
              outlined
              color="teal"
              >
                新規登録
            </v-btn>
          </span>
      </nuxt-link>

      <!-- ログイン済 -->
      <div v-if="isLoggedIn">

        <v-avatar size="53">
          <v-img :src="iconURL" />
        </v-avatar>

        <v-btn
          elevation="0"
          color="indigo"
          class="ml-4 white--text"
          @click="createPost"
          >
          <v-icon small class="mr-2">mdi-pencil</v-icon>
          投稿
        </v-btn>

      </div>


  </v-app-bar>



</div>
</template>

<script>
import NavigationList from '@/components/base/NavigationList.vue';
export default {
  components: {
    NavigationList,
  },
  data() {
    return {
      img_src: require('@/static/logo.png'),
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn'];
    },
    isVerified(){
      return this.$store.getters['userInfo/user'].emailVerified;
    },
    iconURL(){
      return this.$store.getters['userInfo/loginUserInfo'].iconURL;
    },
    uid(){
      return this.$store.getters['userInfo/loginUserInfo'].loginUserUid;
    }
  },
  methods:{
    drawerChange(){
      this.$refs.navDrawer.drawer = !this.$refs.navDrawer.drawer;
    },
    createPost(){
      if(this.isVerified){
        this.$router.push('/posts/create');
      }else{
        console.log('入った')
        this.$store.commit('auth/changeDialog');
      }
    },
    navClick(action){
      if(action === 'settings'){
        this.$router.push('/settings');
      }

      if(action === 'logout'){
        const result = confirm('ログアウトしますか？');
        if(!result) return;
        this.$store.dispatch("auth/logout", 'ログアウトに成功しました');
      }

      if(action === 'goToMyPage'){
        if(this.isVerified){
          this.$router.push(`/myPage/${this.uid}`);
        }else{
          this.$store.commit('auth/changeDialog');
        }
      }

      if(action === 'createPost') this.createPost();
    },
  }

}
</script>

<style lang="scss">

header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;

  & .header-title {
  font-size: 16px;
  margin-left: 6px;
  padding-top: 4%;
}
}



</style>

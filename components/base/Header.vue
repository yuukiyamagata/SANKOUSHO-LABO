<template>
  <div>
    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" clipped app>
        <v-container>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title grey--text text--darken-2">
                Navigation lists
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-list  nav>
            <v-list-item
            v-for="navList in navLists"
            :key="navList.name"
            :to="navList.to"
            @click="navClick(navList.action)"
            >
              <v-list-item-icon>
                <v-icon>{{ navList.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ navList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>

      </v-container>
    </v-navigation-drawer>

    <v-app-bar app class="white m-0" clipped-left elevation="1">
      <v-app-bar-nav-icon v-if="isLoggedIn"  @click="drawer=!drawer">
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
          <v-img :src="iconURL"></v-img>
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
import { auth } from "@/plugins/firebase"
export default {
  data() {
    return {
      drawer: null,
      img_src: require('@/static/logo.png'),
      navLists:[
        {name: 'About Page', icon: 'mdi-book-open-blank-variant', to: '/introduction'},
        {name: 'ホーム', icon: 'mdi-home', to: '/'},
        {name: '投稿', icon: 'mdi-pencil', to: '/posts/create'},
        {name: 'マイページ',icon: 'mdi-account', action: 'goToMyPage'},
        {name: 'ログアウト',icon: 'mdi-logout', action: 'logout'},
        {name: '設定', icon: 'mdi-cogs', action: 'settings'},
      ],
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn']
    },
    iconURL(){
      return this.$store.getters['userInfo/loginUserInfo'].iconURL
    }
  },
  created(){
    const isLoggedIn = this.$store.getters['auth/isLoggedIn']
    if(isLoggedIn){
      const currentUserUid = this.$store.getters['userInfo/user'].userUid
      console.log( currentUserUid )
    }
  },
  methods:{
    navClick(action){

      if(action === 'settings'){
        this.$router.push('/settings')
      }

      if(action === 'logout'){
        const message = 'ログアウトしますか？'
        const result = confirm(message)
        if(!result) return // eslit-disable-line;
        console.log('ログアウト処理へ')
        }

        if(action === 'goToMyPage'){
          const uid = auth.currentUser.uid
          const user = auth.currentUser
          if(user.emailVerified === true){
            this.$router.push(`/mypage/${uid}`)
          }
        }

    },
    createPost(){
      // User情報の確認認可しているかどうか
      this.$router.push('/posts/create')
    }
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

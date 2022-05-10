    <template>
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
    </template>

  <script>
    export default {
      name: 'NavigationList',
      props:{
        isLoggedIn:{
          type: Boolean,
          require: true,
        }
      },
      data(){
        return {
          drawer: null,
          navLists:[
            {name: 'About', icon: 'mdi-book-open-blank-variant', to: '/introduction'},
            {name: 'Home', icon: 'mdi-home', to: '/'},
            {name: '投稿', icon: 'mdi-pencil', action: 'createPost'},
            {name: 'マイページ',icon: 'mdi-account', action: 'goToMyPage'},
            {name: 'ログアウト',icon: 'mdi-logout', action: 'logout'},
            {name: '設定', icon: 'mdi-cog', action: 'settings'},
        ],
      }
    },
    methods:{
      navClick(navListName){
        this.$emit('nav-click', navListName);
      }
    }
  }
    </script>

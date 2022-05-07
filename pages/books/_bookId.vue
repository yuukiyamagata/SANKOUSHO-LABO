<template>
    <div class="book-page-width mx-auto">
      <v-container fluid class="my-10">
        <v-row>
          <v-col cols="4">
            <v-row class="d-flex flex-column mb-6">
                <v-col cols="11" class="ml-auto">
                  <v-responsive
                  :aspect-ration=16/9
                  >
                    <v-img
                      :src="bookDetailInfo.recommendation_book_imageURL"
                      flat
                      contain
                    >
                    </v-img>
                  </v-responsive>
                </v-col>
                <v-col cols="12">
                  <p class="text-center text-sm-h6 text-body-1 font-weight-bold">{{ bookDetailInfo.recommendation_book_title }}</p>
                  <p class="text-center text-body-2">{{ bookDetailInfo.recommendation_book_author }}</p>
                </v-col>
                <v-divider class="mb-4"></v-divider>
                <v-col class="text-center">
                    <v-menu
                      open-on-hover
                      top
                      offsetY
                    >
                  <template #activator="{ on, attrs }">
                      <v-icon color="grey lighten-1" v-bind="attrs" size="30" v-on="on">
                        mdi-cart
                      </v-icon>
                      <span class="d-block">購入</span>
                  </template>

                  <v-list>
                      <v-list-item>
                        <v-list-item-title >
                          <a
                          target="_blank"
                          :href="bookDetailInfo.recommendation_book_itemURL"
                          class="link-border-line-none">
                          楽天サイトで見てみる
                          </a>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="7">
            <v-sheet elevation="1" tile>
              <v-card elevation="0">
                <v-card-title class='text-h6 font-weight-black'>Comment</v-card-title>
                    <v-sheet
                    elevation="0"
                    class="mx-auto"
                    >
                    <v-list-item threeLine>
                        <v-list-item-avatar
                          size="56"
                          color="primary"
                        >
                        <v-img :src="bookDetailInfo.iconURL"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <div  class="text-overline mb-4">
                            @{{ bookDetailInfo.post_user_name }}
                          </div>
                        </v-list-item-content>
                      </v-list-item>

                    <v-card-text>
                      {{ bookDetailInfo.recommendation_book_reason }}
                    </v-card-text>
                    <v-card-actions class="pb-6">
                      <v-row align="center">
                        <v-btn
                        text
                        color="indigo accent-4"
                        class="mb-4"
                        @click="$router.push('/')"
                        >
                        一覧へ戻る
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          v-if="!isRegistered"
                          class="mr-4"
                          fab
                          dark
                          color="indigo"
                          small
                          @click="registerFavPost"
                          >
                            <v-icon dark size="20" >
                              mdi-plus
                            </v-icon>
                          </v-btn>

                          <v-icon v-else x-large left color="yellow">
                            mdi-star
                          </v-icon>
                      </v-row>
                    </v-card-actions>


                    </v-sheet>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>


        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500"
          >

          <v-card class="mx-auto">
            <v-card-title class="text-h5 indigo white--text font-weight-bold text-center">
              新規登録・ログインのお願い
            </v-card-title>

            <v-card-text class="font-weight-bold pa-8">
                お気に入りに登録するには、アカウントの新規登録、または、ログインが必要です。<br>
                こちらからアカウントの登録及び、ログインをしてください。
            </v-card-text>
            <v-card-actions class="pb-8">
              <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn
                    depressed
                    color="primary"
                    class="mr-4"
                    @click="goToLogin"
                  >
                    ログイン
                  </v-btn>
                  <v-btn
                    class="white--text"
                    depressed
                    color="teal"
                    @click="goToRegister"
                  >
                    新規登録
                  </v-btn>
                </v-row>
            </v-card-actions>


            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                閉じる
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>


  </div>
</template>



<script>
import { collection, serverTimestamp, setDoc, doc  } from "firebase/firestore"
import {  db } from "@/plugins/firebase"
export default {
  data(){
    return{
      bookId:'',
      dialog: false,
    }
  },
  computed:{
    bookDetailInfo(){
      return this.$store.getters['post/recommendationPosts'].find(post => post.recommendation_book_id === this.bookId)
    },
    userInfo(){
      return this.$store.getters['userInfo/user']
    },
    loginUserUid(){
      return this.$store.getters['userInfo/loginUserInfo'].loginUserUid
    },
    isLoggidIn(){
      return this.$store.getters['auth/isLoggedIn']
    },
    isRegistered(){
      const favoritePosts =  this.$store.getters['myPage/myFavoritePosts']
      return favoritePosts.some(favPost => favPost.postedID === this.bookId)
    }
  },
  created(){
    this.bookId = this.$route.params.bookId;
    this.$store.dispatch('myPage/initMyFavoritePosts');
    this.$store.dispatch('myPage/fetchMyFavoritePosts', this.loginUserUid);
  },
  methods:{
  async registerFavPost(){
      const result = window.confirm('お気に入りに登録しますか?')
      if(!result) return
      const favoritePost = {
        post_id:  this.bookDetailInfo.recommendation_book_id,
        posted_book_title: this.bookDetailInfo.recommendation_book_title,
        posted_book_imageURL: this.bookDetailInfo.recommendation_book_imageURL
      }
      const favoriteUser = {
        user_uid: this.loginUserUid,
        created_at: serverTimestamp(),
      }
      const favoritePostRef =  collection(db, "users", this.loginUserUid, "favorite_posts")
      const postCollectionRef = collection(db, "post_recommendations", this.bookId, "favorite_users")
      const favPostDocRef = doc(favoritePostRef, this.bookDetailInfo.recommendation_book_id)
      const favUserDocRef = doc(postCollectionRef, this.bookDetailInfo.post_user_uid)
      try {
        await setDoc(favPostDocRef, favoritePost)
        this.$store.commit('myPage/pushFavPostsRef', favoritePost)
        await setDoc(favUserDocRef, favoriteUser)
      }catch(e){
        console.log(e)
      }
      alert('お気に入りに登録しました')
  },
  goToLogin(){
    this.$router.push('/auth/login');
  },
  goToRegister(){
    this.$router.push('/auth/register');
  }
}
}
</script>

<style scoped lang="scss">

.book-page-width {
  max-width: 900px;
}

</style>




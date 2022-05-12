<template>
<v-container v-if="isLoggedIn && isMySelf" class="mb-4 grey lighten-4">
  <v-card
    class="mx-auto text-center"
    max-width="360"
    flat
    tile
  >

    <div class="book-image" />


    <v-card-title class="my-4 text-h6 font-weight-medium">
      Welcome to SANKOUSHO LABO ! !
    </v-card-title>
    <v-card-subtitle>
      おすすめの参考書を投稿してみよう!
      <nuxt-link
        class="mt-2
            link-border-line-none
            d-block
            font-weight-medium"
            to="/introduction">
        使い方を見てみる
      </nuxt-link>
    </v-card-subtitle>

    <v-card-actions>
        <v-btn
          elevation="0"
          color="indigo"
          class="mx-auto white--text"
          @click="createPost"
          >
          <v-icon small class="mr-2">mdi-pencil</v-icon>
          投稿する
        </v-btn>
    </v-card-actions>

  </v-card>
</v-container>
<v-container v-else class="mb-10">
  <v-row>
  <v-col cols="12">
    <v-card width="400">
      <v-subheader class="text-left">
        @{{ userInfo.userName }}さんは
      </v-subheader>

        <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="myPostsHistory" class="indigo--text">これまで{{ myPostsHistory }}件投稿しました</v-list-item-title>
                <v-list-item-title v-else>まだ投稿していません</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="myFavPostsHistory" class="teal--text">これまで{{ myFavPostsHistory }}件お気に入り登録しました</v-list-item-title>
                <v-list-item-title v-else>お気に入り登録はまだしていません</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-card>
  </v-col>
  </v-row>
</v-container>
</template>



<script>
  export default {
    props:{
      isLoggedIn:{
        type: Boolean,
        require: true,
      },
      isMySelf:{
        type: Boolean,
        require: true,
      },
    },
    computed:{
      myPostsHistory(){
        return this.$store.getters['myPage/myPosts'].length
      },
      myFavPostsHistory(){
        return this.$store.getters['myPage/myFavoritePosts'].length
      },
      userInfo(){
        return this.$store.getters['myPage/myProfile']
      },
    },
    methods:{
      createPost(){
        this.$router.push('/posts/create')
      }
    }
  }
</script>


<style lang="scss">

.book-image{
  height: 200px;
  background-image: url('@/static/logo.png');
  background-size: cover;
}



</style>

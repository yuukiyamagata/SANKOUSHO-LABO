<template>
<v-container class="grey lighten-4 mb-4">
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
            to="@/introduction">
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
</template>



<script>
  export default {
    data(){
      return {

      }
    },
    methods:{
      createPost(){

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

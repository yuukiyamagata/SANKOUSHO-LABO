<template>
  <div id="home" class="bg-main p-8">
    <v-card
      tile
    >
      <v-tabs
        center-active
        right
        background-color="transparent"
        >
        <v-tab
        v-for="subject in subjects"
        :key="subject"
        @click="filterSubject(subject)"
        >{{ subject }}</v-tab>
      </v-tabs>
    </v-card>

    <v-container fluid>
      <h3 class="headline font-weight-medium my-8">Recommended Post</h3>
      <v-row v-if="!noBook">
        <v-col
          v-for="sankousho in postRecommendations"
          :key="sankousho.recommendation_book_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="mx-xs-auto"
          >
            <v-card
              class="card mx-auto"
              width="380"
              router
              flat
              tile
              >
                    <v-img
                      height="200"
                      width="150"
                      :src="sankousho.recommendation_book_imageURL"
                      class="cursor text-center mx-auto"
                      @click="goToDetailPage(sankousho)"
                    >
                    </v-img>

              <v-row no-gutters>
                <v-col cols="2">
                  <v-list-item class="pl-0 mr-4 pt-3" router :to="`/mypage/${sankousho.post_user_uid}`">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        :alt="`${sankousho.iconURL} avatar`"
                          :src="sankousho.iconURL"
                          class="cursor elevation-6"
                          @click="goToProfile"
                      ></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-card-title class="pl-2 pt-3 subtitle-2 font-weight-bold book-title">
                    {{ sankousho.recommendation_book_title }}
                  </v-card-title>

                  <v-card-subtitle class="pl-2 pb-8 body-2">
                    {{ sankousho.recommendation_book_reason | omittedText15}}
                    <nuxt-link :to="`/books/${sankousho.recommendation_book_id}`">
                      続きを読む
                    </nuxt-link>
                  </v-card-subtitle>

                </v-col>
              </v-row>
            </v-card>
        </v-col>
      </v-row>

      <v-row v-if="noBook">
        Sorry....。Not Register this category
      </v-row>



      <!-- <v-row v-if="displayLists.length < 12" class="mb-10" >
        <v-col  class="text-center">
          <v-pagination
            v-model="page"
            :length="length"
            circle
            @input ="pageChange"
          ></v-pagination>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>



<script>

export default {
  filters:{
    omittedText15(text) {
      return text.length > 15 ? text.slice(0, 15) + "…" : text;
    },
  },
  data(){
    // displayListにはブラウザに表示させるデータのみ持たせる
    return{
      page: 1,
      // length:0,
      // displayLists: [],
      pageSize: 12,
      categorySearch: false,
    }
  },
  computed:{
    postRecommendations(){
      if(!this.categorySearch){
        return this.$store.getters["post/recommendationPosts"]
      }else{
        return this.$store.getters["post/filteredRecommendationPosts"]
      }
    },
    // length(){
    //   return Math.ceil(this.postRecommendations.length/this.pageSize)
    // },
    // displayLists(){
    //   return this.postRecommendations.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
    // },
    subjects(){
      return this.$store.getters["post/subjects"]
    },
    noBook(){
      return this.$store.getters["post/noBook"]
    }
  },
  async created(){
    this.$store.dispatch("post/initialize")
    try{
      await this.$store.dispatch("post/getPost")
    }catch( e ){
      console.error( e )
    }
  },
  methods:{
    pageChange( pageNumber ){
    this.displayLists = this.postRecommendations.slice(this.pageSize*( pageNumber  -1), this.pageSize*( pageNumber ));
  },
  goToProfile(){
    console.log('go')
  },
  goToDetailPage(sankousho){
    this.$router.push(`/books/${sankousho.recommendation_book_id }`)
  },
  filterSubject(subject){
    if(subject === "全て"){
      this.categorySearch = false
      return
    }
    this.categorySearch = true
    this.$store.dispatch("post/filterSubject", subject)
    }
  }

}
</script>


<style lang="scss">
.card {
  background: white !important;
}
.book-title  {
  overflow: hidden;
}
</style>


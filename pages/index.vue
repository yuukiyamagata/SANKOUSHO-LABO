<template>
  <div class="bg-main pb-8">
    <v-card tile>
      <v-tabs
        center-active
        background-color="transparent"
        >
        <v-tab
        v-for="subject in subjects"
        :key="subject.id"
        @click="filterSubject(subject.name)"
        >{{ subject.name }}</v-tab>
      </v-tabs>
    </v-card>

    <v-container fluid>
      <h3 class="headline font-weight-medium my-8">Recommended Post</h3>
      <v-row>
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
                  <v-list-item class="pl-0 mr-4 pt-3">
                    <v-list-item-avatar>
                      <v-img
                          :alt="`${sankousho.iconURL} avatar`"
                          :src="sankousho.iconURL"
                          class="cursor elevation-6"
                          @click="goToProfile(sankousho.post_user_uid)"
                      ></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-card-title class="pl-2 pt-3 subtitle-2 font-weight-bold book-title">
                    {{ sankousho.recommendation_book_title }}
                  </v-card-title>

                  <v-card-subtitle class="pl-2 pb-8 body-2">
                    {{ sankousho.recommendation_book_reason | omittedText15 }}
                    <nuxt-link :to="`/books/${sankousho.recommendation_book_id}`">
                      続きを読む
                    </nuxt-link>
                  </v-card-subtitle>

                </v-col>
              </v-row>
            </v-card>
        </v-col>
      </v-row>



      <v-row class="mb-10" >
        <v-col v-show="!categorySearch" class="text-center">
          <v-btn
          v-if="!noData"
          rounded
          class="my-6 px-8"
          color="blue accent-4 white--text"
          @click="morePosts"
          >
          もっと見る
          </v-btn>
          <p v-else>Sorry..., No more Data</p>
        </v-col>
        <v-col v-show="categorySearch" class="text-center">
          <v-btn
          v-if="!noSubjectData"
          rounded
          class="my-6 px-8"
          color="green accent-4 white--text"
          @click="moreFilterPosts"
          >
          もっと見る
          </v-btn>
          <p v-else>Sorry..., No more Data</p>
        </v-col>
      </v-row>
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
  return{
    categorySearch: false,
    currentFilteredSubject: '',
    subjects:[
      {id: 0, name: '全て'},
      {id: 1, name: '英語'},
      {id: 2, name: '数学'},
      {id: 3, name: '現代文,古文,漢文'},
      {id: 4, name: '化学'},
      {id: 5, name: '物理'},
      {id: 6, name: '生物'},
      {id: 7, name: '地学'},
      {id: 8, name: '日本史'},
      {id: 9, name: '世界史'},
      {id: 10, name: '政治経済,倫理'},
    ],
  }
},
computed:{
  postRecommendations(){
      return this.$store.getters['post/recommendationPosts']
  },
  noData(){
      return this.$store.getters['post/noData']
      // 「もっと見る」でデータがない場合「true」存在するなら「false」
    },
  noSubjectData(){
    return this.$store.getters['post/noSubjectData']
    // フィルター検索の「もっと見る」がゼロなら「true」存在するなら「false」
  },
},
created(){
  this.$store.dispatch('post/initialize');
  this.$store.dispatch('post/fetchPosts');
},
methods:{
  goToDetailPage(sankousho){
    this.$router.push(`/books/${sankousho.recommendation_book_id }`)
  },
  goToProfile(id){
    this.$router.push(`/myPage/${id}`)
  },
  filterSubject(subject){
    if(subject === '全て'){
      this.categorySearch = false;
      this.$store.dispatch('post/initialize');
      this.$store.dispatch('post/fetchPosts');
      return;
    }
    this.categorySearch = true;
    this.currentFilteredSubject = subject
    this.$store.dispatch('post/initialize');
    this.$store.dispatch('post/filterSubject', this.currentFilteredSubject);
  },
  morePosts(){
    this.$store.dispatch('post/fetchPosts');
  },
  moreFilterPosts(){
    this.$store.dispatch('post/filterSubject', this.currentFilteredSubject);
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


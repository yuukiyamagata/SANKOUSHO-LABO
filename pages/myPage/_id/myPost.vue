  <template>
  <v-card
    flat
    tile
    class="mx-auto"
  >
    <v-card-title class="pl-2 pt-3 h-3 font-weight-bold">
      My Recommendation Posts
    </v-card-title>
    <v-container fluid>

      <v-row class="mx-auto">
        <v-col
          v-for="myPost in myPosts"
          :key="myPost.postId"
          class="mb-8"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
              max-width="300"
            >
            <v-img
              class="cursor mx-auto"
              height="300"
              max-width="200"
              :src="myPost.postImageURL"
              @click="watchDetail(myPost.postId)"
            >
          </v-img>

            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="subtitle-2 font-weight-bold">
                  {{ myPost.postTitle }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action v-if="isLoggedIn && isMySelf">
                  <v-menu top>
                    <template #activator="{ on, attrs }">
                        <v-icon color="black lighten-1" v-bind="attrs" size="20" v-on="on">
                          mdi-dots-vertical
                        </v-icon>
                    </template>
                  <v-list>
                    <v-list-item v-for="list in listItems" :key="list.listTitle" class="cursor">
                      <v-list-item-title @click="selectListAction(list.action, myPost.postId)">
                        {{ list.listTitle }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>

            </v-list-item>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
  export default {
    props:{
      isMySelf:{
        type: Boolean,
        required: true,
      },
      isLoggedIn:{
        type: Boolean,
        required: true,
      }
    },
    data: () => ({
      listItems:[
        {listTitle: '投稿を削除する', action: 'deletePost'},
        {listTitle: '詳細を見る', action: 'watchDetail'},
        {listTitle: '編集する', action: 'editMyPost'},
      ]
    }),
    computed:{
      myPosts(){
        return this.$store.getters['myPage/myPosts']
      },
    },
    created(){
    },
    methods: {
      deletePost(id){
        console.log(id)
      },
      watchDetail(id){
        this.$router.push(`/books/${id}`)
      },
      editMyPost(id){
      },
      selectListAction(actionName, id){
        let executeFunc;
        switch(actionName){
          case  "deletePost":
            executeFunc = this.deletePost;
            break;
          case "watchDetail":
            executeFunc = this.watchDetail;
            break;
          case "editMyPost":
            executeFunc = this.editMyPost;
            break;
        }
        executeFunc(id)
      },
    },
  }
</script>


<style>

</style>

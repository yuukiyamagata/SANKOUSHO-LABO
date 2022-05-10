  <template>
  <v-card
    flat
    tile
  >
  <v-card-title class="pl-2 pt-3 h-3 font-weight-bold">
    My FavoritePosts
  </v-card-title>

    <v-container fluid>

      <v-row>
        <v-col
          v-for="favPost in myFavPosts"
          :key="favPost.postedID"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
              max-width="350"
            >
            <v-img
              :src="favPost.postedBooKImageURL"
              max-width="200"
              height="300px"
              class="cursor mx-auto"
            >
            <v-icon
              class="ml-2"
              x-large
              left
              color="yellow"
            >
              mdi-star
            </v-icon>
          </v-img>

            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="subtitle-2 font-weight-bold">
                  {{ favPost.postedBookTitle }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>

                  <v-menu
                      top
                    >
                  <template #activator="{ on, attrs }">
                      <v-icon
                        color="black lighten-1"
                        v-bind="attrs"
                        size="20"
                        v-on="on">
                          mdi-dots-vertical
                      </v-icon>
                  </template>

                  <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          お気に入りから削除する
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          詳細を見る
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
    data(){
      return{

      }
    },
    computed:{
      myFavPosts(){
        return this.$store.getters['myPage/myFavoritePosts'];
      }
    },
    methods: {
    },
  }
</script>


<style>

</style>

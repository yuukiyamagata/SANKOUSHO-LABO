  <template>
  <v-card
    flat
    tile
  >
  <v-card-title class="pl-2 pt-3 h-3 font-weight-bold">
    My FavoritePost
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

              <v-list-item-action v-if="isLoggedIn && isMySelf">
                  <v-menu top>
                    <template #activator="{ on, attrs }">
                        <v-icon color="black lighten-1" v-bind="attrs" size="20" v-on="on">
                          mdi-dots-vertical
                        </v-icon>
                    </template>
                  <v-list>
                    <v-list-item v-for="list in listItems" :key="list.listTitle" class="cursor">
                      <v-list-item-title @click="clickAction(list.action, favPost.postedID)">
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
import { collection, doc,deleteDoc, writeBatch, query, where, getDocs } from '@firebase/firestore';
import { db } from '@/plugins/firebase';
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
    data(){
      return{
      listItems:[
        {listTitle: '投稿を削除する', action: 'deleteFavPost'},
        {listTitle: '詳細を見る', action: 'watchDetail'},
        ],
      }
    },
    computed:{
      myFavPosts(){
        return this.$store.getters['myPage/myFavoritePosts'];
      },
      myPageUid(){
        return this.$store.getters['myPage/myProfile'].myPageUid;
      }
    },
    methods:{
      clickAction(actionName, id){
        if(actionName === 'watchDetail'){
          this.$router.push(`/books/${id}`);
        }else{
          this.deleteFavPost(id);
        }
      },
    async deleteFavPost(favId){
      const result = confirm('削除してもよろしいですか？');
      if(!result) return;
      const favRef = collection(db, "users", this.myPageUid, "favorite_posts");
      const docRef = doc(favRef, favId);
      try{
        await deleteDoc(docRef);
        const batch = writeBatch(db);
        const usersRef = collection(db, "post_recommendations", favId, "favorite_users");
        const favUserQuery = query(usersRef, where("user_uid", "==", this.myPageUid));
        const querySnapShot = await getDocs(favUserQuery);
        querySnapShot.forEach(doc => { batch.delete(doc.ref) } );
        await batch.commit();
        alert('削除に成功しました！')
        location.reload();
      }catch(e){
        console.error(e);
        alert('削除に失敗しました。')
      }
    },
  },
}
</script>


<style>

</style>

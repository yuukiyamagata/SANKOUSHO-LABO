<template>
    <div class="edit-page-width mx-auto">
      <v-container fluid class="my-10">
        <v-row>
          <v-col cols="4">
            <v-row class="d-flex flex-column mb-6">
                <v-col cols="11" class="ml-auto">
                  <v-responsive
                  :aspect-ration=16/9
                  >
                    <v-img
                      :src="editBookDetail.recommendation_book_imageURL"
                      flat
                      contain
                    >
                    </v-img>
                  </v-responsive>
                </v-col>
                <v-col cols="12">
                  <p class="text-center text-sm-h6 text-body-1 font-weight-bold">{{ editBookDetail.recommendation_book_title }}</p>
                  <p class="text-center text-body-2">{{ editBookDetail.recommendation_book_author }} </p>
                </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="7">
            <v-sheet elevation="1" tile>
              <v-card elevation="0">
                <v-card-title class='text-h6 font-weight-black'>投稿編集</v-card-title>
                  <v-sheet
                    elevation="0"
                    class="mx-auto"
                    >
                    <v-list-item three-line>
                        <v-list-item-avatar
                          size="56"
                          color="primary"
                        >
                        <v-img :src="editBookDetail.iconURL"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <div  class="text-overline mb-4">
                            @{{ editBookDetail.post_user_name }}
                          </div>
                        </v-list-item-content>
                      </v-list-item>

                      <v-textarea
                        v-model="editBookDetail.recommendation_book_reason"
                        color="orange orange-darken-4"
                        label="こちらで編集できます"
                      ></v-textarea>
                      <div class="d-flex justify-space-between">
                        <v-btn
                          class="mb-4 ml-4"
                          dark
                          color="orange darken-2"
                          @click="previewEditPost"
                          >
                          プレビュー
                          </v-btn>
                          <v-btn
                            class="mb-4 mr-4"
                            dark
                            color="indigo darken-2"
                            @click="postEditedBook"
                            >
                            編集を反映する
                          </v-btn>
                      </div>
                  </v-sheet>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <PreviewModal
          ref="modal"
          :bookInfo="editBookDetail"
          @close-modal="closeModal"
        />

      </v-container>
  </div>
</template>



<script>
import {collection, getDoc, doc, serverTimestamp, updateDoc  } from 'firebase/firestore'
import { db } from '@/plugins/firebase';
import PreviewModal from '@/components/previewModal';
export default {
  components: {
    PreviewModal,
  },
  data(){
    return {
      editBookId: '',
      editBookDetail:{},
    };
  },
  async created() {
      this.editBookId = this.$route.params.id;
      const docRef = doc(collection(db, "post_recommendations"), this.editBookId);
      try{
        const docSnap = await getDoc(docRef)
        this.editBookDetail = docSnap.data();
      }catch(e){
        console.error(e);
      }
  },
  methods: {
    previewEditPost() {
        this.$refs.modal.dialog = true;
    },
    closeModal(){
      this.$refs.modal.dialog = false;
    },
    async postEditedBook(){
      const result = confirm('この内容で投稿してもよろしいですか？');
      if(!result) return;
      const docRef = doc(collection(db, "post_recommendations"), this.editBookId);
      try{
        await updateDoc(docRef, {
          created_at: serverTimestamp(),
          recommendation_book_reason: this.editBookDetail.recommendation_book_reason
        })
        alert('投稿に成功しました。');
        this.$router.push('/');
      }catch(e){
        console.error(e);
        alert('投稿に失敗しました。');
      }

    }
  }
}
</script>

<style scoped lang="scss">

.edit-page-width {
  max-width: 900px;
}

</style>


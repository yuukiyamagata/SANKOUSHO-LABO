<template>
<div class="text-center">
    <v-dialog v-model="dialog">
      <div class="book-page-width mx-auto">
        <v-container fluid class="my-10" style="background-color: white;">
          <v-row>
            <v-col cols="12" md="7" class="mx-auto text-center">
              <p class="text-h6 font-weight-bold">この内容で投稿します</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-row class="d-flex flex-column mb-6">
                  <v-col cols="11" class="ml-auto">
                    <v-responsive
                    :aspect-ration=16/9
                    >
                      <v-img
                        :src="bookInfo.recommendation_book_imageURL"
                        flat
                        contain
                      >
                      </v-img>
                    </v-responsive>
                  </v-col>
                  <v-col cols="12">
                    <p class="text-center text-sm-h6 text-body-1 font-weight-bold">{{ bookInfo.recommendation_book_title }}</p>
                    <p class="text-center text-body-2">{{ bookInfo.recommendation_book_author }}</p>
                  </v-col>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="7">
              <v-sheet elevation="1" tile>
                <v-card elevation="1">
                  <v-card-title class='text-h6 font-weight-black'>Comment</v-card-title>
                    <v-sheet
                      elevation="0"
                      class="mx-auto"
                      >
                      <v-list-item three-line>
                          <v-list-item-avatar
                            size="56"
                            color="primary"
                          >
                          <v-img :src="bookInfo.iconURL"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <div  class="text-overline mb-4">
                              @{{ bookInfo.post_user_name }}
                            </div>
                          </v-list-item-content>
                        </v-list-item>

                      <v-card-text>
                        {{ bookInfo.recommendation_book_reason }}
                      </v-card-text>
                      <v-card-actions class="pb-6">
                        <v-row>
                          <v-col>
                            <v-btn
                              color="primary"
                              @click="closeModal">
                              閉じる
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-sheet>
                </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-dialog>
  </div>
</template>



<script>
export default {
  name: 'PreviewModal',
  props:{
    bookInfo:{
      type: Object,
      default(){
        return{
          bookInfo: '',
        }
      }
    },
  },
  data(){
    return{
      dialog:'',
    }
  },
  methods:{
    closeModal(){
      this.$emit('close-modal');
    }
  }
}
</script>

<style scoped lang="scss">

.book-page-width {
  max-width: 900px;
}

</style>




<template>
  <v-row class="white mx-auto d-flex flex-column create-page-width mb-10">

    <v-col cols="12" sm="12" class="mb-4">
      <p class="text-h4 font-weight-bold text-center mt-4">参考書の投稿</p>
    </v-col>
    <v-col>
      <v-form ref="form" v-model="valid">
        <nuxt-link to="/introduce#howToPost" class="mb-6 d-block">
          作成方法はこちらから
        </nuxt-link>
        <v-row>
          <v-col class="form-width" cols="12" sm="12">
          <v-row>
            <v-col cols="10" sm="8" md="10">
              <v-text-field
                v-model="searchWord"
                label="参考書の検索"
                placeholder="検索ワードを入力してください"
                dense
                appendIcon="mdi-magnify"
              >
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" sm="4" md="2">
              <v-btn color="teal" outlined @click="search">検索</v-btn>
            </v-col>
          </v-row>
            <v-text-field
              v-model="sankousho.title"
              label="参考書タイトル"
              placeholder="(例) チャート式数学"
              :rules="titleRules"
            ></v-text-field>
            <v-text-field
              v-model="sankousho.author"
              label="著者・出版社"
              placeholder="(例) 数研出版"
              :rules="authorOrPublisherNameRules"
            ></v-text-field>
            <v-textarea
              v-model="sankousho.reason"
              dense
              label="参考書おすすめ理由"
              placeholder="(例) これを7周やったら偏差値15上がった!!"
              height="200"
              :rules="reasonRules"
            ></v-textarea>
            <v-select
              v-model="sankousho.category"
              :items="subjects"
              label="カテゴリー"
              dense
              :rules="sankousyoCategoryRules"
            >
            </v-select>
            <div class="mb-6 pt-4">
              <v-img
                :src="image_src_noImage"
                class="mx-auto displayImage"
              >
              </v-img>
            </div>
            <div class="btn-wrapper pt-8">
              <v-row class="d-flex flex-row-reverse">
                <v-btn color="indigo" outlined class="ml-4"  @click="postBook">投稿</v-btn>
                <v-btn outlined sm>プレビュー</v-btn>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-col>

  <v-dialog
      v-model="dialog"
      scrollable
      transition="dialog-top-transition"
      width="600px"
      >

    <v-card>
        <v-card-title>お勧めする参考書を選択してください</v-card-title>
        <v-divider></v-divider>
        <v-card-text>

        <v-container>
          <v-row justify="center" align="center">
            <v-col
              v-for="result in serachResults"
              :key="result.id"
              cols="12">
                  <v-card
                    class="mx-auto"
                    maxWidth="280"
                    align="center"
                    >
                  <div>
                      <v-img
                        :src="result.imageUrl"
                        class="img-fit"
                        />
                  </div>
                  <v-card-title>
                      {{ result.title }}
                      <div class="text-subtitle-1">著者:{{ result.author }}</div>
                    </v-card-title>

                    <v-card-actions>
                      <v-btn
                        color="orange lighten-2"
                        text
                        @click="selectBook(result)"
                      >
                        選択
                      </v-btn>
                    </v-card-actions>
                  </v-card>

              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
            >
            Close
          </v-btn>
      </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
import axios from 'axios'
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/plugins/firebase.js'
export default {
  data(){
    return {
      searchWord: '',
      serachResults:[],
      image_src_noImage: require('@/static/NoImage.png'),
      valid: false,
      // データベースに登録
      sankousho:{
        title: '',
        category: '',
        reason: '',
        author: '',
        imageUrl: '',
        itemUrl: '',
      },
    // バリデーションルール
      titleRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 40) || "最大40文字です。",
      ],
      reasonRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 300) || "最大300文字です。",
      ],
      sankousyoCategoryRules: [(v) => !!v || "必須項目です。"],
      authorOrPublisherNameRules: [(v) =>(v && v.length <= 20) || "必須項目です。また最大20文字です。"],
      subjects:[
        '数学',
        '英語',
        '現代文,古文,漢文',
        '化学',
        '物理',
        '生物',
        '地学',
        '日本史',
        '世界史',
        '地理',
        '政治経済,倫理',
      ],
        dialog: false,
    }
  },
  created(){
    // ここでログインユーザのIDを取得する
    // まずログインしているのかどうか
    // ログインユーザーのデータをstoreから取ってくる
  },
  methods:{
    // 検索結果０件の処理を書く
    async search(){
      if(!this.searchWord){
        alert('検索キーワードを入力してください')
        return
      }
      const baseUrl ='https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?';
      const appId = "1089430002983138325"
      const encodeString = encodeURI(this.searchWord);
      const requestURL = baseUrl
        + "&format=json"
        + "&title=" + encodeString
        + "&booksGenreId=001"// 書籍限定
        + "&applicationId=" + appId
        + "&page=1"
        + "&outOfStockFlag=1"
        + "&formatVersion=1" // jsonで返ってくる
        try{
          const response = await axios.get(requestURL).then(response => response.data);
            this.dialog = true;
            response.Items.forEach(book => {
              const title = book.Item.title
              const author = book.Item.author
              const publisherName = book.Item.publisherName
              const imageUrl = book.Item.largeImageUrl
              const itemUrl = book.Item.itemUrl
              const id = this.serachResults.length + 1

              this.serachResults.push({
                id,
                title,
                author: author ? author: publisherName, // eslint-disable-line
                imageUrl,
                itemUrl,
              })
            })

          if(response === undefined){
            throw new "データの取得に失敗しました"
          }
          }catch( error ){
            alert(error);
          }
    },
    selectBook( item ){
      this.sankousho.title = item.title
      this.sankousho.author = item.author
      this.sankousho.imageUrl = item.imageUrl ? item.imageUrl : this.image_src_noImage // eslint-disable-line
      this.image_src_noImage = this.sankousho.imageUrl
      this.sankousho.itemUrl = item.itemUrl

      this.dialog = false
      this.serachResults = [];
    },
    closeDialog(){
      this.dialog = false
      this.serachResults = []
    },
    async postBook(){
      const message = 'この内容で投稿してもよろしいでしょうか?'
      const result = window.confirm(message);
      if(!result) return // eslint-disable-line
        try {
          const postRef = doc(collection(db, "post_recommendations"))
          const bookData = {
            recommendation_book_title: this.sankousho.title,
            recommendation_book_category: this.sankousho.category,
            recommendation_book_imageURL: this.sankousho.imageUrl,
            recommendation_book_id: postRef.id,
            recommendation_book_itemURL:this.sankousho.itemUrl,
            recommendation_book_reason: this.sankousho.reason,
            recommendation_book_author: this.sankousho.author,
            created_at: serverTimestamp(),
            post_user_name: 'Yuuki',
            post_user_uid: '5dOB0RSHBVO5r0rwEDvbeJE4xm53',
            iconURL: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
          }
          await setDoc(postRef, bookData)
          alert('投稿に成功しました！')
        }catch( error ){
          console.error ( error )
        }
        this.sankousho = {
          title: '',
          category: '',
          reason: '',
          author: '',
          imageUrl: '',
          itemUrl: '',
        }
        this.searchWord = ''
        this.image_src_noImage = require('@/static/NoImage.png')
        this.$router.push('/')
      },
  },
};
</script>

<style>
  .create-page-width {
    max-width: 600px;
  }

  .form-width {
    width:80%;
    margin: 0 auto;
  }


  .img-fit {
    object-fit: cover;
    height: 200px;
    width: 140px;
  }

.displayImage{
  object-fit: cover;
  width: 200px;
  height: 270px;
  border: 1px solid black;
}
</style>


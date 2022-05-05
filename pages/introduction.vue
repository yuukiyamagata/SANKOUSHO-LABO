<template>
  <div class="introduction-contents">
    <div class="hero">
      <div class="message__container">
        <div class="message__contents">
          <h2>The Best Reference Book to you is here!!</h2>
          <p>まだ知らない自分にとって最高の参考書を探しにいこう！</p>
          <div class="message__image">
            <img src="~assets/img/topImage.png" alt="人と本の画像">
          </div>
        </div>
      </div>
      <div class="image-container">
        <img
        width="300"
        height="300"
        src="~assets/img/topImage.png" alt="人と本の画像">
      </div>
    </div>

    <div class="introduction">
      <section class="explanation">
      <h1>SANKOUSHO LABO とは</h1>
      <p class="explanation__contents">
      「自分が使ってよかった、自分にとっての最高の参考書」を他の人にも共有したい！と言う思いと,「自分がどんな参考書を使えばよいかわからない」、「購入前にどんな参考書か、実際に使った実体験から知りたい」という思いをマッチングさせる<span style="color: blue">「参考書」特化型シェアリングSNSです。</span>
      </p>
      </section>

    <section class="feature">
      <h1>主な特徴</h1>
      <p class="feature__contents">
      「おすすめしたい参考書」をTwitterのつぶやきのような感覚で投稿できます。
      投稿された内容はタイムライン上で表示され閲覧できます。また、自分が気に入った参考書をお気に入りに登録できます。コメント機能やフォロー機能も随時実装予定です。
      </p>
    </section>

    <section id="howToPost" class="howToPost">
      <h1>投稿の仕方</h1>
      <div class="howToPost__contents">
        <p>
          アカウント作成終了後、ログインをしたのち画面右上の投稿するボタンをクリックします。
        </p>
        <p>
          投稿フォームに<span style="color: red">以下の必須項目を入力し</span>投稿ボタンを押すと投稿されます。
        </p>

        <ul>
          <li>参考書タイトル(40文字以内)</li>
          <li>著者・出版社名(いずれかを入力。20文字以内)</li>
          <li>参考書おすすめ理由(300文字以内)</li>
          <li>カテゴリー選択(数学・英語・理科・社会・現代文)</li>
          <li class="font-weight-bold">※おすすめの使い方: 参考書検索欄にキーワードを入力すると、そのキーワードに一致した検索結果が表示され、その項目を選択すると必須項目の入力が自動で行われます</li>
        </ul>

      </div>
      </section>

        <nuxt-link v-if="!isLoggedIn" to="/auth/register" class="link-border-line-none">
          <div class="btn">
            新規登録はこちらから
          </div>
        </nuxt-link>

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLoggedIn: false
    }
  },
  created(){
    this.isLoggedIn = this.$store.getters['auth/isLoggedIn']
  }
}
</script>


<style lang="scss">

.introduction-contents {
  max-width: 1000px !important;
  margin: 0 auto 32px;
}

  ul {
  list-style-type: none;

  & li {
      padding: 4px;
      position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: .5em;
      left: -1.5em;
      width: 10px;
      height: 5px;
      border-left: 2px solid #25AF01;
      border-bottom: 2px solid #25AF01;
      transform: rotate(-45deg);
    }
  }
}


.btn {
  width: 200px;
  height: 50px;
  border: 1px solid teal;
  text-align: center;
  margin: 24px auto;
  padding: 8px 0;
  border-radius: 7px;
  cursor: pointer;
  color: teal;
}

.btn:hover {
  opacity: 0.5;
}

/* .hero */
.hero {
  background-color: ghostwhite;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & img {
      vertical-align: bottom;
    }

  & .message__contents {
      padding: 16px;
      display: inline-block;
      box-shadow: 0 2px 5px #ccc;
      background-color: #fff;
      border-radius: 5px;

        & .message__image {
          display: none;
        }
    }
}

/* .introduction */

.introduction section + section {
  margin-top: 48px;
}

.introduction section:nth-child(even) {
  background-color: ghostwhite;
}

  .introduction section {
    padding: 16px;
    box-shadow: 0 2px 5px #ccc;
    border-radius: 5px;


      & h1 {
        padding: 32px 0;
        color: indigo;
        text-align: center;
        }

      & p {
        line-height: 2rem;
        }

  }






@media screen and (max-width: 880px){

  .image-container{
    display: none;
  }

  .message__container{
      width: 100%;

      .message__contents {
        display: block;
        margin: 0 auto;

        .message__image {
          display: block;
          text-align: center;

            img{
              object-fit: cover;
              height: 200px;
              width: 200px;
          }
        }
      }
    }
}
</style>

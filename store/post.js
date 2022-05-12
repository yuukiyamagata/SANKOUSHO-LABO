import { collection, query, orderBy, getDocs, where, startAfter, limit } from 'firebase/firestore'
import { db } from '@/plugins/firebase';

let lastVisible = '';
let categoryLastVisible = '';

export const state = () => ({
  recommendationPosts: [],
  noData: false,
  noSubjectData: false,
})

export const getters = {
  recommendationPosts: state => state.recommendationPosts,
  noData: state => state.noData,
  noSubjectData: state => state.noSubjectData,
}

export const mutations = {
  initialize(state){
    state.recommendationPosts = [];
    state.noData = false;
    state.noSubjectData = false;
    lastVisible = '';
    categoryLastVisible = '';
  },
  pushPosts(state, posts) {
    state.recommendationPosts.push(posts)
  },
  noData(state){
    state.noData = true;
    // 「もっと見る」のデータが存在しない場合「true」存在する場合「false」
  },
  noSubjectData(state){
    state.noSubjectData = true;
    // フィルター検索の「もっと見る」のデータが存在しない場合「true」存在する場合「false」
  },
  logoutReset(state){
    state.noData = false;
    state.noSubjectData = false;
    lastVisible = '';
    categoryLastVisible = '';
  }
}

export const actions = {
  initialize( { commit }){
    commit('initialize') // 読み込み時の初期化処理
  },
  async fetchPosts({ commit }){
    const postRef = collection(db, "post_recommendations")
    const postQuery = query(
      postRef,
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(12)
    );
    // 作成日時順、最新十件のquery
      try {
        const querySnapshot = await getDocs(postQuery);
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        if(!lastVisible) commit('noData');
        querySnapshot.forEach(doc => {
          commit('pushPosts', doc.data())
        })
      }catch( e ){
        console.error(e)
        alert('データの取得に失敗しました。');
      }
    },
  async filterSubject( { commit }, subject){
      const postRef = collection(db, "post_recommendations")
      const subjectQuery = query(
            postRef,
            where("recommendation_book_category","==", subject),
            orderBy("created_at", "desc"),
            startAfter(categoryLastVisible),
            limit(12)
          )
      try{
          const querySnapshot = await getDocs(subjectQuery);
          categoryLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          if(!categoryLastVisible){
            commit('noSubjectData');
            return;
          }
          querySnapshot.forEach(doc => {commit('pushPosts', doc.data());})
      }catch(e){
        console.error(e)
      }
    },
  logoutReset({ commit }){
    commit("logoutReset")
  }
}



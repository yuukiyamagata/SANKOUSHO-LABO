import { collection, query,orderBy, getDocs, where } from 'firebase/firestore'
import { db } from '@/plugins/firebase';

export const state = () => ({
  subjects:[
    '全て',
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
  recommendationPosts: null,
  filteredRecommendationPosts: null,
  noBook: false
})

export const getters = {
  recommendationPosts: state => state.recommendationPosts,
  filteredRecommendationPosts : state => state.filteredRecommendationPosts,
  subjects: state => state.subjects,
  noBook: state => state.noBook,
  myFavoritePost: state => state.myFavoritePost
}

export const mutations = {
  initialize(state){
    state.recommendationPosts = null
    state.filteredRecommendationPosts = null
    state.noBook = false
  },
  setPostInfo(state, recommendationPosts) {
    state.recommendationPosts = recommendationPosts
  },
  filterPost(state, filteredRecommendationPosts){
    state.noBook = false
    state.filteredRecommendationPosts = filteredRecommendationPosts
  },
  noBook(state){
    state.noBook = true
  }
}

export const actions = {
  async getPost({ commit }){
    const postRef = collection(db, "post_recommendations")
    const postQuery = query(postRef, orderBy("created_at", "desc"));
    try {
      // 作成日時順に並べるようにqueryを投げる
      const querySnapshot = await getDocs(postQuery);
      const postsData = querySnapshot.docs.map(doc => doc.data())
      commit('setPostInfo', postsData)
      console.log(postsData)
    }catch( e ){
      alert('データの取得に失敗しました')
      location.reload();
    }
  },
  initialize( { commit }){
    // 読み込み時のVuexの初期化処理
    commit('initialize')
  },
  async filterSubject( { commit }, subject){
    const postRef = collection(db, "post_recommendations")
    const subjectQuery = query(postRef, where("recommendation_book_category", "==", subject), orderBy("created_at", "desc"))
    try{
      const querySnapshot = await getDocs(subjectQuery)
      if(!querySnapshot.empty){
        // querySnapshot.emptyはデータがない場合false、存在する場合true
        const filteredSubjects = querySnapshot.docs.map(subject => subject.data());
        commit("filterPost", filteredSubjects)
      }else{
        commit("noBook")
      }
    }catch(e){
      // alert('データの取得に失敗しました')
      // location.reload();
      console.error( e )
    }
  }
}



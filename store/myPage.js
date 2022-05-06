
import { doc, collection, getDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase.js'


export const state = () => ({
  myProfile: {
    userName: '',
    introduction: '',
    myPageUid: '',
    iconURL: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
  },
  myPosts:[],
  myFavoritePosts:[],
})

export const getters = {
  myProfile: state => state.myProfile,
  myPosts: state => state.myPosts,
  myFavoritePosts: state => state.myFavoritePosts,
}

export const mutations = {
  initMyPosts(state){
    state.myPosts = [];
  },
  initMyFavoritePosts(state){
    state.myFavoritePosts = []
  },
  setUserInfo(state, myProfile) {
    state.myProfile.userName = myProfile.userName;
    state.myProfile.introduction = myProfile.introduction;
    state.myProfile.iconURL = myProfile.iconURL;
    state.myProfile.myPageUid = myProfile.uid;
  },
  pushFavPostsRef(state, favPosts){
    state.myFavoritePosts.push({
      postedID: favPosts.post_id,
      postedBookTitle: favPosts.posted_book_title,
      postedBooKImageURL: favPosts.posted_book_imageURL
    })
  },
  editMyPageProfile(state, myPageInfo){
    state.myProfile.userName = myPageInfo.userName;
    state.myProfile.iconURL = myPageInfo.iconURL;
    state.myProfile.introduction = myPageInfo.introduction
  },
  logoutReset(state){
    state.myProfile.userName = '';
    state.myProfile.introduction = '';
    state.myProfile.myPageUid = '';
    state.myProfile.iconURL = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
    state.myFavoritePosts = [];
  },
  }

// プロフィール情報を取得
export const actions = {
  initMyPosts({commit }){
    commit("initMyPosts")
  },
  initMyFavoritePosts({ commit }){
    commit('initMyFavoritePosts')
  },
  async getUserInfo({ commit }, uid) {
    try {
      console.log(uid)
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      commit('setUserInfo', docSnap.data())
    } catch(error) {
      console.error( error )
    }
  },
  async fetchMyFavoritePosts( { commit }, uid){
    try{
      const favPostsRef = collection(db, "users", uid, "favorite_posts")
      const snapShots = await getDoc(favPostsRef)
      if(!snapShots){
        return
      }else{
        snapShots.forEach(doc => {
          commit('pushFavPostsRef', doc.data())
        })
      }
    }catch(e){
      console.log(e)
    }

  },
  editMyPageProfile( { commit }, myPageInfo){
    commit('editMyPageProfile', myPageInfo)
  },
  logoutReset({ commit }){
    commit('logoutReset')
  },
}


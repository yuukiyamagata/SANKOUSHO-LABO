
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/plugins/firebase.js'


export const state = () => ({
  myProfile: {
    userName: '',
    introduction: '',
    myPageUid: '',
    iconURL: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
  myPosts:[],
})

export const getters = {
  myProfile: state => state.myProfile,
  myPosts: state => state.myPosts,
}

export const mutations = {
  setUserInfo(state, myProfile) {
    state.myProfile.userName = myProfile.userName;
    state.myProfile.introduction = myProfile.introduction;
    state.myProfile.iconURL = myProfile.iconURL;
    state.myProfile.myPageUid = myProfile.uid;
  },
  addMyPosts(){
    console.log("aaa")
  },
  logoutReset(state){
    state.myProfile.userName = '';
    state.myProfile.introduction = '';
    state.myProfile.myPageUid = '';
    state.myProfile.iconURL = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
    state.myPosts = [];
  },
  }

// プロフィール情報を取得
export const actions = {
  async getUserInfo({ commit }, uid) {
    try {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      commit('setUserInfo', docSnap.data())
    } catch(error) {
      console.error( error )
    }
  },
  async editMyPage( { commit }, myPageInfo){

  },
  logoutReset({ commit }){
    commit('logoutReset')
  }
}



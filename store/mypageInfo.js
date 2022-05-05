
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/plugins/firebase.js'


export const state = () => ({
  profileInfo: {
    userName: '',
    introduction: '',
    // twitterURL: '',
    iconURL: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
})

export const getters = {
  profileInfo: state => state.profileInfo
}

export const mutations = {
  setUserInfo(state, profileInfo) {
    state.profileInfo.userName = profileInfo.userName;
    state.profileInfo.introduction = profileInfo.introduction;
    state.profileInfo.iconURL = profileInfo.iconURL;
  },

  }

// プロフィール情報を取得
export const actions = {
  async getUserInfo({ commit }, uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef)
      commit('setUserInfo', docSnap.data())
      console.log( docSnap.data() )
    } catch(error) {
      console.error( error )
    }
  },
  async editMyPage( { commit }, myPageInfo){

  }
}



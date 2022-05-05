
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/plugins/firebase.js'


export const state = () => ({
  myProfile: {
    userName: '',
    introduction: '',
    // twitterURL: '',
    iconURL: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  },
})

export const getters = {
  myProfile: state => state.myProfile
}

export const mutations = {
  setUserInfo(state, myProfile) {
    state.myProfile.userName = myProfile.userName;
    state.myProfile.introduction = myProfile.introduction;
    state.myProfile.iconURL = myProfile.iconURL;
  },
  logoutReset(state){
    state.myProfile.userName = '';
    state.myProfile.introduction = '';
    state.myProfile.iconURL = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  }

  }

// プロフィール情報を取得
export const actions = {
  async getUserInfo({ commit }, uid) {
    try {
      const docRef = doc(db, "users", uid)
      console.log( docRef )
      const docSnap = await getDoc(docRef)
      commit('setUserInfo', docSnap.data())
      console.log( docSnap.data() )
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



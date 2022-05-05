import {
        setDoc,
        doc,
        serverTimestamp,
        getDoc
      }from 'firebase/firestore'
import { db } from '@/plugins/firebase'

export const state = () => ({
  user: {
    userName: '',
    userUid: '',
    iconURL: '',
    emailVerified: ''
  },
  // ログインユーザーの情報
  loginUserInfo: {
    userName: '',
    introduction : '',
    iconURL: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    twitterURL: ''
  }
})

export const getters = {
  user: state => state.user,
  loginUserInfo: state => state.loginUserInfo,
}


export const mutations = {
  setUserInfo(state, userInfo){
    state.user.userUid = userInfo.uid, // eslint-disable-line
    state.user.userName = userInfo.displayName,
    state.user.iconURL = userInfo.photoURL
    state.user.emailVerified = userInfo.emailVerified
  },
  fetchUserInfo(state, userData){
    state.loginUserInfo.userName = userData.userName
    state.loginUserInfo.iconURL = userData.iconURL
  },
  logoutReset( state ){
    state.user = {
      uid: '',
      userName: '',
      iconURL: '',
      emailVerified: ''
    }
      state.profile = {
        userName: '',
        iconURL: "https://example.com/jane-q-user/profile.jpg",
      }
  }
}

export const actions = {
  // authのユーザー情報をstateに格納する。
  setUserInfo({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  },
  // user.userUidはAuthIdとする
  async createUser({ getters, dispatch }, isNewUser) {
    const userUid = getters.user.userUid
    try {

      if (isNewUser) {
        // 初回ログインの場合の分岐
        const userDocRef =  doc(db, 'users', userUid)
        // eslint-disable-next-line no-unused-vars
        const documentRef = await setDoc(userDocRef, {
          userName: getters.user.userName,
          iconURL: getters.user.iconURL,
          uid: userUid,
          created_at: serverTimestamp()
          })
          dispatch('fetchUserInfo')
        }else{
          dispatch('fetchUserInfo')
          }

    }catch(error){
        console.error( error.message ) // eslint-disable-line
        throw new Error("ログインに失敗しました")
      }
    },
    async fetchUserInfo({ getters, commit }) {
      const userUid = getters.user.userUid
      try {
        const docRef = doc(db, 'users', userUid)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
        commit('fetchUserInfo', docSnap.data())
      } catch(error) {
          console.log(error)
      }
    },

    logoutReset({ commit }) {
      commit('logoutReset')
    },


  }

import {
        collection,
        setDoc,
        doc,
        serverTimestamp,
        getDoc,
        updateDoc,
        writeBatch,
        query,
        where,
        getDocs,
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
    iconURL: "https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png",
    loginUserUid:'',
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
    state.loginUserInfo.introduction = userData.introduction
    state.loginUserInfo.iconURL = userData.iconURL
    state.loginUserInfo.loginUserUid = userData.uid
  },
  editMyProfile(state, myPageInfo){
    state.loginUserInfo.userName = myPageInfo.userName
    state.loginUserInfo.iconURL = myPageInfo.iconURL
    state.loginUserInfo.introduction = myPageInfo.introduction
  },
  logoutReset(state){
    state.user = {
      userUid: '',
      userName: '',
      iconURL: '',
      emailVerified: ''
    }
    state.loginUserInfo = {
      userName: '',
      loginUserUid:'',
      iconURL: "https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png",
    }
  },
}

export const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('setUserInfo', userInfo)
  },
  async createUser({ getters, dispatch }, isNewUser) {
    const userUid = getters.user.userUid
    try {

      if (isNewUser) {
        // 初回ログインの場合の分岐
        const userDocRef =  doc(db, "users", userUid)
        // eslint-disable-next-line no-unused-vars
        const documentRef = await setDoc(userDocRef, {
          userName: getters.user.userName,
          iconURL: getters.user.iconURL,
          uid: userUid,
          created_at: serverTimestamp()
          })
          dispatch('fetchUserInfo')

        }else {
          dispatch('fetchUserInfo')
        }

      }catch(error){
        alert("ログインに失敗しました");
      }
    },
    async fetchUserInfo({ getters, commit, dispatch }) {
      const userUid = getters.user.userUid
      try {
          const docRef = doc(db, 'users', userUid)
          const docSnap = await getDoc(docRef)
          commit('fetchUserInfo', docSnap.data())
      } catch(error) {
          console.error(error)
      }
    },
    async editMyProfile({ dispatch, getters, commit }, myProfile){
      const uid = getters.loginUserInfo.loginUserUid;
      const userRef = doc(db, "users", uid);
      try {

        await updateDoc(userRef, {
          iconURL: myProfile.iconURL,
          introduction: myProfile.introduction,
          userName: myProfile.userName,
        })
        const batch = writeBatch(db);
        const postsRef = collection(db, "post_recommendations")
        const postQuery = query(postsRef, where("post_user_uid", "==", uid))
        const querySnapShot = await getDocs(postQuery)
        querySnapShot.forEach(doc => {
          batch.update(doc.ref, {
            post_user_name: myProfile.userName,
            iconURL: myProfile.iconURL,
          })
        })
        await batch.commit();
        commit('editMyProfile', myProfile)
        dispatch('myPage/editMyPageProfile', myProfile, { root: true})
        alert('プロフィールを更新しました')
      }catch(error){
        alert("マイページの更新に失敗しました")
      }
    },
    logoutReset({ commit }) {
      commit('logoutReset')
    },


  }

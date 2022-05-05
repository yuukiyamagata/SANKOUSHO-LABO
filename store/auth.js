import {
        createUserWithEmailAndPassword,
        sendEmailVerification,
        updateProfile,
        getAdditionalUserInfo,
        GoogleAuthProvider,
        signInWithPopup,
        signInWithEmailAndPassword,
        signOut
      } from 'firebase/auth'
import { auth } from '@/plugins/firebase'


  export const state = () => ({
    isLoggedIn: false,
  })

  export const getters = {
    isLoggedIn: state => state.isLoggedIn,
  }

  export const mutations = {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
  }

export const actions = {
  // アカウント登録
  async RegisterWithEmailAndPassword({ dispatch }, { userName, email, password }) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(auth.currentUser)
        .then(() => alert('確証メールを送信しました。メールボックスをご確認ください'))
        .then(() => this.$router.push('/'))
        // 初回ログインの確認
        const isNewUser = getAdditionalUserInfo(userCredential).isNewUser

        await updateProfile(userCredential.user, {
          displayName: userName,
          photoURL: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        })
        .then(() => {
          dispatch('userInfo/setUserInfo', userCredential.user, { root: true })
            // ユーザーデータをUsersコレクションに格納する。
            dispatch('userInfo/createUser', isNewUser, { root: true })
          })
          .catch(e => console.log(e) ) // eslint-disable-line

          }catch(error){
            console.log({ 'code': error.code, 'message': error.message }) // eslint-disable-line
            if (error.code === "auth/email-already-in-use") {
              // dispatch('errorEmail')
              alert('既にメールアドレスが使用されています')
            }else {
              alert('新規登録に失敗しました。')
            }
          }
      },
      async signInWithGoogle({ dispatch, commit }){
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider)
            const isNewUser = getAdditionalUserInfo(result).isNewUser;
            dispatch('userInfo/createUser', isNewUser, { root: true })
            alert('Googleのサインインに成功しました')
            this.$router.push('/')
        }catch(error){
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({ 'code': error.code, 'message': error.message, credential }) // eslint-disable-line
            alert('ログインに失敗しました')
        }
      },

        async login( { commit, dispatch }, { email, password}) {
          await signInWithEmailAndPassword(auth, email, password)
          .then( userCredential => {
            commit('setLoginState', true)
            dispatch('userInfo/fetchUserInfo', null, { root: true})
            alert('ログインしました')
            this.$router.push('/')
          })
          .catch(error => {
            if (error.code === "auth/wrong-password") {
              alert('パスワードが間違っています。')
            } else if (error.code === "auth/user-not-found") {
              alert('メールアドレスが間違っています。')
            } else {
              alert('ログインできません。')
            }
          })
      },

      async logout({ commit }) {
        await signOut(auth).then(() => {
          commit('setLoginState', false)
          // commit('userInfo/logoutReset', null, { root: true })
          // commit('post/logoutReset', null, { root: true })
          // commit('getPosts/logoutReset', null, { root: true })
          // commit('myPageInfo.js/logoutReset', null, { root: true })
        })
        .catch(e => {
          console.log(e) // eslint-disable-line
        })
          alert('ログアウトしました')
          this.$router.push('/')
        },
  }



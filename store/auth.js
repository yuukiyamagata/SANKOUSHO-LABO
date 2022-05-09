import {
        createUserWithEmailAndPassword,
        sendEmailVerification,
        updateProfile,
        getAdditionalUserInfo,
        GoogleAuthProvider,
        signInWithPopup,
        signInWithEmailAndPassword,
        sendPasswordResetEmail,
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
  async RegisterWithEmailAndPassword({ dispatch }, { userName, email, password }) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(auth.currentUser)
        const isNewUser = getAdditionalUserInfo(userCredential).isNewUser // 初回ログインの確認
        await updateProfile(userCredential.user, {
          displayName: userName,
          photoURL: "https://cdn.vuetifyjs.com/images/john.jpg"
        })
        dispatch('userInfo/setUserInfo', userCredential.user, { root: true})
        dispatch('userInfo/createUser', isNewUser, { root: true })
        alert('確証メールを送信しました。メールボックスをご確認ください')
        this.$router.push('/')

        }catch(error){
          console.log({ 'code': error.code, 'message': error.message })
          if (error.code === 'auth/email-already-in-use') {
            alert('既にこのメールアドレスは使用されています')
          }else {
            alert('新規登録に失敗しました。')
            dispatch('logout')
          }
        }
      },

      async signInWithGoogle({ dispatch }){
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
          // const userCredentialで受け取って処理をつづける
          .then(userCredential => {
            commit('setLoginState', true)
            dispatch('userInfo/fetchUserInfo', null, { root: true})
            alert('ログインしました')
            this.$router.push('/')
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              alert('パスワードが間違っています。')
            } else if (error.code === 'auth/user-not-found') {
              alert('メールアドレスが間違っています。')
            } else {
              alert('ログインできません。')
              dispatch('logout')
            }
          })
        },

      async resetPassWord(_, email){
        try{
          await sendPasswordResetEmail(auth, email)
        }catch(e){
          alert('メールアドレスの送信に失敗しました。')
        }
      },

      async logout({ commit }) {
        try{
          await signOut(auth)
          commit('setLoginState', false)
          commit('userInfo/logoutReset', null, { root: true })
          commit('post/logoutReset', null, { root: true })
          commit('myPage/logoutReset', null, { root: true })
          alert('ログアウトしました')
          this.$router.push('/')
        }catch(e){
          console.error(e)
        }
    },
  }



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
    userEmail:'',
  })

  export const getters = {
    isLoggedIn: state => state.isLoggedIn,
    userEmail: state => state.userEmail
  }

  export const mutations = {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    setUserEmail(state, email){
      state.userEmail = email
    },
  }

export const actions = {
    async RegisterWithEmailAndPassword({ dispatch, commit }, { userName, email, password }){
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
          commit('setUserEmail', email)
          alert('確証メールを送信しました。メールボックスをご確認ください')
          this.$router.push('/')

          }catch(error){
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
        try{
          await signInWithEmailAndPassword(auth, email, password)
          commit('setUserEmail', email)
          dispatch('userInfo/fetchUserInfo', null, { root: true})
          alert('ログインしました')
          this.$router.push('/')
        }catch(error){
          if (error.code === 'auth/wrong-password') {
            alert('パスワードが間違っています。')
          } else if (error.code === 'auth/user-not-found') {
            alert('メールアドレスが間違っています。')
          } else {
            alert('ログインできません。')
            dispatch('logout')
          }
        }
      },

      async logout({ commit }) {
        try{
          await signOut(auth);
          commit('setLoginState', false);
          commit('setUserEmail', '');
          commit('userInfo/logoutReset', null, { root: true });
          commit('post/logoutReset', null, { root: true });
          commit('myPage/logoutReset', null, { root: true });
          alert('ログアウトしました');
          this.$router.push('/');
        }catch(e){
          console.error(e)
        }
    },

    deleteUser({ commit }){
      commit('setLoginState', false);
      commit('setUserEmail', '');
      commit('userInfo/logoutReset', null, { root: true });
      commit('post/logoutReset', null, { root: true });
      commit('myPage/logoutReset', null, { root: true });
      this.$router.push('/');
    }
  }



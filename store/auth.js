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
import {
        collection,
        doc,
        writeBatch,
        where,
        query,
        getDocs,
        deleteDoc
      } from 'firebase/firestore';
import { auth, db } from '@/plugins/firebase';


  export const state = () => ({
    isLoggedIn: false,
    userEmail:'',
    dialog: false,
  })

  export const getters = {
    isLoggedIn: state => state.isLoggedIn,
    userEmail: state => state.userEmail,
    dialog: state => state.dialog,
  }

  export const mutations = {
    setLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUserEmail(state, email){
      state.userEmail = email;
    },
    changeDialog(state){
      state.dialog = !state.dialog;
    },
    resetDialog(state){
      state.dialog = false;
    }
  }

export const actions = {
    async RegisterWithEmailAndPassword({ dispatch, commit }, { userName, email, password }){
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          await sendEmailVerification(auth.currentUser)
          const isNewUser = getAdditionalUserInfo(userCredential).isNewUser // 初回ログインの確認
          await updateProfile(userCredential.user, {
            displayName: userName,
            photoURL: "https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png"
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
        try{
          const result = await signInWithPopup(auth, provider)
          const isNewUser = getAdditionalUserInfo(result).isNewUser;
          dispatch('userInfo/createUser', isNewUser, { root: true })
          alert('Googleのサインインに成功しました')
          this.$router.push('/')
        }catch(error){
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error({ 'code': error.code, 'message': error.message, credential }) // eslint-disable-line
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

    async logout({ commit }, message ) {
        try{
          await signOut(auth);
          commit('setUserEmail', '');
          commit('setLoginState', false);
          commit('resetDialog');
          commit('userInfo/logoutReset', null, { root: true });
          commit('post/logoutReset', null, { root: true });
          commit('myPage/logoutReset', null, { root: true });
          alert(message);
          this.$router.push('/');
        }catch(error){
          console.error(error)
        }
    },

    async deleteUser({ dispatch }, { uid, message }){
      const usersRef = doc(collection(db, 'users'), uid);
      try{
          await deleteDoc(usersRef)
          const batch = writeBatch(db);
          const postsRef = collection(db, "post_recommendations")
          const postQuery = query(postsRef, where("post_user_uid", "==", uid))
          const querySnapShot = await getDocs(postQuery)
          querySnapShot.forEach(doc => { batch.delete(doc.ref); });
          await batch.commit();
          dispatch('logout', message);
          this.$router.push('/');
      }catch(error){
        console.error(error)
      }
    }

}



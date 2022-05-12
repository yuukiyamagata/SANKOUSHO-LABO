import { onAuthStateChanged } from 'firebase/auth';
import  { auth } from '../plugins/firebase';

export default function({ store, route, redirect }){

  onAuthStateChanged(auth, user => {
    if(user){
      if(user.isAnonymous){
        const anonymousUser = {
          uid: 'RTR0X4tV4bM7aAZ3n2DK',
          displayName: 'テストユーザー',
          photoURL: 'https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png',
          emailVerified: true,
        }
        store.dispatch('userInfo/setUserInfo', anonymousUser);
        store.commit('auth/setLoginState', true);
      }else{
        store.dispatch('userInfo/setUserInfo', user);
        store.commit('auth/setLoginState', true);
      }
    }
  })
}


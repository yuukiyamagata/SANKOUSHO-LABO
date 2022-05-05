import { onAuthStateChanged} from 'firebase/auth'
import  { auth } from '../plugins/firebase';

export default function({ store, route, redirect }){

  onAuthStateChanged(auth, user => {
    if(user){
      store.dispatch('userInfo/setUserInfo', user)
      store.commit('auth/setLoginState', true)
    }
  })
}


import { doc, collection, getDoc, getDocs, where, orderBy, query } from 'firebase/firestore';
import { db } from '@/plugins/firebase.js';


export const state = () => ({
  myProfile: {
    userName: '',
    introduction: '',
    myPageUid: '',
    iconURL: "https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png"
  },
  myPosts:[],
  myFavoritePosts:[],
})

export const getters = {
  myProfile: state => state.myProfile,
  myPosts: state => state.myPosts,
  myFavoritePosts: state => state.myFavoritePosts,
}

export const mutations = {
  initMyPosts(state){
    state.myPosts = [];
  },
  initMyFavoritePosts(state){
    state.myFavoritePosts = []
  },
  setUserInfo(state, myProfile) {
    state.myProfile.userName = myProfile.userName;
    state.myProfile.introduction = myProfile.introduction;
    state.myProfile.iconURL = myProfile.iconURL;
    state.myProfile.myPageUid = myProfile.uid;
  },
  pushMyPosts(state, myPosts){
    state.myPosts.push({
      postId: myPosts.recommendation_book_id,
      postTitle: myPosts.recommendation_book_title,
      postImageURL: myPosts.recommendation_book_imageURL,
    })
  },
  pushFavPostsRef(state, favPosts){
    state.myFavoritePosts.push({
      postedID: favPosts.post_id,
      postedBookTitle: favPosts.posted_book_title,
      postedBooKImageURL: favPosts.posted_book_imageURL
    })
  },
  editMyPageProfile(state, myPageInfo){
    state.myProfile.userName = myPageInfo.userName;
    state.myProfile.iconURL = myPageInfo.iconURL;
    state.myProfile.introduction = myPageInfo.introduction;
  },
  logoutReset(state){
    state.myProfile.userName = '';
    state.myProfile.introduction = '';
    state.myProfile.myPageUid = '';
    state.myProfile.iconURL = "https://user-images.githubusercontent.com/88731483/167774212-a3be4308-42ee-4a7b-89ff-88626929a7c3.png";
    state.myPosts = [];
    state.myFavoritePosts = [];
  },
  }

// プロフィール情報を取得
export const actions = {
  initMyPosts({commit }){
    commit("initMyPosts");
  },
  initMyFavoritePosts({ commit }){
    commit('initMyFavoritePosts');
  },
  async getUserInfo({ commit }, uid) {
    try {
      console.log(uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      commit('setUserInfo', docSnap.data());
    } catch(error) {
      console.error( error );
    }
  },
  async fetchMyPosts({ commit }, uid){
      const postRef = collection(db, "post_recommendations");
      const postQuery = query(postRef, where("post_user_uid", "==", uid), orderBy("created_at", "desc"));
      try{
          const querySnapshot = await getDocs(postQuery)
          querySnapshot.forEach(doc  => {
            commit('pushMyPosts', doc.data());
          })
      }catch(e){
          console.error(e);
      }
  },
  async fetchMyFavoritePosts( { commit }, uid){
    try{
      const favPostsRef = collection(db, "users", uid, "favorite_posts");
      const snapShots = await getDocs(favPostsRef);
      if(!snapShots){
        return
      }else{
        snapShots.forEach(doc => {
          commit('pushFavPostsRef', doc.data());
        })
      }
    }catch(e){
      console.error(e)
    }
  },
  editMyPageProfile( { commit }, myPageInfo){
    commit('editMyPageProfile', myPageInfo);
  },
  logoutReset({ commit }){
    commit('logoutReset');
  },
}


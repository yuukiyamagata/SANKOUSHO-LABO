import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'sankousho-labo'
  })(store)
}


// keyはストレージに保存する時のプロパティ名

// 注意
// ログアウト時に画面のリロードでステートを初期状態にリセットするようにしている場合は、当然リセットは効かなくなる。
// その場合、ログアウトしてもステートはそのままになるため、違うユーザーでログインしても以前のユーザーのステートが残ったままになる。
// ステートをリセットするアクション・ミューテーションを作っておいて、ログアウト時に呼び出す。

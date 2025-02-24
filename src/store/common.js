// 获取本地缓存数据传入state作为初始值
const common = JSON.parse(localStorage.getItem('vuex'))?.common
const { token } = common ? common : {}

export default {
  state: {
    token: token,
    KeepAlive: [], // 需要缓存的页面
    navBarTitle: '', // navbar标题
  },
  mutations: {
    set_token(state, data){
      state.token = data;
    },
    set_navBarTitle(state, data) {
      state.navBarTitle = data;
    },
  },
}
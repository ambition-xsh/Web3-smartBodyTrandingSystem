import { createStore } from 'vuex'
import createPersistedstate  from 'vuex-persistedstate'
import common from './common'
import ma from './modulesA'

export default createStore({
  modules: {
    common,
    ma
  },
  plugins: [
    createPersistedstate({
      // key: 'vuex',// 存数据的key名   自定义的  要有语义化
      // paths: ['ma'], // 需要持久化的模块  单独持久化模块的  如果reducer返回的是部分缓存 则此配置无效 如果只缓存模块则不需要设置reducer
      reducer(val) {
        // return val // 缓存所有的  包括模块内(不需要定义paths)
        return { // 部分缓存
          common: {
            token: val.common.token
          }
        }
      }
    })
  ]
})

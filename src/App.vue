<template>
  <div class="app">
    <SPNavBar :isHidden="isHideNavBar" />

    <router-view v-slot="{ Component }">
      <keep-alive :include="KeepAlive">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- <van-tabbar 
      v-model="tbActive"
      safe-area-inset-bottom
      placeholder
      v-if="showTB">
      <van-tabbar-item 
        v-for="item in tbItem"
        :key="item"
        :icon="item.icon"
        :name="item.name"
        :to="item.path">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script setup>
const route = useRoute()
const vuex = useStore()

// 被缓存的页面
const KeepAlive = computed(() => vuex.state.KeepAlive || [])

// const tbActive = ref('home')
// const tbItem = [
//   {
//     icon: 'home-o',
//     title: '首页',
//     name: 'home',
//     path: '/'
//   },
//   {
//     icon: 'contact',
//     title: '我的',
//     name: 'mine',
//     path: '/mine'
//   }
// ]

// 是否显示tabbar
const showTB = ref()
// 是否隐藏navbar
const isHideNavBar = ref(false)
watchEffect(() => {
  const paths = ['/', '/mine']
  if(paths.includes(route.path)){
    showTB.value = true
  } else {
    showTB.value = false
  }
  
  if(route.meta.hideNB){
    isHideNavBar.value = true
  } else {
    isHideNavBar.value = false
  }
})
</script>

<style lang="scss" scoped>
:root {
  --van-popup-background-color: #2a2a2a;
}
</style>

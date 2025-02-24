<template>
  <van-config-provider :theme-vars="theme" v-if="!isHidden">
    <van-nav-bar
      fixed
      safe-area-inset-top
      :placeholder="!noPlaceholder"
      :title="titleValue"
    >
      <template #left>
        <van-icon name="arrow-left" @click="onClickLeft" v-if="!hideLeftArrow" />
      </template>
      <template #right>
        <slot name="right">
        </slot>
      </template>
    </van-nav-bar>

  </van-config-provider>
</template>

<script>
/**
 * 在router的配置meta中可以增加以下内容配置导航栏
 * bgColor：导航栏背景色
 * textColor：导航栏文字
 * noPlaceholder：导航栏不要占位符，也就是内容会被导航栏盖住
 * hideLeftArrow：隐藏左侧的返回按钮
 */

import { computed, ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
// 二次封装的导航栏
// 可以用于右侧自定义, 背景颜色自定义的导航栏     右侧自定义需要单独导入本组件使用    背景颜色自定义则直接再路由配置中设置bgColor
export default {
  props: {
    isHidden: {
      default: false,
      type: Boolean
    }
  },
  setup(){
    const theme = ref({});
    const defaultTheme = ref({
      'nav-bar-background-color': '',
      'nav-bar-icon-color': '#333',
      'nav-bar-title-text-color': '',
      'nav-bar-arrow-size': '18px'
    });

    const store = useStore();

    const route = useRoute();
    const router = useRouter();

    const onClickLeft = () => {
      router.back()
    }
    
    const titleValue = computed(() => store.state.common.navBarTitle);
    const noPlaceholder = computed(() => route.meta.noPlaceholder);
    const hideLeftArrow = computed(() => route.meta.hideLeftArrow);

    return {
      theme,
      defaultTheme,
      onClickLeft,
      titleValue,
      noPlaceholder,
      hideLeftArrow
    }
  },
  watch: {
    $route: {
      handler(v) {
        const { bgColor, textColor } = v.meta;
        if (bgColor || textColor) {
          this.theme = {
            'nav-bar-background-color': bgColor,
            'nav-bar-icon-color': textColor || '#fff',
            'nav-bar-title-text-color': textColor || '#fff',
            'nav-bar-arrow-size': '18px'
          }
        } else {
          Object.assign(this.theme, this.defaultTheme);
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
.van-hairline--bottom:after{
  border-bottom-width: 0 !important;
}
</style>
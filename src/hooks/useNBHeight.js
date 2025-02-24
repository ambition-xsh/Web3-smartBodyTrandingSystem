import { onMounted, ref } from "vue";

// 获取导航栏高度
export default function () { 
  const height = ref(46)

  onMounted(() => {
    const vnbp = document.getElementsByClassName('van-nav-bar__placeholder')[0]
    vnbp?.clientHeight && (height.value = vnbp?.clientHeight)
  })

  return {
    height
  }
}
// 防抖
export const debounce = (fn, delay = 500) => {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}

// 节流
export const throttle = (fn, delay = 200) => {
  let timer = null;
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay);
  }
}

// 判断运行环境
/**
 * @param {string} env weixin 微信 | alipay 支付宝 | android 安卓 | ios iphone/ipad | 其他的可以按照不同环境加
 * @return {boolean}
*/
export const judgeEnv = (env) => { 
  const userAgent = navigator.userAgent.toLowerCase();
  switch (env) {
    case 'weixin':
      return userAgent.indexOf('micromessenger') !== -1;
    case 'alipay':
      return userAgent.indexOf('alipay') !== -1;
    case 'ios':
      return Boolean(/iphone|ipad|ipod/.test(userAgent));
    case 'android':
      return Boolean(/android/.test(userAgent));
    default:
      return userAgent.indexOf(env) !== -1;
  }
}
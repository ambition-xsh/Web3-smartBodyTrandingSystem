import axios from "axios";
import { Toast } from 'vant';
Toast.allowMultiple();
import vuex from '@/store'

export const service = axios.create({
  timeout: 1000 * 30,
  baseURL: window.apiURL,
});

service.interceptors.request.use(config => {
  let token = vuex.state.common?.token;
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
}, err => Promise.reject(err));

service.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err?.response?.status); // 错误的状态码
  Promise.reject(err);
});

let toastLoading;
// 防止多次请求loading重复加载
let loadingCount = 0;
const addLoadingCount = (loading) => { // loading 为true则不展示加载框
  if (loading) return;
  if (loadingCount == 0) {
    toastLoading = Toast.loading({
      message: '加载中...',
      duration: 30 * 1000
    });
  }
  loadingCount++;
}
const reduceLoadingCount = (loading) => {
  if (loading) return;
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount++;
    setTimeout(() => { // 在某些需要轮询接口或者按顺序请求接口的情况下 则延迟关闭提示
      loadingCount--;
      if (loadingCount <= 0) {
        toastLoading.clear();
      }
    }, 50);
  }
}

export const get = (url, params, loading) => {
  addLoadingCount(loading);
  return new Promise((resolve, reject) => {
    service.get(url, { params }).then(res => {
      resolve(res);
      reduceLoadingCount(loading);
    }).catch(err => {
      reject(err);
      reduceLoadingCount(loading);
    });
  });
}

export const post = (url, data = {}, loading) => {
  addLoadingCount(loading);
  return new Promise((resolve, reject) => {
    service.post(url, data).then(res => {
      resolve(res);
      reduceLoadingCount(loading);
    }).catch(err => {
      reject(err);
      reduceLoadingCount(loading);
    });
  });
}
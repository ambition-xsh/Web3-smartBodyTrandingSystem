import { toRaw } from '@vue/reactivity';
import { service } from '@/api';

// 上传文件和普通的接口请求不同 单独封装
export const Upload = file => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData()
    formdata.append('Category', 0)
    formdata.append('file', toRaw(file).file)
    service.defaults.baseURL = window.apiURL
    service
      .post('/test/UploadImg', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(async res => {
        resolve(res)
      }).catch(err => {
        console.log(err);
        reject(err)
      });
  });
}
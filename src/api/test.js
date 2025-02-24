import { get, post } from './index'
console.log(post);

// 测试请求
export const getRes = data => get('/test/', data);
export const postRes = data => post('/test/', data);

export const getList = data => post('/table', data)
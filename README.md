# vue3-h5-template

## 安装所有依赖
```
yarn
```
## navbar
基于vant navbar封装的公用navbar
关于navbar行为表现的配置在路由配置的meta对象内传入
{
  hideNB: boolean, // 隐藏某个页面navbar
  bgColor: string, // 背景颜色
  textColor: string, // 文本颜色
  noPlaceholder: boolean, // 不需要navbar的占位容器 页面内容将被导航栏盖住一部分
}
### 更改navbar的标题
可通过调用vuex的mutations方法set_navBarTitle设置标题

## 接口请求
封装在文件api/index.js内，抛出两个方法 get和post，test有示例. 
文件上传单独封装在api/upload.js

## vuex
公共的状态放在common模块内
持久化：如果只缓存部分状态，建议以模块名为对象返回 例：return { common: { token: val.common.token } }

## 自动导入
### api
当使用vue、vuex、vue-router相关api则不需要导入. 如果需要添加其它的自动导入，在vue.config.js中添加
### 组件
使用vantui已经按需导入，无需手动在每个组件内导入(新创建组件后需要重新运行项目才会自动导入)
项目自定义组件 在 src/components、 'src/\*/components'、 'src/\*/\*/components'目录下的组件会按需导入，无需手动导入，若需要添加其它文件夹下的组件导入则在vue.config.js中配置

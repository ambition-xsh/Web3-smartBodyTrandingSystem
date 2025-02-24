const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
// 自动按需加载
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = {
  publicPath: "/test",
  outputDir: "dist",
  devServer: {
    open: true,
    port: 9900
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        dirs: ['src/components', 'src/*/components', 'src/*/*/components'], // 按需加载的文件夹
        resolvers: [VantResolver()],
      }),
      // 自动按需加载
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex'], // 自动导入
        eslintrc: {
          enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件,eslintrc中引入
          globalsPropValue: true,
        },
      }),
    ],
  },
}
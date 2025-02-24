/* 需要依赖：lib-flexible、postcss-pxtorem */
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
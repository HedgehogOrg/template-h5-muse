const postcssPxToViewport = require('postcss-px-to-viewport');

const platform = process.env.platform || '';
process.env.VUE_APP_PLATFORM = platform;

module.exports = {
  devServer: {
    open: true,
    quiet: true,
    disableHostCheck: true,
  },
  chainWebpack: config => {
    // 去掉preload prefetch 插件
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config
      .plugin('html')
      .tap(args => {
        const [tmpObj] = args;
        tmpObj.title = platform || 'H5';
        return args;
      });
    // test: 打包不去掉console
    // config.optimization.minimizer('terser').tap(args => {
    //   const [tmpObj] = args;
    //   const option = tmpObj.terserOptions.compress;
    //   option.drop_console = false;
    //   return args;
    // });
  },
  // 需要编译的依赖
  transpileDependencies: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 375,
            viewportHeight: 603,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 0.3,
            mediaQuery: true,
          }),
        ],
      },
    },
  },
};

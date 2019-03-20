module.exports = {
  baseUrl: '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: {
    sourceMap: true,
  },
  configureWebpack: (config) => {
    const wpConfig = {};
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
      wpConfig.devtool = 'eval-source-map';
    }
    return wpConfig;
  },
};

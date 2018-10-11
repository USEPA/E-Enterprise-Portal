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
  configureWebpack: {
    devtool: 'eval-source-map',
  },
  devServer: {
    port: 8082,
  },
};

module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  runtimeCompiler: false,
  productionSourceMap: false,
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

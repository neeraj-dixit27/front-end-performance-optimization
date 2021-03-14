const webpack = require("webpack");
const BundleAnalyzer = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const webpackCommonConfig = require("./webpack.common.config");

const {
  devEnv,
  soureMapType,
  splitChunkVendorRoute,
  chunksType,
  appTitle,
  templatePath,
  outputHtmlFileName,
  analyzerMode,
  testExpressions,
  outputDevImgFormat,
  outputDevFontFormat,
  outputDevJsFileName,
  outputDevJsChunkName,
  inlineImgLimit,
  buildPath,
  outputDevCssFilename,
} = require("./webpack.constants");

// Dev module rules
const devRules = [
  {
    test: testExpressions.imagesExp,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          name: outputDevImgFormat,
          // Inline files smaller than inlineImgLimit
          limit: inlineImgLimit,
        },
      },
      {
        loader: require.resolve("image-webpack-loader"),
        options: {
          // Disable to speed build time in development
          disable: true,
        },
      },
    ],
  },
  {
    test: testExpressions.svgImgExp,
    use: [
      {
        loader: require.resolve("svg-url-loader"),
        options: {
          name: outputDevImgFormat,
          // Inline files smaller than inlineImgLimit
          limit: inlineImgLimit,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
      },
      {
        loader: require.resolve("image-webpack-loader"),
        options: {
          // Disable to speed build time in development
          disable: true,
        },
      },
    ],
  },
  {
    test: testExpressions.fontsExp,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          name: outputDevFontFormat,
        },
      },
    ],
  },
];

// Dev plugins
const devPlugins = [
  new MiniCssExtractPlugin({
    filename: outputDevCssFilename,
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(devEnv),
    __ENV__: JSON.stringify(devEnv),
  }),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzer.BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode,
  }),
  new HtmlWebpackPlugin({
    title: appTitle,
    template: templatePath,
    filename: outputHtmlFileName,
    alwaysWriteToDisk: true,
    // Fix for https://github.com/jantimon/html-webpack-plugin/issues/981
    chunksSortMode: "none",
  }),
  new HtmlWebpackHarddiskPlugin(),
];

// Webpack Dev config
const webpackDevConfig = {
  ...webpackCommonConfig,
  entry: "./src/index.js",
  output: {
    filename: outputDevJsFileName,
    path: buildPath,
    chunkFilename: outputDevJsChunkName,
    publicPath: "/",
  },
  mode: devEnv,
  devtool: soureMapType,
  module: {
    rules: [...webpackCommonConfig.module.rules, ...devRules],
  },
  plugins: [...webpackCommonConfig.plugins, ...devPlugins],
  optimization: {
    namedModules: true,
    runtimeChunk: true,
    // Code Split configuration
    splitChunks: {
      cacheGroups: {
        // vendor chunk
        vendor: {
          // import file path containing node_modules
          test: splitChunkVendorRoute,
          // async + sync chunks
          chunks: chunksType,
        },
      },
    },
  },
};

module.exports = webpackDevConfig;

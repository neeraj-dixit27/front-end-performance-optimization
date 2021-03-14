const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const webpack = require("webpack");

const webpackCommonConfig = require("./webpack.common.config");
const {
  splitChunkVendorRoute,
  chunkType,
  prodEnv,
  appTitle,
  templatePath,
  outputHtmlFileName,
  testExpressions,
  outputProdImgFormat,
  outputProdFontFormat,
  outputProdJsChunkName,
  outputProdJsFileName,
  inlineImgLimit,
  buildPath,
  outputProdCssFilename,
} = require("./webpack.constants");

// Prod module rules
const prodRules = [
  {
    test: testExpressions.imagesExp,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          name: outputProdImgFormat,
          limit: inlineImgLimit,
        },
      },
      {
        loader: require.resolve("image-webpack-loader"),
      },
    ],
  },
  {
    test: testExpressions.svgImgExp,
    use: [
      {
        loader: require.resolve("svg-url-loader"),
        options: {
          name: outputProdImgFormat,
          limit: inlineImgLimit,
          noquotes: true,
        },
      },
      {
        loader: require.resolve("image-webpack-loader"),
      },
    ],
  },
  {
    test: testExpressions.fontsExp,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          name: outputProdFontFormat,
        },
      },
    ],
  },
];

// Prod plugins
const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: outputProdCssFilename,
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(prodEnv),
    __ENV__: JSON.stringify(prodEnv),
  }),
  new HtmlWebpackPlugin({
    title: appTitle,
    template: templatePath,
    filename: outputHtmlFileName,
    alwaysWriteToDisk: true,
    chunksSortMode: "none",
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new HtmlWebpackHarddiskPlugin(),
];

// Webpack Prod config
const webpackProdConfig = {
  ...webpackCommonConfig,
  entry: "./src/index.js",
  output: {
    filename: outputProdJsFileName,
    path: buildPath,
    chunkFilename: outputProdJsChunkName,
    publicPath: "/",
  },
  plugins: [...webpackCommonConfig.plugins, ...prodPlugins],
  mode: prodEnv,
  devtool: false,
  module: {
    rules: [...webpackCommonConfig.module.rules, ...prodRules],
  },
  optimization: {
    namedModules: true,
    runtimeChunk: true,
    minimizer: [
      // CSS minification
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
      // Javascript minification
      new TerserPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    // To split code into several bundles
    splitChunks: {
      cacheGroups: {
        // vendor chunk
        vendor: {
          // import file path containing node_modules
          test: splitChunkVendorRoute,
          // async + sync chunks
          chunks: chunkType,
        },
      },
    },
  },
};

module.exports = webpackProdConfig;

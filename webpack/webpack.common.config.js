const path = require("path");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

const {
  testExpressions,
  webpackCacheDir,
  excludeNodeModules,
  nodeModulesDir,
  excludeWarnings,
  defaultExtensions,
} = require("./webpack.constants");

// webpack common rules
const commonRules = [
  {
    test: testExpressions.jsFilesExp,
    exclude: excludeNodeModules,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: path.resolve(__dirname, webpackCacheDir),
        },
      },
    ].filter(Boolean),
  },
  {
    test: testExpressions.cssExp,
    include: nodeModulesDir,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
      },
    ],
  },
  {
    test: testExpressions.cssExp,
    exclude: nodeModulesDir,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[sha1:hash:hex:6]',
        },
      },
    ],
  },
  {
    test: testExpressions.lessExp,
    include: nodeModulesDir,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
      },
      {
        loader: require.resolve("less-loader"),
        options: { javascriptEnabled: true },
      },
    ],
  },
  {
    test: testExpressions.lessExp,
    exclude: nodeModulesDir,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[sha1:hash:hex:6]',
        },
      },
      {
        loader: require.resolve("less-loader"),
        options: { javascriptEnabled: true },
      },
    ],
  },
  {
    test: testExpressions.htmlExp,
    loader: require.resolve("raw-loader"),
  },
];

// common webpack config;
const webpackCommonConfig = {
  resolve: {
    extensions: defaultExtensions,
  },
  node: {
    fs: "empty",
    net: "empty",
    module: "empty",
    child_process: "empty",
  },
  externals: {
    fsevents: "commonjs fsevents",
  },
  module: {
    rules: commonRules,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new FilterWarningsPlugin({
      exclude: excludeWarnings,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new CompressionPlugin()
  ],
};

module.exports = webpackCommonConfig;

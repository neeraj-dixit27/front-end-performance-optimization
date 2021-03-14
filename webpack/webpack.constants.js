const basePath = process.cwd();

// Environments
const devEnv = "development";
const prodEnv = "production";

const devServerHotOnly = true;
const devServerconfigPath = `${basePath}/package.json`;
const devServerContentBase = `${basePath}/build/public/`;
const devServerwatchContentBase = true;
const devServerPublicPath = "/";
const devServerConfigErrorMsg = "Webpack dev server configuration error";

// split chunks
const splitChunkVendorRoute = /node_modules/;
// async + sync
const chunkType = "all";

// source map type
const soureMapType = "source-map";

// Paths
const FEAppDevEntryPoint = [
  `${basePath}/src/app/index.js`,
  require.resolve("react-dev-utils/webpackHotDevClient"),
];
const FEAppProdEntryPoint = `${basePath}/src/app/index.js`;
const appProdEntryPoint = `${basePath}/src/app/index.js`;
const appDevEntryPoint = [
  `${basePath}/src/app/index.js`,
  require.resolve("webpack-hot-middleware/client"),
];
const appPath = `${basePath}/src/server`;

// Webpack Test expressions
const testExpressions = {
  jsFilesExp: /(\.js$|\.jsx$)/,
  fontsExp: /\.(eot|otf|ttf|wav|mp3|woff|woff2)$/,
  imagesExp: /\.(jpe?g|png|gif)$/,
  lessExp: /\.less$/,
  cssExp: /\.css$/,
  htmlExp: /\.html$/,
  svgImgExp: /\.svg$/,
  htmlTemplateExp: /template\.html$/,
};

// 10 kB (10240 bytes)
const inlineImgLimit = 10 * 1024;

// output formats
const outputDevFontFormat = "fonts/[name]_[hash].[ext]";
const outputProdFontFormat = "fonts/[name]_[contenthash].[ext]";
const outputDevImgFormat = "images/[name]_[hash].[ext]";
const outputProdImgFormat = "images/[name]_[contenthash].[ext]";
const outputDevCssFilename = "css/[name].[hash].css";
const outputProdCssFilename = "css/[name].[contenthash].css";
const outputDevJsChunkName = "js/[name].[hash].bundle.js";
const outputProdJsChunkName = "js/[name].[contenthash].bundle.js";
const outputDevJsFileName = "js/[name].[hash].bundle.js";
const outputProdJsFileName = "js/[name].[contenthash].bundle.js";
const buildPath = `${basePath}/build/public`;
const PostcssLocalIdentName = "[name]---[local]---[hash:base64:5]";

const webpackCacheDir = "webpack_cache";

// excluded folders
const excludeNodeModules = /node_modules/;
const nodeModulesDir = /node_modules/;

const excludeWarnings = [
  /Critical dependency: the request of a dependency is an expression/,
  /Module not found: Error: Can't resolve 'inspector'/,
  /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
];

// extensions
const defaultExtensions = [".js", ".json", ".jsx", ".css", ".less"];

// app title
const appTitle = "React App";
const templatePath = `${basePath}/assets/templates/index.html`;
const outputHtmlFileName = "index.html";
const analyzerMode = "static";

// webpack extension constants
const webpackExtendFileName = "webpack.extend.js";
const webpackExtendFilePath = `${basePath}/${webpackExtendFileName}`;

module.exports = {
  splitChunkVendorRoute,
  chunkType,
  devEnv,
  prodEnv,
  soureMapType,
  FEAppDevEntryPoint,
  FEAppProdEntryPoint,
  appProdEntryPoint,
  appDevEntryPoint,
  appPath,
  testExpressions,
  outputDevFontFormat,
  outputProdFontFormat,
  outputDevImgFormat,
  outputProdImgFormat,
  inlineImgLimit,
  buildPath,
  webpackCacheDir,
  excludeNodeModules,
  nodeModulesDir,
  excludeWarnings,
  PostcssLocalIdentName,
  outputDevCssFilename,
  outputProdCssFilename,
  appTitle,
  templatePath,
  outputHtmlFileName,
  analyzerMode,
  defaultExtensions,
  devServerHotOnly,
  devServerconfigPath,
  devServerContentBase,
  devServerwatchContentBase,
  devServerPublicPath,
  devServerConfigErrorMsg,
  outputDevJsChunkName,
  outputDevJsFileName,
  outputProdJsChunkName,
  outputProdJsFileName,
  webpackExtendFilePath,
};

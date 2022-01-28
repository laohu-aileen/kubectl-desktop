import { ProgressPlugin, Configuration } from 'webpack';
import ForkTsChecker from "fork-ts-checker-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import { merge } from 'webpack-merge';
import { resolve, join } from "path";

/**
 * 获取绝对路径
 * @param value 
 * @returns 
 */
const getPath = (value: string) => {
  const baseDir = resolve(__dirname, "../");
  return join(baseDir, value);
}

/**
 * 公共配置
 */
export const commonConfig: Configuration = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: getPath("target"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"] }
        }
      })
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new ForkTsChecker({
      typescript: {
        configFile: getPath("tsconfig.json")
      }
    }),
  ],
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
    ]
  }
};

/**
 * 渲染进程编译配置
 */
export const rendererConfig: Configuration = merge(commonConfig, {
  target: ["electron-renderer", "es5"],
  entry: {
    app: getPath("src/renderer/app.tsx"),
  },
  plugins: [
    new HtmlPlugin({
      template: getPath("src/renderer/index.html"),
      title: "Kubectl",
      publicPath: "./"
    }),
  ]
});

/**
 * 主进程编译配置
 */
export const mainConfig: Configuration = merge(commonConfig, {
  target: ["electron-main", "es5"],
  entry: {
    main: getPath("src/main/main.ts"),
  },
});
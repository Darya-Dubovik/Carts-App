const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: path.resolve(__dirname, "src", "index.js"),
  plugins: [
    new HtmlWebpackPlugin({
      title: "Carts-App",
      template: path.resolve(__dirname, "src", "template.html"),
    }),

    !isDevelopment && new MiniCssExtractPlugin(),

    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  devtool: isDevelopment ? "eval-cheap-module-source-map" : "source-map",
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};

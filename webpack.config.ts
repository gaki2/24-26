const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const DeclarationBundlerPlugin = require("declaration-bundler-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/app.ts",
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules|\.d\.ts$/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html", filename: "index.html" }),
    new MiniCssExtractPlugin({
      linkType: false,
      filename: "style.css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
};

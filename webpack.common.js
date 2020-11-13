const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const hcongif = require("./htmlconfig")["htm"];
const MyPlugin = require('./plugin-test/my-plugin');

const PATHS = {
  src: path.join(__dirname, "src"),
};

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: devMode ? "static/js/bundle.js" : "static/js/[name].js",
    chunkFilename: devMode
      ? "static/js/[name].chunk.js"
      : "static/js/[name].chunk.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "./src/views/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
    },
    extensions: [".js", ".jsx", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: devMode,
                },
              },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: !devMode,
            },
          },
          //   {
          //     loader: "px2rem-loader",
          //     options: {
          //       remUnit: 75,
          //       remPrecision: 8,
          //     },
          //   },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "./src/public/index.html"),
      favicon: path.resolve(__dirname, "./src/public/favicon.ico"),
      files: {
        manifest: path.resolve(__dirname, "./src/public/manifest.json"),
      },
      config: hcongif,
      minify: {
        //删除注释
        removeComments: false,
        //删除空格
        collapseWhitespace: true,
      },
    }),
    !devMode &&
      new MiniCssExtractPlugin({
        filename: devMode
          ? "[name].css"
          : "static/css/[name].[contenthash:8].css",
        chunkFilename: devMode
          ? "[id].css"
          : "static/css/[name].[contenthash:8].chunk.css",
      }),
    new ProgressBarPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new MyPlugin({
        name: 'cqy'
    })
  ].filter(Boolean),
};

let path = require("path");
let webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    libs: ["react", "react-dom", "antd"],
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名
    path: path.resolve(__dirname, "dist", "dll"),
    library: "_dll_[name]", // _dll_libs
    //libraryTarget:'var' // commonjs var this ....
  },
  plugins: [
    new webpack.DllPlugin({
      // name == library
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "dll", "manifest.json"),
    }),
  ],
};

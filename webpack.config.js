const path = require("path");

module.exports = {
  entry: {
    index: "./client/index.js",
    checkout: "./client/checkout.js",
  },
  // entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
};

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ShellPlugin = require("webpack-shell-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})]
  },
  entry: {
    theme: ["./src/theme.js", "./src/sass/theme.sass"]
  },
  output: {
    filename: "js/[name].js?[hash]",
    path: path.resolve(__dirname, "dist/static")
  },
  externals: {
    jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: require.resolve("./src/theme.js"),
        use: "imports-loader?this=>window"
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              reloadAll: true
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader?indentedSyntax",
            options: {
              includePaths: [
                "node_modules/bourbon/app/assets/stylesheets",
                "node_modules/bourbon-neat/app/assets/stylesheets",
                "node_modules/font-awesome/scss",
                "node_modules/wyrm/sass"
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]",
              outputPath: "css/fonts/",
              publicPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css?[hash]",
      chunkFilename: "css/[name].css?[hash]"
    }),
    new CopyPlugin([
      {
        from: 'node_modules/html5shiv/dist/*.min.js',
        flatten: true,
        to: path.resolve(__dirname,'dist/static/js') },
    ]),
    new ShellPlugin({
      onBuildEnd: ["make -C docs clean html"],
      // dev=false here to force every build to trigger make, the default is
      // first build only.
      dev: false
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "docs/build/html"),
    watchContentBase: true,
    compress: false,
    port: 1919,
    hot: false,
    liveReload: true,
    publicPath: "/_static/"
  },
};

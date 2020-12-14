var webpack=require('webpack');

module.exports = {
  publicPath: "/stock/",
  outputDir: "docs",

  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ]
  },
};
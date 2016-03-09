var webpack = require('webpack');
var path = require('path');

module.exports.entry = "./app/app.js";
module.exports.output = {
  path: "static",
  filename: "bundle.js"
};


module.exports.module = {
  loaders: [
    {
      test: /\.(html|hbs)$/,
      loader: "handlebars-loader",
      query: {helperDirs: [ path.resolve(__dirname, "app", "templates", "helpers") ]}
    },
    { test: /\.css$/, loader: 'style!css' },
    {
      test: /\.s(a|c)ss$/ ,
      loaders: [
        'style', 'css?sourceMap', 'resolve-url', 'sass?sourceMap'
      ]
    },
  ]
};

module.exports.sassLoader = {
  includePaths: [path.resolve(__dirname, "app",  "sass")],
  sourceMap: true
};

//module.exports.devtool = 'eval';

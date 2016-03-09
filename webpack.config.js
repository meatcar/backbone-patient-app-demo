
var handlebars = {
  test: /\.(html|hbs)$/,
  loader: "handlebars-loader",
  query: {helperDirs: [ __dirname + "/app/helpers" ]}
};

module.exports = {
  entry: "./app/app.js",
  output: {
    path: "static",
    filename: "bundle.js"
  },
  module: {
    loaders: [ handlebars ]
  }
};


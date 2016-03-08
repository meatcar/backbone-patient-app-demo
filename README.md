# Backbone Starter
This is a template for a Backbone application that is powered by [Webpack](http://webpack.github.io) and [npm](https://www.npmjs.com/) for automation.
## Requirements
* git
* npm

```
git clone https://github.com/austburn/start-backbone-webpack.git
npm install
```
## Description
This project is much like my [start-backbone](https://github.com/austburn/start-backbone) project, but uses Webpack and npm for automation and building. It turns out that Webpack is very simple to use and feels pretty familiar to [Browserify](http://browserify.org/).

Also used in this project is [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) which bundles your code and hosts it on [localhost:8080](http://localhost:8080). Additionally, it will watch for changes and rebuild as needed.
## Running
npm is used shearly for the simplicity of not having to remember webpack CLI commands. Here is a list of commands:
```
npm run server    # Lints and starts the webpack development server on http://localhost:8080
npm run lint      # Runs jscs and jshint on the app directory
npm run bundle    # Bundles your source files in the app directory with init.js as the entry point
npm run watch     # Automatically rebundles your source as you make changes
```

If you need help configuring your desired linting checks, be sure to check out [jscs](https://github.com/jscs-dev/node-jscs) and [jshint](www.jshint.com) for more information.

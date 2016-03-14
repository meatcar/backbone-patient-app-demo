# Backbone Patient App Demo
This is a demo of Backbone and Phenotips REST API. You can browse and edit
patients owned by the Admin. The purpose of this demo is to serve as an
introduction to modern front-end frameworks.

## Requirements
* git
* npm

```
npm install
```

## Running
npm is used shearly for the simplicity of not having to remember webpack CLI
commands. Here is a list of commands:

```
npm run server    # Lints and starts the webpack development server on http://localhost:8080
npm run lint      # Runs jscs and jshint on the app directory
npm run bundle    # Bundles your source files in the app directory with init.js as the entry point
npm run watch     # Automatically rebundles your source as you make changes
```

Based on https://github.com/austburn/start-backbone-webpack

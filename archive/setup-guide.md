
## Extension Setup:

- Do `npm init -y` to establish dependencies
- Do `git init` to establish git
- Create `manifest.json` file with at least these settings:
```json
{
  "manifest_version": 3,
  "name": "project-name",
  "description": "desc",
  "author": "William J. Horn",
  "version": "1.0.0",

  "action": {
    "default_popup": "./src/popup/index.html",
    "default_title": "Extension Title"
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["./build/content.js"]
    }
  ],

  "background": {
    "service_worker": "./src/background/background.js"
  },

  "permissions": [
    "tabs",
    "webNavigation",
    "storage",
    "scripting",
    "activeTab"
  ]
}
```
- Install webpack
  - install cmd: `npm install --save-dev webpack webpack-cli`
  - *This is for bundling the Javascript modules to enable use of ES6 import/exports.*
- Create a build script in the `package.json`
  - *Must run the build manually by running `npm run build` before every save and test of the extension*
```json
  "scripts": {
    "build": "webpack"
  }
```
- Create `webpack.config.js` file in project root directory with these settings:
  - *`entry` defines what and where the main source code files will be*
  - *`output` determines where the compiled Javascript bundle will be - this is the file that should be referenced in the HTML to run*
```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background/background.js',
    content: './src/content/content.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  }
};
```
> **Note**: `mode` must be set to `'production'`, otherwise the browser will throw an EvalError (something to do with CORS).
- Begin file structuring and go from there!



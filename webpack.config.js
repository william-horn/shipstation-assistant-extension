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
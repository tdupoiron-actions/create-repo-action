const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  // No externals - bundle everything including @actions/core and dependencies
};
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    login: './src/login.js',
    tasks: './src/tasks.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: true
};

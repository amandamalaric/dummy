const slsw = require( 'serverless-webpack' );

module.exports = {
  mode: 'none',
  entry: slsw.lib.entries,
  target: 'node',
  optimization: {
    minimize: false
  }
};
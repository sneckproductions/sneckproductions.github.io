import webpack from 'webpack'

const defaultConfig = require("./webpack.config.babel")

export default Object.assign(
  defaultConfig,
  {
    plugins: defaultConfig.plugins.concat([
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line camelcase
          warnings: false // Because uglify reports irrelevant warnings.
        },
        comments: false,
        sourceMap: false
      })
    ])
  }
)
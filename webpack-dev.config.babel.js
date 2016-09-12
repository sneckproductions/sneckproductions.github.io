import webpack from 'webpack'

const defaultConfig = require("./webpack.config.babel")

export default Object.assign(
	defaultConfig,
	{
		devtool: 'cheap-module-source-map',
		plugins: defaultConfig.plugins.concat([
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.NoErrorsPlugin()
		])
	}
)
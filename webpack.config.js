const path = require("path");

const paths = {
	context: path.join(__dirname, "./src/"),
	output: path.join(__dirname, "./dist/"),
	entry: {
		'app':"./index.js",
	}
};

const config = {
	context: paths.context,
	entry: paths.entry,
	output: {
		path: paths.output,
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.csv$/,
				use: {
					loader: "csv-loader",
					options: {
						dynamicTyping: true,
						header: true,
						skipEmptyLines: true
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]

	},
	resolve: {
		extensions: ['.jsx','.js'],
		modules: [path.resolve(__dirname,'src'), 'node_modules'],
		alias: {
			'hooks': path.resolve(__dirname,'src/abstracts/hooks/'),
			'ui': path.resolve(__dirname,'src/abstracts/ui/'),
			'components': path.resolve(__dirname,'src/components/'),
			'd3Helper': path.resolve(__dirname,'src/d3Helper/')
		}
	},
	devServer: {
		contentBase: path.join(__dirname, '/'),
		compress: true,
	},
	devtool: 'inline-source-map'
};


module.exports = config;



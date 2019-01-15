let path = require('path');
let conf = {
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname, './dist'),
		filename:'main.js',
		publicPath:'dist/'
	},
	module: {
	  rules: [
	    { 
	    	test: /\.js$/, 
	    	exclude: /node_modules/, 
	    	loader: "babel-loader",
	    },
	    { 
	    	test: /\.css$/, 
	    	exclude: /node_modules/, 
	    	use: [
	    	'style-loader',
	    	'css-loader'
	    	]
	    }
	  ]
	},
	devServer:{
		overlay:true
	},
};

module.exports = (env, options) => {
	let development = options.mode ===  'development';
	conf.devtool = development ? 'inline-source-map': 'suorce-map';
	return conf;
}
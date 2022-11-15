const mode = require('../lib/mode')
const config = require('.')

module.exports = {

	bundle: true,
	minify: false,
	sourcemap: (mode.build()) ? false : true,
	color: true,
	globalName: null,
	logLevel: (mode.build()) ? 'warning' : 'error',
	target: config.targetList,
	define: {
		__assets: (mode.build()) ? '\"..\"' : '\"../../assets\"',
		__assetsHTML: (mode.build()) ? '\"./assets\"' : '\"../assets\"',
		__vendor: (mode.build()) ? '\"../vendor\"' : '\"../../vendor\"',
		__vendorHTML: (mode.build()) ? '\"./assets/vendor\"' : '\"../vendor\"',
		__isDev: (mode.build()) ? false : true,
		__isProd: (mode.build()) ? true : false
	}

}

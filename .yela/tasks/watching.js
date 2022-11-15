const { series, watch } = require('gulp')
const { readFileSync } = require('fs')

const config = require('../config')
const folding = require('../lib/folding')
const server = require('../lib/server')

const vendors__ = require('./vendors')
const styles__ = require('./styles')
const scripts__ = require('./scripts')
const templates__ = require('./templates')
const assets__ = require('./assets')

const watching = async () => {

	// Init Server
	server.init({
		notify: false,
		online: true,
		server: {
			baseDir: folding.src,
			index: `/${config.appName}`,
			routes: { [`/${config.appName}`]: `${folding.src}/.site` }
		},
		tunnel: config.tunnelDev,
		port: config.portDev,
		middleware: [
			{
				route: '/.site',
				handle: function (req, res, next) {
					res.writeHead(302, { Location: '/' })
					res.end()
				}
			},
			{
				route: '/',
				handle: function (req, res, next) {
					res.writeHead(302, { Location: `/${config.appName}` })
					res.end()
				}
			}
		]
	})

	// Watching Files
	watch(folding.vendor.watch, series(vendors__))
	watch(folding.scss.watch, series(styles__))
	watch(folding.js.watch, series(scripts__))
	watch(folding.views.watch, series(templates__))
	watch(folding.assets.watch, series(assets__))

}

module.exports = watching

const { dest, src } = require('gulp')

const folding = require('../lib/folding')
const mode = require('../lib/mode')
const server = require('../lib/server')

const vendors = (cb) => {
	if (mode.build()) {

		return src(`${folding.vendor.src}/**/*`)
			.pipe(dest(folding.vendor.dest))
	
	} else {

		server.reload()
		cb()
	
	}
}

module.exports = vendors

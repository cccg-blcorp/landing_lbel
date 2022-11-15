const { dest, src } = require('gulp')

const config = require('../config')
const folding = require('../lib/folding')
const mode = require('../lib/mode')
const server = require('../lib/server')

const getIgnoreJs = () => {

	let js_files = config.packJs

	return js_files.map((file) => {
		file = `${file}.js`
		return `!${folding.assets.src}/js/${file}`
	})

}

const getIgnoreScss = () => {

	let scss_files = config.packScss
	
	return scss_files.map((file) => {
		file = `${file}.css`
		return `!${folding.assets.src}/css/${file}`
	})
	
}

const assets = (cb) => {

	let src_files = []

	src_files.push(`${folding.assets.src}/**/*`)
	src_files = src_files.concat(getIgnoreJs())
	src_files = src_files.concat(getIgnoreScss())

	if (mode.build()) {
		
		return src(src_files, { allowEmpty: true })
			.pipe(dest(folding.assets.dest))
	
	} else {

		server.reload()
		cb()
		
	}

}

module.exports = assets

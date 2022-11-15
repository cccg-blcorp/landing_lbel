const { dest, src } = require('gulp')
const { basename } = require('path')

const obfuscator = require('gulp-javascript-obfuscator')
const foreach = require('gulp-foreach')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const { createGulpEsbuild } = require('gulp-esbuild')
const esbuild = createGulpEsbuild({ pipe: true })

const config = require('../config')
const esbuild_config = require('../config/esbuild')
const obfuscator_config = require('../config/obfuscator')
const folding = require('../lib/folding')
const mode = require('../lib/mode')
const server = require('../lib/server')

const scripts = () => {

	return src(folding.js.files, { allowEmpty: true })
	
		.pipe(
			foreach(function (stream, file) {
				// Set module name
				const filename = basename(file.path).split('.')
				let modulename = `$${filename[1]}`

				esbuild_config.globalName = modulename

				// Generate bundle
				return stream.pipe(esbuild(esbuild_config))
			})
		)
		
		// Javascript obfuscator
		.pipe(mode.build(gulpif(config.obfuscatorJs, obfuscator(obfuscator_config))))


		.pipe(mode.build(terser()))
		.pipe(mode.build(
			rename({
				extname: '.min.js'
			})
		))

		// Generate File
		.pipe(dest(folding.js.dest))
		.pipe(mode.development(server.stream()))

}

module.exports = scripts

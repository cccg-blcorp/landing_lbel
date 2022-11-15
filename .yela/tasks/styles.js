const { dest, src } = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const sassVars = require('gulp-sass-vars')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const newer = require('gulp-newer')

const mode = require('../lib/mode')
const folding = require('../lib/folding')
const server = require('../lib/server')

const styles = () => {

	const sass_config = (mode.build()) ? { outputStyle: 'compressed' } : { outputStyle: 'expanded' }

	const globalVariables = {
		path_assets: (mode.build()) ? '../' : '../../assets/',
		path_vendor: (mode.build()) ? '../vendor/' : '../../vendor/'
	}

	return src(folding.scss.files, { allowEmpty: true })

		.pipe(newer(folding.scss.dest))
		
		// Maps Init
		.pipe(mode.development(sourcemaps.init()))

		// SASS
		.pipe(sassVars(globalVariables, { verbose: false }))
		.pipe(sass.sync(sass_config).on('error', sass.logError))
    
		// Postcss
		.pipe(mode.build(postcss()))
		
		// Rename
		.pipe(mode.development(rename({ extname: '.css' })))
		.pipe(mode.build(rename({ extname: '.min.css' })))
		
		// Write Maps
		.pipe(mode.development(sourcemaps.write('.')))
		
		// Generate File
		.pipe(dest(folding.scss.dest))
		.pipe(mode.development(server.stream()))
	
}

module.exports = styles

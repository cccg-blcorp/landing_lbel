const { dest, src } = require('gulp')

const nunjucks = require('gulp-nunjucks-render')
const cachebust = require('gulp-cache-bust')
const htmlbeautify = require('gulp-html-beautify')
const gulpif = require('gulp-if')
const flog = require('fancy-log')
const ansiColors = require('ansi-colors')

const config = require('../config')
const folding = require('../lib/folding')
const mode = require('../lib/mode')
const server = require('../lib/server')

const templates = () => {

	const manageEnvironment = (environment) => {

		let localGlobals = ['asset', 'image', 'vendor', 'scss', 'js', 'page', 'title', 'isDev', 'isBuild', 'assetMulti', 'imageMulti', 'scssMulti', 'jsMulti' ]

		localGlobals.forEach(item => {
			environment.addGlobal(item, folding.views.helpers[item])
		})

		if (config.viewsGlobals.length > 0) {
			config.viewsGlobals.forEach(helper => {
				if (helper.name) {
					if (localGlobals.includes(helper.name)) {
						flog(ansiColors.red(`yelaconfig.viewsGlobals: The value "name" cannot be: ${localGlobals}`))
						process.exit(1)
					} else {
						if (helper.content) {
							environment.addGlobal(helper.name, helper.content)
						} else {
							flog(ansiColors.red(`yelaconfig.viewsGlobals: The value "content" is missing in the name "${helper.name}"`))
							process.exit(1)
						}
					}
				} else {
					flog(ansiColors.red('yelaconfig.viewsGlobals: The value "name" cannot be empty'))
					process.exit(1)
				}
			})
		}

	}

	return src(`${folding.views.src}/pages/**/*.twig`, { allowEmpty: true })
		
		// Nunjucks
		.pipe(nunjucks({
			path: [folding.views.src],
			ext: '.html',
			manageEnv: manageEnvironment
		}))

		// Cache Busting
		.pipe(mode.build(gulpif(config.cacheBust, cachebust({ type: 'timestamp' }))))
		
		// HTML Beautiful
		.pipe(htmlbeautify({
			indent_size: 2,
			indent_with_tabs: true,
			preserve_newlines: false,
			end_with_newline: true,
			eval_code: true,
			space_before_conditional: false
		}))
		
		// Generate File
		.pipe(dest(folding.views.dest))
		.pipe(mode.development(server.stream()))
	
}

module.exports = templates

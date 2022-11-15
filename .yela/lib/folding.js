const config = require('../config')
const mode = require('./mode')

const folding = {

	src: './src',
	dest: null,

	assets: {
		src: null,
		dest: null,
		watch: null
	},

	js: {
		src: null,
		dest: null,
		files: null,
		watch: null
	},

	scss: {
		src: null,
		dest: null,
		files: null,
		watch: null
	},

	vendor: {
		src: null,
		dest: null,
		watch: null
	},

	views: {
		src: null,
		dest: null,
		watch: null,
		helpers: null
	}

}

folding.dest = (mode.build()) ? config.folderBuild : `${folding.src}/.site`

folding.assets.src = `${folding.src}/assets`
folding.assets.dest = `${folding.dest}/assets`
folding.assets.watch = `${folding.src}/assets/**/*`

folding.js.src = `${folding.src}/js`
folding.js.dest = (mode.build()) ? `${folding.dest}/assets/js` : `${folding.dest}/js`
folding.js.watch = `${folding.src}/js/**/*.js`

folding.scss.src = `${folding.src}/scss`
folding.scss.dest = (mode.build()) ? `${folding.dest}/assets/css` : `${folding.dest}/css`
folding.scss.watch = `${folding.src}/scss/**/*.scss`

folding.vendor.src = `${folding.src}/vendor`
folding.vendor.dest = `${folding.dest}/assets/vendor`
folding.vendor.watch = `${folding.src}/vendor/**/*`

folding.views.src = `${folding.src}/views`
folding.views.dest = folding.dest
folding.views.watch = `${folding.src}/views/**/*.twig`

const getPackJs = () => {

	let src_files = config.packJs
	return src_files.map((file) => {
		return `${folding.js.src}/${file}.js`
	})

}

const getPackScss = () => {

	let src_files = config.packScss
	return src_files.map((file) => {
		return `${folding.scss.src}/${file}.scss`
	})

}

folding.js.files = getPackJs()
folding.scss.files = getPackScss()

folding.views.helpers = {

	asset: (dir) => {
		return (mode.build()) ? `./assets/${dir}` : `../assets/${dir}`
	},

	assetMulti: (dir) => {
		return (mode.build()) ? `../assets/${dir}` : `../../assets/${dir}`
	},

	image: (dir) => {
		return (mode.build()) ? `./assets/images/${dir}` : `../assets/images/${dir}`
	},

	imageMulti: (dir) => {
		return (mode.build()) ? `../assets/images/${dir}` : `../../assets/images/${dir}`
	},

	vendor: (dir) => {
		return (mode.build()) ? `./assets/vendor/${dir}` : `../vendor/${dir}`
	},

	scss: (filename) => {
		return (mode.build()) ? `./assets/css/${filename}.min.css` : `./css/${filename}.css`
	},

	scssMulti: (filename) => {
		return (mode.build()) ? `../assets/css/${filename}.min.css` : `../css/${filename}.css`
	},

	js: (filename) => {
		filename = filename.split('.')[0];
		return (mode.build()) ? `./assets/js/${filename}.min.js` : `./js/${filename}.js`
	},

	jsMulti: (filename) => {
		filename = filename.split('.')[0];
		return (mode.build()) ? `../assets/js/${filename}.min.js` : `../js/${filename}.js`
	},

	page: (filename) => {
		return `./${filename}.html`
	},

	title: (title = '') => {
		title = title.trim()

		if (title !== '') {
			return `${title} | ${config.titlePage}`
		}

		return config.titlePage
	},
	
	isDev: mode.build(),

	isBuild: mode.development()
	
}
	
module.exports = folding

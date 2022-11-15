const del = require('del')

const folding = require('../lib/folding')
const mode = require('../lib/mode')

const cleaner = () => {

	return (mode.build()) ? del([folding.dest, `${folding.src}/.site`], { force: true }) : del([folding.dest], { force: true })

}

module.exports = cleaner

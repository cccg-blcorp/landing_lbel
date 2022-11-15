const gulpMode = require('gulp-mode')

const mode = gulpMode({

	modes: ['build', 'development'],
	default: 'build',
	verbose: false

})

module.exports = mode

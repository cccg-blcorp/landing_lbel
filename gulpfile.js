'use strict'

const { series, parallel } = require('gulp')

const cleaner__ = require('./.yela/tasks/cleaner')
const vendors__ = require('./.yela/tasks/vendors')
const styles__ = require('./.yela/tasks/styles')
const scripts__ = require('./.yela/tasks/scripts')
const templates__ = require('./.yela/tasks/templates')
const assets__ = require('./.yela/tasks/assets')
const watching__ = require('./.yela/tasks/watching')


/**
 * Start Build
 */
exports.build = series(
	cleaner__,
	parallel(
		vendors__,
		styles__,
		scripts__,
		templates__,
		assets__
	)
)


/**
 * Start Development
 */
exports.default = series(
	cleaner__,
	parallel(
		styles__,
		scripts__,
		templates__
	),
	watching__
)

import { mountDataLists } from './lib/datalist'
import { mountPhoneFields } from './lib/fieldphone'
import { mountFields } from './lib/fields'
import { setFieldsTypes } from './lib/forms'
import { mountDatepickers } from './lib/datepicker'
import { mounInfoDrags, mountDraggables } from './lib/draggable'

import { getState } from './app/state'
import { renderSteps } from './app/steps'
import { renderErrors } from './lib/errors'
import { renderNavLinks } from './app/navigation'
import { loginWithBtn, loginWithUrl } from './app/login'
import { mountDataLayerSession } from './app/events'

const init = () => {

	mountDataLayerSession()

	setFieldsTypes()
	
	mountDatepickers()
	mountPhoneFields()
	mountDraggables()
	mounInfoDrags()
	mountDataLists()
	mountFields()

	renderErrors()
	renderNavLinks()
	renderSteps()

}

window.addEventListener('DOMContentLoaded', async () => {

	if (__isDev) console.log('state-initial:', getState())

	if (__isDev) console.log('events-data-layer:', 'tipoPagina')
	dataLayer.push({ 'tipoPagina': 'lbel', 'pais': 'EC'})
	if (__isDev) console.log('dataLayer-updated:', dataLayer)

	const buttonLogin = document.querySelector('#btn-welcome')

	init()

	await loginWithUrl('EC')

	buttonLogin.onclick = async (event) => {

		event.preventDefault()
		await loginWithBtn('EC', event)
		
	}

})

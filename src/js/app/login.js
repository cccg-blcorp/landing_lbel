import { mountPage } from './navigation'
import { validateFields } from '../lib/fields'
import { buttonLoadingOff, buttonLoadingOn } from '../helpers/loader'
import { getState, stateEmail, stateLogin, updateState } from './state'
import { disableInputEmail } from '../helpers/utils'
import { startDataLayerSession } from './events'

export const loginWithUrl = async (country) => {
	
	await stateEmail()
	
	if (getState().e !== '') {

		const isAuth = await stateLogin(country)
		
		if (isAuth) {

			disableInputEmail()
			startDataLayerSession(getState().UID, 'login')

		}
		
		mountPage(isAuth)

	} else {
		mountPage(false)
	}

}

export const loginWithBtn = async (country, event) => {
	
	const isValidate = validateFields('welcome', 'e:required|email')
	
	if (isValidate) {

		buttonLoadingOn(event.target)
		const isAuth = await stateLogin(country)

		if (!isAuth) updateState('login', {
			dc: '0% OFF'
		})

		if (isAuth) {

			disableInputEmail()
			startDataLayerSession(getState().UID, 'login')

		}

		mountPage(isAuth)

		buttonLoadingOff(event.target, '¡Iniciar! <span class="icon icon-arrow-right text-size-xl ml-1"></span>')

		/**
		 * dataLayer
		 */
		if (__isDev) console.log('events-data-layer:', 'Conociendonos')
		dataLayer.push({ event: 'Conociendonos' })
		if (__isDev) console.log('dataLayer-updated:', dataLayer)

	}

}

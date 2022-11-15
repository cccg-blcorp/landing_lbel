import { getState } from './state'
import { showVoucher } from '../lib/vouchers'
import { loaderPageOff } from '../helpers/loader'
import { disableInputEmail } from '../helpers/utils'
import { updateLinkBuy } from './results'

const fnCallbacks = {
	'disable-email': () => {
		disableInputEmail()
	}
}

export const navigateTo = id => {

	const pages = Array.from(document.querySelectorAll('[data-toggle="block-page"]'))
	const pageTo = document.querySelector(`#${id}[data-toggle="block-page"]`)
	
	pages.forEach(page => page.setAttribute('data-active', 'false'))
	pageTo.setAttribute('data-active', 'true')

	showVoucher(id)

	window.scrollTo(0, 0)

}

export const renderNavLinks = () => {

	const links = Array.from(document.querySelectorAll('[data-toggle="link"]'))

	links.forEach(link => {
		link.addEventListener('click', () => {

			const callbacks = link.getAttribute('data-callbacks')

			if (callbacks) {
				if (callbacks.trim() !== '') {
					callbacks.split(',').forEach(cb => {
						if (fnCallbacks.hasOwnProperty(cb)) {
							const fnCallback = fnCallbacks[cb]
							fnCallback()
						}
					})
				}
			}

			navigateTo(link.getAttribute('data-page-to'))

		})
	})

}

export const mountPage = isAuth => {

	const state = getState()

	if (state.rf === '1') {

		localStorage.setItem('PAGE-SESSION', Date.now())
		updateLinkBuy(state)

		setTimeout(() => {
			loaderPageOff()
			window.location = './gracias-por-tus-respuestas.html'
		}, 2000)

	} else {

		if (isAuth) {
				
			if (state.dc === '') {
				navigateTo('welcome-mail')
			}
			
			else if (state.dc === '5% OFF') {
				navigateTo('birthday')
			}
				
			else if (state.dc === '10% OFF') {
				navigateTo('gender')
			}
				
			else if (state.dc === '15% OFF') {
				navigateTo('main-needs')
			}
				
			else if (state.dc === '20% OFF') {
				navigateTo('favorite-products')
			}
				
			else if (state.dc === '25% OFF') {
				navigateTo('confirm-data')
			}

			else {
				navigateTo('welcome')
			}

		} else {

			if (state.dc === '0% OFF') {
				navigateTo('register')
			} else {
				navigateTo('welcome')
			}

		}

		setTimeout(() => {
			loaderPageOff()
		}, 500)

	}

}

import { disablePageScroll, enablePageScroll } from '../helpers/utils'

const closers = Array.from(document.querySelectorAll('[data-toggle="close-error"]'))

const pageErrorServer = document.querySelector('#page-error-server')
const pageErrorSave = document.querySelector('#page-error-save')

export const renderErrors = () => {

	closers.forEach(closer => {
		closer.addEventListener('click', () => {
		
			const parent = closer.closest('.page-error')
			parent.classList.remove('is-show')
			
		})
	})

}

export const showPageError = type => {

	if (type === 'server') {
		pageErrorServer.classList.add('is-show')
		disablePageScroll()
	}

	if (type === 'save') {
		pageErrorSave.classList.add('is-show')
		disablePageScroll()
	}

}

export const hidePageError = type => {

	if (type === 'server') {
		pageErrorServer.classList.remove('is-show')
		enablePageScroll()
	}

	if (type === 'save') {
		pageErrorSave.classList.remove('is-show')
		enablePageScroll()
	}

}

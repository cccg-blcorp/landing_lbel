import { disablePageScroll, enablePageScroll } from './utils'

const loader = document.querySelector('.loader')

export const loaderPageOff = () => {
	loader.style.display = 'none'
	enablePageScroll()
}

export const loaderPageOn = () => {
	loader.style.display = 'flex'
	disablePageScroll()
}

export const buttonLoadingOn = (button) => {
	button.classList.add('button-loading')
	button.innerHTML = '<span class="button-spinner"></span>'
}

export const buttonLoadingOff = (button, text) => {
	button.classList.remove('button-loading')
	button.innerHTML = text
}

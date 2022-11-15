const pageHTML = document.querySelector('html')
const pageBody = document.querySelector('body')

export const getParameterByName = name => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	let regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	let results = regex.exec(location.search)
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, " "))
}

export const disablePageScroll = () => {
	pageHTML.style.overflowY = 'hidden'
	pageBody.style.overflowY = 'hidden'
}

export const enablePageScroll = () => {
	pageHTML.style.overflowY = 'auto'
	pageBody.style.overflowY = 'auto'
}

export const removeAttributes = (element, attributes) => {
	attributes.split(',').forEach(attr => {
		element.removeAttribute(attr)
	})
}

export const disableInputEmail = () => {
	const inputEmail = document.querySelector('input#form-register-email')
	removeAttributes(inputEmail, 'data-toggle,data-handler,autocomplete,placeholder')
	inputEmail.disabled = true
}

import { updateStaticState } from '../app/state'
import { calculateLegalAge } from '../helpers/calculator'

export const mountFields = () => {
	
	const fields = Array.from(document.querySelectorAll('[data-toggle="state-modifier"]'))
	
	fields.forEach(field => {

		const handler = field.getAttribute('data-handler')
		const name = field.getAttribute('name')

		const removeError = e => {
			const parent = e.target.closest('fieldset')
			const error = parent.querySelector('.form-error')
			error.classList.remove('form-error-show')
			error.innerText = ''
		}

		if (field.getAttribute('type') === 'checkbox') field.checked = false

		field.addEventListener('focus', removeError)
		field.addEventListener('change', removeError)

		if (handler === 'on-text') {
			field.addEventListener('input', () => {
				if (field.getAttribute('data-handler')) {
					updateStaticState(handler, {
						[name]: field.value.trim()
					})
				}
			})
		}

		if (handler === 'on-update') {
			field.addEventListener('input:on-update', () => {
				updateStaticState(handler, {
					[name]: field.value.trim()
				})
			})
		}

		if (handler === 'on-number') {
			field.addEventListener('input:on-number', () => {
				updateStaticState(handler, {
					[name]: field.value.trim()
				})
			})
		}

		if (handler === 'on-check') {
			field.addEventListener('change', () => {
				updateStaticState(handler, {
					[name]: (field.checked) ? '1' : '0'
				})
			})
		}

		if (handler === 'on-date') {
			field.addEventListener('changeDate', () => {
				const date = field.value.split('/')
				updateStaticState(handler, {
					[name]: `${date[2]}-${date[1]}-${date[0]}`
				})
			})
		}

	})

}

export const validateFields = (idSection, fieldsToValidate) => {

	const section = document.querySelector(`#${idSection}`)
	const fields = fieldsToValidate.split(',').map(fieldToValidate => {
		const [name, validations] = fieldToValidate.split(':')
		return {
			el: section.querySelector(`input[name="${name}"]`),
			validations: validations.split('|')
		}
	})

	let allowed = true

	fields.forEach(field => {

		const fieldParent = field.el.closest('fieldset')
		const fieldError = fieldParent.querySelector('.form-error')

		for (let validation of field.validations) {
			
			if (validation === 'required') {
				if (field.el.value.trim() === '') {
					
					fieldError.innerText = 'Este campo es obligatorio'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}
			
			if (validation === 'email') {
				let expRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
				if (!expRegular.test(field.el.value.trim())) {
					
					fieldError.innerText = 'Correo electrónico no válido'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}

			if (validation === 'phone') {
				const phoneLength = field.el.maxLength
			
				if (field.el.value.trim().length !== phoneLength) {

					fieldError.innerText = `El número debe ser de ${phoneLength} números` 
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}

			if (validation === 'number') {
				let expRegular = /^[0-9]+$/
				if (!expRegular.test(field.el.value.trim())) {

					fieldError.innerText = 'Campo no númerico'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}

			if (validation === 'checked') {
				if (!field.el.checked) {

					fieldError.innerText = 'Debes marcar esta opción'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}

			if (validation === 'date') {
				let dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/
				if (!dateReg.test(field.el.value)) {

					fieldError.innerText = 'Fecha no válida'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}

			if (validation === 'older') {
				const birthDate = field.el.value.split('/')
				const isLegalAge = calculateLegalAge(`${birthDate[2]}-${birthDate[1]}-${birthDate[0]}`)
				
				if (!isLegalAge) {

					fieldError.innerText = 'Debes ser mayor de edad'
					fieldError.classList.add('form-error-show')
					allowed = false
					break

				} else {
					fieldError.classList.remove('form-error-show')
					fieldError.innerText = ''
				}
			}
		
		}

	})

	return allowed

}

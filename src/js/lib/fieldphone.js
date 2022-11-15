const DEFAULT_COUNTRY = 'CO'

const MAX_LENGTH_BY_COUNTRY = {
	MX: '10',
	CO: '10',
	DO: '10',
	EC: '10',
	CL: '9',
	PE: '9',
	BO: '8',
	CR: '8',
	GT: '8',
	PA: '8',
	SV: '8',
}

const DEFAULT_LENGTH = '10'

const phoneFields = Array.from(document.querySelectorAll('.form-phone'))

const checkSelected = (options = [], value = '') => {
	options.forEach(option => {
		if (option.getAttribute('data-value') === value) {
			option.classList.add('selected')
		} else {
			option.classList.remove('selected')
		}
	})
}

export const updatePhoneFields = () => {

	phoneFields.forEach(phoneField => {

		const input = phoneField.querySelector('input[type="hidden"]')
		const inputText = phoneField.querySelector('.form-phone-field input')

		const buttonOpen = phoneField.querySelector('.form-phone-now')

		const countryOptions = Array.from(phoneField.querySelectorAll('.form-phone-option'))
		const countryNow = buttonOpen.querySelector('img')

		const [countrySelected] = countryOptions.filter(countryOption => countryOption.getAttribute('data-value') === input.value)
		const countryImage = countrySelected.querySelector('img')

		const countryNowValue = countrySelected.getAttribute('data-value')

		countryNow.src = countryImage.src
		countryNow.alt = countryImage.alt

		inputText.maxLength = (MAX_LENGTH_BY_COUNTRY[countryNowValue] !== undefined) ? MAX_LENGTH_BY_COUNTRY[countryNowValue] : DEFAULT_LENGTH

		checkSelected(countryOptions, input.value)

	})

}

export const mountPhoneFields = () => {
	
	phoneFields.forEach(phoneField => {

		const input = phoneField.querySelector('input[type="hidden"]')
		const inputText = phoneField.querySelector('.form-phone-field input')

		const buttonOpen = phoneField.querySelector('.form-phone-now')

		// const boxSelect = phoneField.querySelector('.form-phone-select')
		const boxOptions = phoneField.querySelector('.form-phone-options')
		
		const countryOptions = Array.from(phoneField.querySelectorAll('.form-phone-option'))

		const countryNow = buttonOpen.querySelector('img')
		
		input.value = DEFAULT_COUNTRY
		checkSelected(countryOptions, input.value)
		
		// buttonOpen.onclick = () => {
		// 	if (boxSelect.classList.contains('open')) {
		// 		boxSelect.classList.remove('open')
		// 	} else {
		// 		boxSelect.classList.add('open')
		// 	}
		// }

		countryOptions.forEach(countryOption => {
			
			const countryImage = countryOption.querySelector('img')
			
			countryOption.onclick = () => {

				const countryValue = countryOption.getAttribute('data-value')

				countryNow.src = countryImage.src
				countryNow.alt = countryImage.alt

				input.value = countryValue
				checkSelected(countryOptions, input.value)

				inputText.maxLength = (MAX_LENGTH_BY_COUNTRY[countryValue] !== undefined) ? MAX_LENGTH_BY_COUNTRY[countryValue] : DEFAULT_LENGTH

				input.dispatchEvent(new Event('input:on-update'))

				// boxSelect.classList.remove('open')

			}

		})

		document.addEventListener('click', event => {
			const isClickInsideButtonOpen = buttonOpen.contains(event.target)
			const isClickInsideBoxOptions = boxOptions.contains(event.target)
			// if (!isClickInsideButtonOpen && !isClickInsideBoxOptions) boxSelect.classList.remove('open')
		})


	})

} 

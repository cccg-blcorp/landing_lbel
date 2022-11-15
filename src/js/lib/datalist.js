const dataFields = Array.from(document.querySelectorAll('.form-datalist'))

const checkSelected = (options = [], value = '') => {
	options.forEach(option => {
		if (option.getAttribute('data-value').trim().toLowerCase() === value.trim().toLowerCase()) {
			option.classList.add('selected')
		} else {
			option.classList.remove('selected')
		}
	})
}

export const updateDataLists = () => {

	dataFields.forEach(dataField => {

		const input = dataField.querySelector('input[type="hidden"]')
		const options = Array.from(dataField.querySelectorAll('.form-datalist-option'))
		const buttonSubmit = dataField.closest('form').querySelector('button[type="submit"][data-toggle="button-step"]')

		const [optionSelected] = options.filter(option => option.getAttribute('data-value').trim().toLowerCase() === input.value.trim().toLowerCase())
		
		if (optionSelected) buttonSubmit.style.display = 'flex'
		checkSelected(options, input.value)

	})

}

export const mountDataLists = () => {

	dataFields.forEach(dataField => {

		const input = dataField.querySelector('input[type="hidden"]')
		const options = Array.from(dataField.querySelectorAll('.form-datalist-option'))
		const buttonSubmit = dataField.closest('form').querySelector('button[type="submit"][data-toggle="button-step"]')

		input.value = ''

		options.forEach(option => {
			option.onclick = () => {

				input.value = option.getAttribute('data-value')
				checkSelected(options, input.value)

				input.dispatchEvent(new Event('input:on-update'))

				buttonSubmit.style.display = 'flex'
			}
		})

	})

}

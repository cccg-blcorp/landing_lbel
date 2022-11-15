export const setFieldsTypes = () => {

	const inputNumbers = Array.from(document.querySelectorAll('input[data-type="number"]'))

	inputNumbers.map(input => {
		input.addEventListener('input', e => {
			e.target.value = e.target.value.replace(/[^0-9]/g, '')
			input.dispatchEvent(new Event('input:on-number'))
		})
	})

}

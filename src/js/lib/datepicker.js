import { Datepicker } from 'vanillajs-datepicker'
import es from 'vanillajs-datepicker/locales/es'

const datepickers = Array.from(document.querySelectorAll('input[data-type="date-picker"]'))

Object.assign(Datepicker.locales, es)

let pickers = {
	bd: null
}

export const updateDatepicker = (name, date) => {
	if (pickers.hasOwnProperty(name)) {
		pickers[name].setDate(date)
	}
}

export const refreshDatepicker = (name) => {
	if (pickers.hasOwnProperty(name)) {
		pickers[name].update()
	}
}

export const mountDatepickers = () => {
	
	datepickers.forEach(datepicker => {

		const name = datepicker.getAttribute('name')

		pickers[name] = new Datepicker(datepicker, {
			format: 'dd/mm/yyyy',
			autohide: true,
			maxDate: new Date(),
			language: 'es',
			weekStart: '1',
			maxView: 2,
		})

	})

}

export const calculateAge = (birthDay, monthDay, birthYear) => {
	
	const dateNow = new Date()

	let nowYear = dateNow.getYear()
	let nowMonth = dateNow.getMonth()
	let nowDay = dateNow.getDate()

	let age = (nowYear + 1900) - birthYear

	if (nowMonth < (monthDay - 1)) {
		age--
	}

	if (((monthDay - 1) == nowMonth) && (nowDay < birthDay)) {
		age--
	}

	if (age > 1900) {
		age -= 1900
	}

	return age

}

export const calculateLegalAge = date => {

	//valida fecha en formato aaaa-mm-dd
	let currentDate = date.split('-')

	let year = currentDate[0]
	let month = currentDate[1]
	let day = currentDate[2]

	let template = new Date(year, month - 1, day) // mes empieza de cero Enero = 0, Diciembre = 11
	let today = new Date()

	// let currentYears = today.getTime() / 365 / 24 / 60 / 60 / 1000
	// let fecha_to_years = template.getTime() / 365 / 24 / 60 / 60 / 1000

	if (!template || template.getFullYear() == year && template.getMonth() == month - 1 && template.getDate() == day) {
		let currentAge = calculateAge(day, month, year)
		if (currentAge >= 18) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
	
}

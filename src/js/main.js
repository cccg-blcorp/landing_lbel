import { redirect } from './app/services'
import { showPageError } from './lib/errors'
import { getParameterByName } from './helpers/utils'

const DEFAULT_EMAIL_PARAMETER = 'e'

window.addEventListener('DOMContentLoaded', async () => {

	try {
		
    let response = await redirect()
		let countriesAllowed = ['MX', 'CO', 'DO', 'EC', 'CL', 'PE', 'BO', 'CR', 'GT', 'PA', 'SV']
    let country = response.country_code

		if (countriesAllowed.includes(country)) {
			
			const email = getParameterByName(DEFAULT_EMAIL_PARAMETER)
			
			if (email.trim() === '') {
				window.location = `./${country.toLowerCase()}`
			} else {
				window.location = `./${country.toLowerCase()}/?e=${email.trim()}`
			}

		} else {
			window.location = './nocampaign'
		}
		
	} catch (error) {
		showPageError('server')
		console.error('redirect-status:', 'service-save-update error')
		console.error(error)
	}
	
})

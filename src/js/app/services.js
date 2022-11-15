import axios from 'axios'
import { updateStaticState } from './state'

const URL_BASE = 'https://l2gyqis94i.execute-api.us-east-1.amazonaws.com/production'
const MAX_ATTEMPTS = 5

export const login = data => {

	const url = URL_BASE + 'user-login'
	
	return new Promise(async (resolve, reject) => {

		let attempts = 1
		let attempt = 1

		let response

		try {
			
			do {

				if (__isDev) console.log('service-login:', '...query loading')

				response = await axios({
					method: 'post',
					url: url,
					data: JSON.stringify(data),
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
				})

				if (response.status === 200) {
					attempt = attempts
					attempts = 10000
				} else {
					attempts++
				}

			} while (attempts <= MAX_ATTEMPTS)


			if (response.status === 200) {
				if (__isDev) console.log('service-login:', `query completed on attempt ${attempt}`)
				resolve(response.data)
			} else {
				console.error('service-login:', `server error on endpoint ${url}`)
				reject()
			}
			
		} catch (error) {
			console.error('service-login:', `server error on endpoint ${url}`)
			console.error(error)
			reject()
		}

	})
		
}

export const saveUpdate = data => {

	const url = URL_BASE + 'user-save-or-update'
	
	return new Promise(async (resolve, reject) => {

		let attempts = 1
		let attempt = 1

		let response

		try {

			do {

				if (__isDev) console.log('service-save-update:', '...query loading')

				response = await axios({
					method: 'post',
					url: url,
					data: JSON.stringify(data),
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
				})

				if (response.status === 200) {
					if (response.data.code === 1) {
						attempt = attempts
						attempts = 10000
					} else {
						attempts++
					}
				} else {
					attempts++
				}

			} while (attempts <= MAX_ATTEMPTS)

			if (response.status === 200) {
				
				if (__isDev) console.log('service-save-update:', `query completed on attempt ${attempt}`)
				
				updateStaticState('service-save-update', {
					UID: (response.data.hasOwnProperty('uid')) ? (response.data.uid !== '') ? response.data.uid : '' : ''	
				})

				resolve((response.data.code === 1) ? true : false)

			} else {
				console.error('service-save-update:', `server error on endpoint ${url}`)
				reject()
			}
			
		} catch (error) {
			console.error('service-save-update:', `server error on endpoint ${url}`)
			console.error(error)
			reject()
		}

	})

}

export const redirect = () => {
	
	const url = URL_BASE + 'check-ip'

	return new Promise(async (resolve, reject) => {

		let attempts = 1
		let attempt = 1

		let response

		try {
			do {

				if (__isDev) console.log('service-check-ip:', '...query loading')

				response = await axios({
					method: 'get',
					url: url,
				})

				if (response.status === 200) {
					attempt = attempts
					attempts = 10000
				} else {
					attempts++
				}

			} while (attempts <= MAX_ATTEMPTS)


			if (response.status === 200) {
				if (__isDev) console.log('service-check-ip:', `query completed on attempt ${attempt}`)
				resolve(response.data)
			} else {
				console.error('service-check-ip:', `server error on endpoint ${url}`)
				reject()
			}

		} catch (error) {
			console.error('service-check-ip:', `server error on endpoint ${url}`)
			console.error(error)
			reject()
		}

	})
	
}

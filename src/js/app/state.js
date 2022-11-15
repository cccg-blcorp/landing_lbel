import { login } from './services'
import { brandName, tokenWebService } from '../config'
import { printResults } from './results'
import { encryptData } from '../helpers/encrypt'
import { getParameterByName } from '../helpers/utils'
import { showPageError } from '../lib/errors'

const DEFAULT_TERMS = '0'
const DEFAULT_PROMOTIONS = '0'
const DEFAULT_RECORD_FINISHED = '0'

const DEFAULT_EMAIL_PARAMETER = 'e'

let state = {
	UID: '',
	e: '', // email: string
	nm: '', // names: string
	ln: '', // lastnames: string
	pn: '', // phone: number
	ct: 'CO', // country: string: CO|CL|EC|MX|PE
	ot: '0', // terms and conditions: 0|1
	op: '0', // promotions: 0|1
	bd: '', // birthday: date
	gd: '', // gender: string
	p1: '', // main needs: string
	p2: '', // favorite producst: string
	dc: '', // DSCTO: string
	rf: '0', // Finished: 0|1
	bn: brandName
}

export const getState = () => {
	return state
}

export const updateState = (location, newState) => {
	
	state = {
		...state,
		...newState
	}

	if (__isDev) console.log(`state-updated-${location}:`, state)
	printResults()

}

export const updateStaticState = (location, newState) => {

	state = {
		...state,
		...newState
	}

	if (__isDev) console.log(`state-updated-${location}:`, state)

}

export const stateEmail = () => {

	return new Promise(resolve => {
		let expRegular = /([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}/
		const email = getParameterByName(DEFAULT_EMAIL_PARAMETER)

		if (expRegular.test(email.trim())) {
			updateState('mount-email', {
				e: email.trim()
			})
		}

		resolve()

	})

}

export const stateLogin = (country) => {

	return new Promise(async (resolve, reject) => {

		let initialData = {
			k: tokenWebService,
			e: state.e
		}

		initialData = encryptData(initialData)

		try {
			
			const dataUser = await login(initialData)
			let newState = {}

			if (dataUser.hasOwnProperty('UID')) newState.UID = (dataUser.UID) ? `${dataUser.UID}` : ''

			if (dataUser.hasOwnProperty('email')) newState.e = (dataUser.email) ? `${dataUser.email}` : ''

			if (dataUser.hasOwnProperty('names')) newState.nm = (dataUser.names) ? `${dataUser.names}` : ''
			if (dataUser.hasOwnProperty('lastname')) newState.ln = (dataUser.lastname) ? `${dataUser.lastname}` : ''
			
			newState.ct = country
			if (dataUser.hasOwnProperty('phone_number')) newState.pn = (dataUser.phone_number) ? `${dataUser.phone_number}` : ''

			if (dataUser.hasOwnProperty('optin_tyc')) newState.ot = (`${dataUser.optin_tyc}`.trim() === '') ? DEFAULT_TERMS : `${dataUser.optin_tyc}`
			if (dataUser.hasOwnProperty('optin_promo')) newState.op = (`${dataUser.optin_promo}`.trim() === '') ? DEFAULT_PROMOTIONS : `${dataUser.optin_promo}`

			if (dataUser.hasOwnProperty('birthday_date')) newState.bd = (dataUser.birthday_date) ? (dataUser.birthday_date.trim() !== 'None') ? `${dataUser.birthday_date}` : '' : ''

			if (dataUser.hasOwnProperty('gender')) newState.gd = (dataUser.gender) ? `${dataUser.gender}` : ''

			if (dataUser.hasOwnProperty('p1')) newState.p1 = (dataUser.p1) ? `${dataUser.p1}` : ''
			if (dataUser.hasOwnProperty('p2')) newState.p2 = (dataUser.p2) ? `${dataUser.p2}` : ''
			
			if (dataUser.hasOwnProperty('discount')) newState.dc = (dataUser.discount) ? `${dataUser.discount}` : ''
			if (dataUser.hasOwnProperty('record_finished')) newState.rf = (dataUser.record_finished) ? (dataUser.record_finished !== '') ? `${dataUser.record_finished}` : DEFAULT_RECORD_FINISHED : DEFAULT_RECORD_FINISHED

			updateState('login', newState)

			if (__isDev) console.log('user-authentication:', (dataUser.code === 1) ? true : false)
			resolve((dataUser.code === 1) ? true : false)
			
		} catch (error) {
			console.error('mount-state:', 'service-login error')
			console.error(error)
			showPageError('server')
			reject()
		}

	})

}

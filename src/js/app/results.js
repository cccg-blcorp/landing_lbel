import { getState } from './state'
import { updateDataLists } from '../lib/datalist'
import { updateDraggables } from '../lib/draggable'
import { updatePhoneFields } from '../lib/fieldphone'

const COUNTRIES = {
	CO: 'Colombia',
	CL: 'Chile',
	EC: 'Ecuador',
	MX: 'México',
	PE: 'Perú',
	PA: 'Panamá',
	GT: 'Guatemala',
	SV: 'El Salvador',
	BO: 'Bolivia',
	CR: 'Costa Rica',
	DO: 'República Dominicana',
}

const COUNTRIES_INTERMS = ['PA', 'GT', 'SV', 'BO', 'CR', 'DO']

const DEFAULT_MAIN_NEEDS = 'Cuidado del rostro,Perfumes,Maquillaje,Cuidado personal'
const DEFAULT_FAVORITE_PRODUCTS = 'Los de tecnología innovadora con resultados comprobados,Los que me ayudan a mantener mi piel sana y joven,Los de ingredientes naturales y sostenibles,Los que regalaría sin dudar,Los ideales para mi piel delicada'

const BUY_LINKS = {
	'perfumes': 'https://lbel.tiendabelcorp.com/%country%/perfumes/c/lbel-03',
	'cuidado del rostro': 'https://lbel.tiendabelcorp.com/%country%/cuidado-de-la-piel/c/lbel-01',
	'maquillaje': 'https://lbel.tiendabelcorp.com/%country%/maquillaje/c/lbel-02',
	'cuidado personal': 'https://lbel.tiendabelcorp.com/%country%/cuidado-personal/c/lbel-04',
}
// https://lbel.tiendabelcorp.com/cl/cuidado-de-la-piel/c/lbel-01

const printSimpleFields = state => {
	document.querySelector('#result-names').innerText = (state.nm !== '' && state.ln !== '') ? `${state.nm} ${state.ln}` : 'N/A'
	document.querySelector('#result-country').innerText = (state.ct !== '') ? (COUNTRIES.hasOwnProperty(state.ct)) ? COUNTRIES[state.ct] : 'N/A' : 'N/A'
	document.querySelector('#result-phone').innerText = (state.pn !== '') ? state.pn : 'N/A'
}

const printGender = state => {
	document.querySelector('#result-gender').innerText = (state.gd !== '') ? `${state.gd.substring(0, 1).toUpperCase()}${state.gd.substring(1, state.gd.length)}` : 'N/A'
}

const printBirthDay = state => {
	let birth = state.bd.split('-')
	document.querySelector('#result-birthday').innerText = (state.bd !== '') ? `${birth[2]}/${birth[1]}/${birth[0]}` : 'N/A'
}

const printMainNeeds = state => {

	let mainNeeds = state.p1.split(',')
	document.querySelector('#result-main-needs').innerHTML = ''


	if (mainNeeds.length > 0) {
		mainNeeds.forEach((mainNeed, index) => {
			document.querySelector('#result-main-needs').innerHTML += `<p>${index + 1}. ${mainNeed}</p>`
		})
	} else {
		document.querySelector('#result-main-needs').innerText = 'N/A'
	}

}

const printFavoriteProducts = state => {

	let favoriteProducts = state.p2.split(',')
	document.querySelector('#result-favorite-products').innerHTML = ''

	if (favoriteProducts.length > 0) {
		favoriteProducts.forEach((favoriteProduct, index) => {
			document.querySelector('#result-favorite-products').innerHTML += `<p>${index + 1}. ${favoriteProduct}</p>`
		})
	} else {
		document.querySelector('#result-favorite-products').innerText = 'N/A'
	}

}

export const updateLinkBuy = state => {

	let mainNeeds = state.p1.split(',')
	mainNeeds = mainNeeds.map(need => {
		return need.toLowerCase().trim()
	})

	let linkBuy = '#'

	if (BUY_LINKS.hasOwnProperty(mainNeeds[0])) {
		linkBuy = BUY_LINKS[mainNeeds[0]]
		linkBuy = linkBuy.replace('%country%', getState().ct.toLowerCase())
	}

	localStorage.setItem('PAGE-LINK-BUY', linkBuy)

}

const updateCountryTerms = () => {
	localStorage.setItem('PAGE-LOCATION-COUNTRY', getState().ct)
}

const printTermsVoucher = () => {
	const texts = {
		'5% OFF': {
			'PE': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CO': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'MX': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'EC': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CL': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
		},
		'10% OFF': {
			'PE': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CO': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'MX': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'EC': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CL': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
		},
		'15% OFF': {
			'PE': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CO': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'MX': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'EC': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CL': '*Aplica 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
		},
		'20% OFF': {
			'PE': '*Válido 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CO': '*Válido 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'MX': '*Válido 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'EC': '*Válido 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
			'CL': '*Válido 1 vez por usuario. Ver <a href="./terminos-y-condiciones.html" target="_blank">TyC</a>',
		},
	}

	const paragraphs = Array.from(document.querySelectorAll('[data-toggle="text-terms-voucher"]'))
	const vouchers = Array.from(document.querySelectorAll('.card-voucher'))

	vouchers.forEach(voucher => {
		const country = getState().ct
		if (COUNTRIES_INTERMS.includes(country)) {
			voucher.style.display = 'none'
		} else {
			voucher.style.display = 'block'
		}
	})

	paragraphs.forEach(paragraph => {
		const dc = paragraph.getAttribute('data-dc')
		const country = getState().ct
		const step = texts[dc]
		const terms = step[country]

		paragraph.innerHTML = terms
	})
}

const printConfirmData = state => {

	printSimpleFields(state)
	printGender(state)
	printBirthDay(state)
	printMainNeeds(state)
	printFavoriteProducts(state)

}

export const printResults = () => {

	const state = getState()

	for (const key in state) {

		const fields = Array.from(document.querySelectorAll(`input[name="${key}"]`))

		if (fields.length > 0) {
			fields.forEach(field => {

				const type = field.getAttribute('type')
				const dataType = field.getAttribute('data-type')

				if (type === 'checkbox') {
					field.checked = (state[key] === '1') ? true : false
				} else if (dataType === 'date-picker') {
					if (state[key] !== '') {
						const date = state[key].split('-')
						field.value = `${date[2]}/${date[1]}/${date[0]}`
					} else {
						field.value = ''
					}
				} else {
					if (key === 'p1') {
						field.value = (state.p1 === '') ? DEFAULT_MAIN_NEEDS : state.p1
					} else if (key === 'p2') {
						field.value = (state.p2 === '') ? DEFAULT_FAVORITE_PRODUCTS : state.p2
					} else {
						field.value = state[key]
					}
				}
				
			})
		}

	}

	printTermsVoucher()

	printConfirmData(state)

	updateLinkBuy(state)
	updateCountryTerms()

	updatePhoneFields()
	updateDraggables()
	updateDataLists()

}

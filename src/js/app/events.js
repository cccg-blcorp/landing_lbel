const trueSession = '+q2zY1iLQAr9ZPfNgUgSS4TglTYCWQaieY5LMLPH5AM=' // 1
const falseSession = 'ng3I/uQttnHX1/EFFjFj3Rv/nNRfE2upZOenQbEsXPE=' // 0

export const mountDataLayerSession = () => {
	localStorage.setItem('PAGE-SESSION', falseSession)
}

export const startDataLayerSession = (uid, location) => {

	const isAllowedSession = localStorage.getItem('PAGE-SESSION')

	if (isAllowedSession === trueSession) {
		if (__isDev) console.log('events-data-layer-session: already started')
		return
	}

	if (isAllowedSession === falseSession) {

		const idCDC = uid
		const yieldify_campaign = 0
		const marketing_boolean = true

		if (uid === '') {
			if (__isDev) console.log('events-data-layer-session: uid is empty')
			return
		}

		const data = {
			'event': 'virtualEvent',
			'category': 'form :: conociendonos lbel',
			'action': 'interaction :: enviado',
			'label': `suscribirme`,
			'dimension4': idCDC
		}

		/**
		 *
		{
			‘event’ : ‘virtualEvent’,
			‘category’ : ‘form :: conociendonos lbel’,
			‘action’ : ‘interaction :: enviado’,
			‘label’ : ‘suscribirme’,
			‘dimension4’ : ‘{UID CDC}’

		}
		 */

		if (__isDev) console.log(`events-data-layer-session: start on ${location}`, data)
		
		dataLayer.push(data)

		if (__isDev) console.log('dataLayer-updated:', dataLayer)
		if (__isDev) console.log(`events-data-layer-session: sent on ${location}`)

		localStorage.setItem('PAGE-SESSION', trueSession)

	} else {

		if (__isDev) console.log('events-data-layer-session: status undefined')
		return

	}

}

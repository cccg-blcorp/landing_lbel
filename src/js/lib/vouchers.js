export const showVoucher = id => {

	const SECONDS_TO_HIDE = 15000
	
	let timer = null
	let timerShow = null
	
	const section = document.querySelector(`section#${id}`)
	const voucher = section.querySelector('.card-voucher')

	if (!voucher) return

	const buttonShowVoucher = voucher.closest('.card').querySelector('.progressive-show')
	const buttonCloser = voucher.querySelector('[data-toggle="close-voucher"]')

	clearTimeout(timerShow)

	setTimeout(() => {
		voucher.classList.add('show')
	}, 100)
	
	clearTimeout(timer)

	timer = setTimeout(() => {

		clearTimeout(timer)
		clearTimeout(timerShow)

		voucher.classList.remove('show')
		buttonShowVoucher.classList.add('show')

	}, SECONDS_TO_HIDE)

	buttonCloser.onclick = () => {

		clearTimeout(timer)
		clearTimeout(timerShow)

		voucher.classList.remove('show')
		buttonShowVoucher.classList.add('show')

	}

	buttonShowVoucher.onclick = () => {
		
		buttonShowVoucher.classList.remove('show')

		clearTimeout(timerShow)

		timerShow = setTimeout(() => {
			voucher.classList.add('show')
		}, 100)
		
		clearTimeout(timer)

		timer = setTimeout(() => {
			voucher.classList.remove('show')
			buttonShowVoucher.classList.add('show')
		}, SECONDS_TO_HIDE)

	}

}

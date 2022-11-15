import Sortable from 'sortablejs'

const drags = Array.from(document.querySelectorAll('.form-drag'))

export const removeDragAnimation = () => {

	drags.forEach(drag => {
		
		const dragContainer = drag.querySelector('.form-drag-options')
		const dragOptions = Array.from(dragContainer.querySelectorAll('.form-drag-option'))
		
		dragOptions.forEach(option => {
			option.classList.remove('is-animated')
		})

	})

}

export const addDragAnimation = (dragOptions, indexOption) => {

	dragOptions.forEach((option, index) => {
		if (index === indexOption) {
			option.classList.add('is-animated')
		}
	})

}

export const updateDraggables = () => {

	drags.forEach(drag => {

		const input = drag.querySelector('input[type="hidden"]')
		const dragContainer = drag.querySelector('.form-drag-options')
		const dragOptions = Array.from(dragContainer.querySelectorAll('.form-drag-option'))

		const order = input.value.split(',')
		
		order.forEach(item => {
			const [option] = dragOptions.filter(option => option.getAttribute('data-value').trim().toLowerCase() === item.trim().toLowerCase())
			if (option) dragContainer.append(option)
		})


	})

}

export const mountDraggables = () => {

	drags.forEach(drag => {

		const input = drag.querySelector('input[type="hidden"]')
		const dragContainer = drag.querySelector('.form-drag-options')

		const getOptions = () => Array.from(dragContainer.querySelectorAll('.form-drag-option'))
		
		input.value = ''

		Sortable.create(dragContainer, {

			animation: 150,
			forceFallback: true,

			onMove: () => {
				removeDragAnimation()
			},
			
			onEnd: (event) => {

				const values = getOptions().map(option => option.getAttribute('data-value'))
				input.value = values.toString()
				input.dispatchEvent(new Event('input:on-update'))

				addDragAnimation(getOptions(), event.newIndex)
				
			}
			
		})

	})

}

export const mounInfoDrags = () => {

	const buttons = Array.from(document.querySelectorAll('[data-toggle="info-drag"]'))
	const buttonsCloser = Array.from(document.querySelectorAll('[data-toggle="close-info-drag"]'))
	
	buttons.forEach(button => {
		
		const content = document.querySelector(button.getAttribute('data-target'))

		button.onclick = () => {
			if (content.classList.contains('is-show')) {
				content.classList.remove('is-show')
			} else {
				content.classList.add('is-show')
			}
		}

		document.addEventListener('click', event => {
			const isClickInsideButton = button.contains(event.target)
			const isClickInsideContent = content.contains(event.target)
			if (!isClickInsideButton && !isClickInsideContent) content.classList.remove('is-show')
		})

	})

	buttonsCloser.forEach(button => {
		const content = button.closest('.form-drag-info-content')
		button.onclick = () => content.classList.remove('is-show')
	})

}

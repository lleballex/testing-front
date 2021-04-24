import Vue from 'vue'

const activation = (event, el) => {
	event.stopPropagation()
	if(!el.classList.contains('blur-active')) {
		el.classList.add('blur-active')
	}
}

const bluring = (event, el, binding) => {
	if(el.classList.contains('blur-active')) {
		el.classList.remove('blur-active')
		binding()
	}
}

Vue.directive('blur', {
	bind(el, binding) {
		el.addEventListener('click', e => activation(e, el))
		document.body.addEventListener('click', e => bluring(e, el, binding.value))
	},
	unbind(el, binding) {
		el.removeEventListener('click', () => activation(el))
		document.body.removeEventListener('click', e => bluring(e, el, binding.value))
	}
})
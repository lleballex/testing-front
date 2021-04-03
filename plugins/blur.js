import Vue from 'vue'

const bluring = (event, el, binding) => {
	if(el.classList.contains('active'))
		binding()
}

Vue.directive('blur', {
	bind(el, binding) {
		el.addEventListener('click', e => e.stopPropagation())
		document.body.addEventListener('click', e => bluring(e, el, binding.value))
	},
	unbind(el, binding) {
		document.body.removeEventListener('click', e => bluring(e, el, binding.value))
	}
})
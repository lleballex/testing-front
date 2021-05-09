import Vue from 'vue'

Vue.directive('extclick', {
	bind(el, binding) {
		el.extclick = event => {
			if(!el.contains(event.target)) {
				if(typeof(binding.value) == 'function') {
					binding.value()
				} else {
					binding.value[0](...binding.value[1])
				}
			}
		}
		document.body.addEventListener('click', el.extclick)
	},
	unbind(el, binding) {
		document.body.removeEventListener('click', el.extclick)
	}
})
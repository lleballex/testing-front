export const namespaced = () => (false)

export const state = () => ({
	show: false,
	type: '',
	text: ''
})

export const getters = {
	show: (state) => (state.show),
	type: (state) => (state.type),
	text: (state) => (state.text)
}

export const mutations = {
	show: (state, { type, text }) => {
		state.show = true
		state.type = type
		state.text = text
	},

	hide: (state) => {
		state.show = false
		state.type = ''
		state.text = ''
	}
}

export const actions = {
	show: ({ state, commit }, { type, text }) => {
		function mutation() {
			commit('show', {
				type: type,
				text: text
			})
		}

		if(state.show) {
			commit('hide')
			setTimeout(() => mutation(), 500)
		} else mutation()
	}
}
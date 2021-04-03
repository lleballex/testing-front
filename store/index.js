/*export const actions = {
	nuxtServerInit: (context, { $axios, store }) => {
		var token = localStorage.getItem('auth_token')
		if(!token) return

		$axios.post('account/token/check_token/', {
			token: token
		}).then(response => {
			store.commit('setUser', {
				username: response.data.username,
				hasNotifications: response.data.has_notifications
			})
			$axios.defaults.headers.common['auth-token'] = response.data.token
		})
	},
}*/

export const utils = {
	error: {success: false},

	success: {success: true},

	errorMessage: (dispatch, text) => {
		if(!text) text = 'Ой-ой... Что-то пошло не так'

		dispatch('messages/show', {
			type: 'error',
			text: text
		})
	},

	check: (response, status, detail) => {
		return response.status == status && response.detail == detail
	}
}
export default async function({ $cookies, $axios, store }) {
	var token = $cookies.get('authToken')

	if(token) {
		await $axios.post('account/token/check_token/', {
			token: token
		}, {messages: {
			show: false
		}}).then(response => {
			store.commit('account/setUser', {
				username: response.data.username,
				hasNotifications: response.data.has_notifications
			})
			$axios.defaults.headers.common['auth-token'] = token
		}).catch(() => {
			$cookies.remove('authToken')
		})
	}
}
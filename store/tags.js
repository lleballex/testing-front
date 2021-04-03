export const actions = {
	getTags() {
		return this.$axios.get('tags/', {messages: {
			error: 'При загрузге тегов произошла ошибка'
		}}).then(response => ({
			success: true,
			data: response.data
		})).catch(error => ({
			success: false
		}))
	}
}
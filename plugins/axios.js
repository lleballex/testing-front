const defaultErrorMessage = 'Ой-ой! Что-то пошло не так...'

export default function({ $axios, store }) {
	$axios.interceptors.request.use(config => {
		if(config.messages == undefined)
			config.messages = {}

		if(config.messages.show == undefined)
			config.messages.show = true

		if(config.messages.error == undefined || config.messages.error == true)
			config.messages.error = defaultErrorMessage

		if(config.messages.notFound == undefined || config.messages.notFound == true)
			config.messages.notFound = 'Объект не найден'

		return config
	}, error => {
		return Promise.reject(error)
	})

	$axios.interceptors.response.use(response => {
		var messages = response.config.messages

		if(messages.success) {
			store.dispatch('messages/show', {
				type: 'success',
				text: messages.success
			})
		}

		return response
	}, error => {
		var status = error.response.status
		var messages = error.config.messages
		var message = ''

		if(messages.notFound && status == 404)
			message = messages.notFound
		else if(messages.error)
			message = messages.error
		else {
			return Promise.reject({
				detail: error.response.data.detail,
				...error.response
			})
		}

		if(messages.show) {
			store.dispatch('messages/show', {
				type: 'error',
				text: message
			})
		} else {
			return Promise.reject({
				message: message,
				status: status,
				statusCode: status,
			})
		}

		return Promise.reject(false)
	})
}
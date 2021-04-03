import axios from 'axios'
import { utils } from '.'

export const state = () => ({
	isAuthenticated: false,
	hasNotifications: false,
	username: ''
})

export const getters = {
	isUserAuth: (state) => (state.isAuthenticated),
	hasNotifications: (state) => (state.hasNotifications),
	username: (state) => (state.username)
}

export const mutations = {
	setUser: (state, { username, hasNotifications }) => {
		state.isAuthenticated = true
		state.hasNotifications = hasNotifications
		state.username = username
	},

	clearUser: (state) => {
		state.isAuthenticated = false
		state.hasNotifications = false
		state.username = ''
	}
}

export const actions = {
	authenticate({ commit }, { username, password }) {
		return this.$axios({
			method: 'post',
			url: 'account/token/get_token/',
			data: {
				username: username,
				password: password
			},
			messages: {
				error: false,
				success: 'Рад снова тебя видеть'
			}
		}).then(response => {
			commit('setUser', {
				username: response.data.username,
				hasNotifications: response.data.has_notifications
			})

			var token = response.data.token
			localStorage.auth_token = token
			this.$axios.defaults.headers.common['auth-token'] = token

			return utils.success
		}).catch(error => {
			if(!error) return utils.error

			if(utils.check(error, 400, 'Username or password is invalid')) {
				utils.errorMessage(this.dispatch,
								   'Хм... Кажется, у тебя где-то ошибка')
			} else
				utils.errorMessage(this.dispatch)

			return utils.error
		})
	},

	register(context, { username, email, password }) {
		return this.$axios({
			method: 'post',
			url: 'account/users/',
			data: {
				username: username,
				email: email,
				password: password
			},
			messages: {
				success: 'Поздравляю! Теперь ты можешь войти в свой аккаунт',
				error: false
			}
		}).then(response => (
			utils.success
		)).catch(error => {
			if(!error) return utils.error

			var message = ''

			switch(error.data[Object.keys(error.data)[0]][0]) {
				case 'Enter a valid email address.':
					message = 'Необходимо вести корректный email'
					break
				case 'user with this username already exists.':
					message  = 'Данный логин уже используется'
					break
				case 'user with this email already exists.':
					message = 'Данный email уже используется'
					break
				case 'This password is too short. It must contain at least 8 characters.':
					message = 'Минимальная длина парола - 8 символов'
					break
				case 'This password is too common.':
					message = 'Мне кажется, это очень легкий пароль'
					break
				case 'This password is entirely numeric.':
					message = 'Добавь в пароль немного букв'
					break
				case 'The password is too similar to the username.':
					message = 'Твой пароль уж очень напоминает введенный логин'
					break
				case 'The password is too similar to the email.':
					message = 'Твой пароль уж очень напоминает введеный email'
					break
			}

			utils.errorMessage(this.dispatch, message)

			return utils.error
		})
	},

	logout({ commit }) {
		commit('clearUser')
		delete localStorage.auth_token
		delete this.$axios.defaults.headers.common['auth-token']
	} 
}
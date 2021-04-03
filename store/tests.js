import { utils } from '.'

const authCheck = (getters, dispatch) => {
	if(getters['account/isUserAuth']) return true

	dispatch('messages/show', {
		type: 'error',
		text: 'Необходимо авторизоваться'
	})
	return false
}

export const actions = {
	like({ rootGetters }, { id }) {
		if(!authCheck(rootGetters, this.dispatch))
			return utils.error

		return this.$axios.post(`tests/${id}/like/`).then(response => ({
			data: response.data,
			success: true
		})).catch(error => (utils.error))
	},

	dislike({ rootGetters }, { id }) {
		if(!authCheck(rootGetters, this.dispatch))
			return utils.error

		return this.$axios.post(`tests/${id}/dislike/`).then(response => ({
			data: response.data,
			success: true
		})).catch(error => (utils.error))
	}
}
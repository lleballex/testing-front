<template>
	<form @submit.prevent="login" class="auth-form">
		<div class="auth-form__title">Вход</div>
		<input
			v-model="username"
			class="auth-form__field"
			type="text"
			placeholder="Логин"
			required
		>
		<input
			v-model="password"
			class="auth-form__field"
			type="password"
			placeholder="Пароль"
			required
		>
		<button class="auth-form__submit-btn">
			<icon
				v-if="loading"
				icon="pencil-alt"
				class="auth-form__submit-btn-icon"
				spin
			/>
			Войти
		</button>
		<NuxtLink to="/register/" class="auth-form__extra-link">
			Создать аккаунт
		</NuxtLink>
	</form>
</template>

<script>
	import '@/assets/css/account/auth-form.css'

	export default {
		head: () => ({
			title: 'Вход в аккаунт | Tests for everyone'
		}),
		data: () => ({
			username: '',
			password: '',
			loading: false
		}),
		methods: {
			login() {
				this.loading = true

				this.$store.dispatch('account/authenticate', {
					username: this.username,
					password: this.password
				}).then(answer => {
					this.loading = false
					if(answer.success) this.$router.push('/')
				})
			}
		}
	}
</script>
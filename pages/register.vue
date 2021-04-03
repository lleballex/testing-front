<template>
	<form @submit.prevent="registration" class="auth-form">
		<div class="auth-form__title">Регистрация</div>
		<input
			v-model="username"
			class="auth-form__field"
			type="text"
			placeholder="Логин"
			required
		>
		<input
			v-model="email"
			class="auth-form__field"
			type="email"
			placeholder="Email"
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
			Создать аккаунт
		</button>
		<NuxtLink to="/login/" class="auth-form__extra-link">
			Войти в аккаунт
		</NuxtLink>
	</form>
</template>

<script>
	import '@/assets/css/account/auth-form.css'

	export default {
		head: () => ({
			title: 'Создание аккаунта | Tests for everyone'
		}),
		data: () => ({
			username: '',
			email: '',
			password: '',
			loading: false
		}),
		methods: {
			registration() {
				this.loading = true

				this.$store.dispatch('account/register', {
					username: this.username,
					email: this.email,
					password: this.password
				}).then(answer => {
					this.loading = false
					if(answer.success) this.$router.push('/login/')
				})
			}
		}
	}
</script>
<template>
	<div class="navbar">
		<NuxtLink to="/" class="navbar__logo">
				<img src="@/assets/images/logo.svg">
		</NuxtLink>
		<ul class="navbar__main-menu">
			<li>
				<NuxtLink to="/" class="navbar__main-link" exact>
					Тесты
				</NuxtLink>
				<ul v-if="isUserAuth" class="navbar__extra-menu">
					<li>
						<NuxtLink to="/tests/solved/" class="navbar__extra-link">
	 						Решенные
						</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/tests/new/" class="navbar__extra-link">
							Новый тест
						</NuxtLink>
					</li>
				</ul>
			</li>
			<li v-if="isUserAuth">
				<NuxtLink to="/" class="navbar__main-link">
					{{username}}
				</NuxtLink>
				<ul class="navbar__extra-menu">
					<li>
						<span @click="$store.dispatch('account/logout')" class="navbar__extra-link">
							Выйти
						</span>
					</li>
				</ul>
			</li>
			<li v-else>
				<NuxtLink to="/login/" class="navbar__main-link">
					Войти
				</NuxtLink>
				<ul class="navbar__extra-menu">
					<li>
						<NuxtLink to="/register/" class="navbar__extra-link">
							Регистрация
						</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters('account', [
				'isUserAuth',
				'username'
			])
		}
	}
</script>

<style scoped>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em 0;
		font-size: 1.2rem;
	}

	.navbar__logo img {
		display: block;
		width: 3.5rem;
		height: 3.5rem;
	}

	.navbar__main-menu {
		display: flex;
		list-style: none;
	}

	.navbar__main-menu > li {
		position: relative;
		margin-left: 3em;
	}

	.navbar__main-link {
		position: relative;
		color: #fff;
		text-decoration: none;
		text-transform: uppercase;
		transition: .2s;
	}

	.navbar__main-link:hover {
		color: #fce38a;
	}

	.navbar__main-link:after {
		content: '';
		position: absolute;
		top: -.4em;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(to right, #F14D5C, #FDC70C);
		transition: .7s;
	}

	.navbar__main-link.active:after {
		width: 100%;
	}

	.navbar__main-link:hover + .navbar__extra-menu,
	.navbar__extra-menu:hover {
		max-height: 100px;
		opacity: 1;
	}

	.navbar__extra-menu {
		position: absolute;
		top: 1.4em;
		right: -3px;
		max-height: 0;
		opacity: 0;
		z-index: 1;
		overflow: hidden;
		background: #fff;
		border: 3px solid #2a2a2a;
		border-radius: 7px;
		list-style: none;
		white-space: nowrap;
		transition: .4s;
	}

	.navbar__extra-link {
		display: block;
		padding: .29em .55em;
		border-bottom: 1px solid powderblue;
		color: #3498db;
		font-size: .9em;
		text-decoration: none;
		transition: .2s;
	}

	.navbar__extra-link:hover {
		background: #eee;
		cursor: pointer;
	}

	.navbar__extra-menu > li:last-child > .navbar__extra-link {
		border-bottom: none;
	}
</style>
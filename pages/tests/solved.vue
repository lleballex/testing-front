<template>
	<Loading v-if="loading" />
	<div v-else>
		Hello world
	</div>
</template>

<script>
	export default {
		middleware: 'authenticated',
		head: () => ({
			title: 'Мои тесты | Tests for everyone'
		}),
		data: () => ({
			loading: true
		}),
		asyncData({ error }) {
			error({
				statusCode: 302,
				message: 'Здесь ведутся строительные работы...'
			})
		}
	}
</script>
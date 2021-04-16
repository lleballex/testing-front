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
		fetch() {
			this.loading = false
		}
	}
</script>
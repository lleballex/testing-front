<template>
	<Editor :create="create"/>
</template>

<script>
	export default {
		components: {
			Editor: () => import('~/components/tests/editor/Editor.vue')
		},
		methods: {
			create() {
				alert('creating')
			}
		}
	}
</script>
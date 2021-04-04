<template>
	<div class="test">
		<div>
			<div
				ref="title"
				class="test__title content__block"
				data-placeholder="Название"
				contenteditable
			></div>
			<div
				куа="description"
				class="test__description content__block mb"
				data-placeholder="Описание (необязательно)"
				contenteditable
			></div>
		</div>
		<div class="content__block mb">
			Настройки
		</div>
		<Questions ref="questions" />
		<FinishButtons
			ref="finishButtons"
			:success="create"
			:cancel="clear"
			successTitle="Создать тест"
			cancelTitle="Очистить все"
		/>
	</div>
</template>

<script>
	import '~/assets/css/tests/test.css'

	export default {
		props: ['create'],
		components: {
			Questions: () => import('~/components/tests/editor/Questions.vue')
		},
		methods: {
			clear() {
				console.log(this.$refs.questions.questions)
			}
		}
	}
</script>

<style scoped>
	div [contenteditable] {
		outline: none;
	}

	div [contenteditable][data-placeholder]:empty:before {
		content: attr(data-placeholder);
		color: #666;
		cursor: text;
	}
</style>
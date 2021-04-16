<template>
	<div class="test">
		<div>
			<div
				@input="title = $event.target.innerText"
				class="test__title content__block"
				data-placeholder="Название"
				contenteditable
			></div>
			<div
				@input="description = $event.target.innerText"
				class="test__description content__block mb"
				data-placeholder="Описание (необязательно)"
				contenteditable
			></div>
		</div>
		<div class="content__block mb">
			<div>
				*image editor*
			</div>
			<div>
				<label>
					<input v-model="isPrivate" type="checkbox">
					<span class="checkbox"></span>
					<span>Приватный тест</span>
				</label>
				<TagsForm />
			</div>
		</div>
		<Questions ref="questions" />
		<FinishButtons
			ref="finishButtons"
			:success="action"
			:cancel="clear"
			successTitle="Создать тест"
			cancelTitle="Очистить все"
		/>
	</div>
</template>

<script>
	import '~/assets/css/tests/test.css'

	export default {
		props: ['action'],
		data: () => ({
			title: '',
			description: '',
			isPrivate: false
		}),
		components: {
			Questions: () => import('~/components/tests/editor/Questions.vue'),
			TagsForm: () => import('~/components/tags/Form.vue')
		},
		methods: {
			clear() {
				console.log(this.$refs.questions.questions)
			},

			check() {
				if(!this.title) {
					this.$store.dispatch('messages/show', {
						type: 'error',
						text: 'Необходимо ввести название теста'
					})
					return false
				}
				return true
			},

			getQuestions() {
				return this.$refs.questions.getQuestions()
			},

			startLoading() {
				this.$refs.finishButtons.loading = true
			},

			stopLoading() {
				this.$refs.finishButtons.loading = false
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
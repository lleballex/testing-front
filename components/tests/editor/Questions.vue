<template>
	<div>
		<div v-for="(question, index) in questions" class="content__block mb">
			<div class="test__question-title">
				<span>{{index + 1}}.</span>
				<div
					@input="question.condition = $event.target.innerText"
					class="test__question-title-input"
					data-placeholder="Вопрос"
					contenteditable
				></div>
			</div>
			<div class="test__question-answer">
				<div v-if="question.answer_type == 'RADIOS'" class="test__question-radios">
					<label v-for="(option, optionIndex) in question.answer_options" class="test__question-radio">
						<input :value="option" :name="index" type="radio">
						<span class="radio"></span>
						<input
							v-model="question.answer_options[optionIndex]"
							type="text"
							placeholder="Вариант ответа"
						>
						<icon
							@click.prevent="question.answer_options.splice(optionIndex, 1)"
							icon="times"
							class="test__remove-question-radio"
						/>
					</label>
					<icon
						@click="question.answer_options.push('')"
						icon="plus"
						class="test__add-question-radio"
					/>
				</div>
				<input
					v-else
					v-model="question.answer"
					:type="question.answer_type"
					placeholder="Правильный ответ"
				>
				<Select
					v-model="question.answer_type"
					:items="{TEXT: 'Текст', NUMBER: 'Число', RADIOS: 'Один из списка'}"
					class="test__question-type"
				/>
			</div>
		</div>
		<button
			@click="addQuestion"
			class="test__add-question"
			title="Добавить вопрос"
		>
			<icon icon="plus" />
		</button>
	</div>
</template>

<script>
	export default {
		data: () => ({
			questions: []
		}),
		methods: {
			_showError(message) {
				this.$store.dispatch('messages/show', {
					type: 'error',
					text: message
				})
			},

			addQuestion() {
				this.questions.push({
					condition: '',
					answer: '',
					answer_type: 'TEXT',
					answer_options: ['']
				})
			},

			getQuestions() {
				if(this.questions.length == 0) {
					this._showError('Создай хотя бы один вопрос')
					return false
				}

				var check = this.questions.every((item, index) => {
					if(!item.condition) {
						this._showError('Необходимо указать все вопросы')
						return false
					}

					if(item.answer_type == 'RADIOS') {
						var radios = document.querySelectorAll(`.test__question-radio > input[type="radio"][name="${index}"]`)

						if(radios.length == 0) {
							this._showError('У каждого вопроса должен быть ответ')
							return false
						}

						var radiosCheck = true
						radios.forEach(item => {
							if(!item.value) {
								this._showError('Необходимо заполнить все ответы')
								radiosCheck = false
							}
						})
						if(!radiosCheck) return false

						var answer = document.querySelector(`.test__question-radio > input[type="radio"][name="${index}"]:checked`)
						if(!answer) {
							this._showError('У каждого вопроса должен быть ответ')
							return false
						}
						item.answer = answer.value
					} else {
						item.answer_options = []
					}

					if(!item.answer) {
						this._showError('У каждого вопроса должен быть ответ')
						return false
					}

					return true
				})

				return check ? this.questions : false
			}
		}
	}
</script>

<style scoped>
	.test__question-title {
		display: flex;
	}

	.test__question-title-input{
		width: 100%;
		outline: none;
	}

	.test__question-title-input:empty:before {
		content: attr(data-placeholder);
		color: #666;
		cursor: text;
	}

	.test__question-answer {
		display: flex;
		align-items: flex-start;
	}

	.test__question-type {
		flex-shrink: 0;
		margin-left: 1em;
		padding: .5em .7em;
		border: 2px solid #2980b9;
		font-size: .95em;
	}

	.test__question-radios,
	.test__question-radio {
		width: 100%;
	}

	.test__remove-question-radio {
		margin-left: 0.4em;
		cursor: pointer;
	}

	.test__add-question-radio {
		margin: auto;
		margin-top: 0.8em;
		transition: .2s;
	}

	.test__add-question-radio:hover {
		transform: scale(1.1, 1.1);
		cursor: pointer;
	}

	.test__add-question {
		display: block;
		margin: auto;
		margin-bottom: 1.875rem;
		border: none;
		width: 3.1em;
		height: 3.1em;
		background: #fff;
		border-radius: 50%;
		font-size: 1.8em;
		transition: .3s;
	}

	.test__add-question:hover {
		cursor: pointer;
		transform: scale(1.1, 1.1);
	}
</style>
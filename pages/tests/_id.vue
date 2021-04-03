<template>
	<Loading v-if="loading" />
	<div v-else class="test-container">
		<div class="test__options">
			<ul title="Рейтинг">
				<li @click="like" :class="test.is_liked_user ? 'active' : ''">
					<icon icon="chevron-up" class="test__options-icon" />
				</li>
				<li class="not-clickable">{{test.rating}}</li>
				<li @click="dislike" :class="test.is_disliked_user ? 'active' : ''">
					<icon icon="chevron-down" class="test__options-icon" />
				</li>
			</ul>
		</div>
		<div class="test">
			<div>
				<div class="test__title content__block">{{test.title}}</div>
				<div class="test__description content__block mb">
					<div>Автор: {{test.user.username}}</div>
					<div>{{test.description}}</div>
				</div>
			</div>
			<div v-for="(question, index) in test.questions" class="content__block mb">
				<div class="test__question-title">
					<span>{{index}}.</span>
					<span>{{question.condition}}</span>
				</div>
				<div class="test__question-answer">
					<div v-if="question.answer_type == 'RADIOS'" class="test__question-radios">
						<label v-for="option in question.answer_options" class="test__question-radio">
							<input
								v-model="answers[index]"
								:value="option"
								:name="index"
								type="radio"
							>
							<span class="radio"></span>
							<span>{{option}}</span>
						</label>
					</div>
					<input
						v-else
						v-model="answers[index]"
						:type="question.answer_type"
						placeholder="Твой ответ"
					>
				</div>
			</div>
			<FinishButtons
				ref="finishButtons"
				:success="finish"
				:cancel="clear"
				successTitle="Завершить тест"
				cancelTitle="Очистить все"
			/>
		</div>
	</div>
</template>

<script>
	import '~/assets/css/tests/test.css'

	export default {
		data() {
			return {
				loading: true,
				id: this.$route.params.id,
				test: null,
				answers: [],
				dateStarted: 0
			}
		},
		async fetch() {
			await this.$axios.get(`tests/${this.id}/`, {messages: {
				show: false,
				error: false,
				notFound: 'Кажется, такого теста не существует'
			}}).then(response => {
				this.test = response.data
				if(this.test.needs_auth && !this.$store.getters['account/isUserAuth']) {
					this.$nuxt.error({
						statusCode: 403,
						needsAuth: true
					})
				} else this.loading = false
			}).catch(error => {
				if(error.status == 403 &&
					 error.detail == 'You have already solved this test') {
					this.$store.dispatch('messages/show', {
						type: 'error',
						text: 'Ты уже решал (или решала) этот тест'
					})
					this.$router.push('/')
				} else
					this.$nuxt.error(error)
			})
		},
		mounted() {
			this.dateStarted = new Date().getTime()
		},
		methods: {
			finish() {
				if(!confirm('Ты точно хочешь завершить тест?')) return

				var answersLength = 0
				var check = this.answers.every(item => {
					answersLength++;
					return Boolean(item) || typeof(item) == 'number'
				})

				if(!check || answersLength != this.test.questions.length) {
					this.$store.dispatch('messages/show', {
						type: 'error',
						text: 'Необходимо дать ответы на все вопросы'
					})
					return
				}

				this.$refs.finishButtons.loading = true
				this.$axios.post(`tests/${this.id}/check_answers/`, {
					answers: this.answers,
					start_date: this.dateStarted,
					end_date: new Date().getTime()
				}).then(response => {
					this.$store.dispatch('messages/show', {
						type: 'success',
						text: 'Результаты теста успешно сохранены'
					})
					this.$router.push('/')
				})
			},

			clear() {
				if(confirm('Ты точно хочешь удалить все ответы?')) {
					this.answers = []
				}
			},

			like() {
				this.$store.dispatch('tests/like', {
					id: this.id
				}).then(answer => {
					if(answer.success) {
						this.test.rating = answer.data.rating
						this.test.is_liked_user = answer.data.user_exists
						this.test.is_disliked_user = false
					}
				})
			},

			dislike() {
				this.$store.dispatch('tests/dislike', {
					id: this.id
				}).then(answer => {
					if(answer.success) {
						this.test.rating = answer.data.rating
						this.test.is_disliked_user = answer.data.user_exists
						this.test.is_liked_user = false
					}
				})
			}
		}
	}
</script>

<style scoped>
	.test-container {
		display: flex;
		width: 100%;
		font-size: 1rem;
	}

	.test__options {
		display: flex;
		align-self: center;
		margin-right: 1.5em;
		position: sticky;
		top: 0;
		bottom: 0;
		
	}

	.test__options > ul {
		margin: 1em 0;
		color: #2a2a2a;
		font-size: 1.5em;
		list-style: none;
	}

	.test__options > ul > li {
		display: flex;
		justify-content: center;
		padding: .8em;
		background: #f0f7ff;
		text-align: center;
		transition: .3s;
	}

	.test__options > ul > li.active {
		color: #07f;
	}

	.test__options > ul > li.active .test__options-icon {
		animation: activate_icon .5s;
	}

	@keyframes activate_icon {
		0% {transform: scale(1, 1);}
		50% {transform: scale(1.5, 1.5);}
		100% {transform: scale(1, 1);}
	}

	.test__options > ul > li:not(.not-clickable):hover {
		background: #cfe4ff;
		cursor: pointer;
	}

	.test__options > ul > li:first-child {
		border-top-right-radius: .4em;
		border-top-left-radius: .4em;
	}

	.test__options > ul > li:last-child {
		border-bottom-right-radius: .4em;
		border-bottom-left-radius: .4em;
	}
</style>
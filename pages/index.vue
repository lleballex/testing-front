<template>
	<div>
		<form @submit.prevent="search" class="search">
			<div class="search__title">Tests for everyone</div>
			<div class="search__input-area">
				<input
					v-model="query"
					type="text"
					class="search__input"
					placeholder="Поиск теста по ID или названию"
				>
				<button class="search__input-btn">
					<icon v-if="loading" icon="chevron-right" spin />
					<icon v-else icon="chevron-right" />
				</button>
			</div>
			<div class="search__filters">
				<TagsForm ref="tags" @change="search" class="search__tags" />
				<Select
					@change="search"
					v-model="sorting"
					:items="{new: 'Новые', old: 'Старые'}"
					class="search__sorting"
				/>
			</div>
		</form>
		<TestsList
			ref="testsList"
			:asyncTests="tests"
		/>
		<transition name="modal">
			<div v-if="testInfo" class="modal">
				<div class="modal__content">
					<div class="modal__header">
						<span>{{testInfo.title}}</span>
						<icon
							@click="testInfo = false"
							icon="times"
							class="modal__header-icon"
						/>
					</div>
					<div class="modal__body">
						<div>Автор: {{testInfo.user.username}}</div>
						<div>Количество вопросов: {{testInfo.questions}}</div>
					</div>
					<div class="modal__footer">
						<input
							@click="testInfo = false"
							class="modal__cancel-btn"
							type="button"
							value="Отмена"
						>
						<input
							@click="goToTest(testInfo.id)"
							class="modal__success-btn"
							type="button"
							value="Все правильно"
						>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import '~/assets/css/modal.css'

	export default {
		head: () => ({
			title: 'Тесты | Tests for everyone'
		}),
		data: () => ({
			sorting: 'new',
			tags: null,
			query: '',
			loading: false,
			testInfo: false
		}),
		components: {
			TestsList: () => import('@/components/tests/List.vue'),
			TagsForm: () => import('@/components/tags/Form.vue')
		},
		asyncData({ store, $axios, error:nuxtError }) {
			if(process.server) {
				return $axios.get('tests/', {messages: {
					show: false
				}}).then(answer => ({
					tests: answer.data
				})).catch(error => nuxtError(error))
			} else {
				return {tests: null}
			}
		},
		methods: {
			search() {
				if(Number(this.query) && !this.query.includes('.')) {
					// searching a test by id
					this.loading = true

					this.$axios.get(`tests/${this.query}/info/`, {
						messages: {notFound: 'Теста с таким ID не существует'}
					}).then(response => {
						this.loading = false
						this.testInfo = response.data
					})
				} else {
					// searching tests by title
					this.$refs.testsList.search({
						query: this.query,
						sorting: this.sorting,
						tags: this.$refs.tags.addedTags
					})
				}
			},

			goToTest(id) {
				this.$router.push(`/tests/${id}/`)
			}
		}
	}
</script>

<style scoped>
	.search {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		margin-top: 3.125em;
		margin-bottom: 5em;
		width: 37.5em;
		max-width: 100%;
		font-size: 1rem;
	}

	.search__title {
		margin-bottom: 1.5em;
		font-size: 1.3em;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 8px;
	}

	.search__input-area {
		display: flex;
		width: 100%;
	}

	.search__input {
		width: 100%;
		padding: 1em;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		border: none;
		background: #fff;
		font-size: 1em;
		color: #444;
		letter-spacing: 2px;
		transition: .3s;
	}

	.search__input:focus {
		box-shadow: 0 0 0 4px #bdc3c7;
	}

	.search__input-btn {
		padding: 1em;
		background: #3498db;
		border: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		font-size: 1em;
		color: #fff;
		transition: .3s;
	}

	.search__input-btn:hover {
		background: #2980b9;
		cursor: pointer;
	}

	.search__input-btn:focus {
		box-shadow: 0 0 0 4px #74b9ff;
	}

	.search__filters {
		display: flex;
		align-items: flex-start;
		margin-top: 2em;
		width: 100%;
		font-size: .95em;
	}

	.search__tags,
	.search__sorting {
		font-size: 1em !important;
		color: #555 !important;
	}

	.search__tags {
		width: 100% !important;
	}

	.search__sorting {
		flex-shrink: 0;
		width: 13em !important;
		background: #d5d5d5 !important;
	}

	.search__sorting.active {
		background: #fff;
	}
</style>

<style>
	.search__tags {
		display: flex;
		flex-direction: row-reverse;
	}

	.search__tags .tags-form__added-tags {
		justify-content: center;
		align-self: flex-start;
		margin-left: .3em;
		width: 100%;
	}

	.search__tags .tags-form__form {
		flex-shrink: 0;
		width: 13em !important;
		color: #555 !important;
	}

	.search__tags .tags-form__input {
		background: #d5d5d5 !important;
		color: #555 !important;
	}

	.search__tags .tags-form__form.active .tags-form__input {
		background: #fff !important;
	}
</style>
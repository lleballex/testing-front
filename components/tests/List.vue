<template>
	<Loading ref="loading" v-if="loading" />
	<div v-else-if="tests.length" class="tests-list">
		<div v-for="test in tests" class="tests-list__test-container">
			<NuxtLink
				:to="`/tests/${test.id}/`"
				:data-has-image="test.image ? 'true' : 'false'"
				class="tests-list__test content__block"
			>
				<img v-if="test.image" :src="test.image" class="tests-list__test-image">
				<div class="tests-list__test-content">
					<div class="tests-list__test-title">{{test.title}}</div>
					<div class="tests-list__test-tags">
						<span v-for="tag in test.tags">{{tag}}</span>
					</div>
					<div class="tests-list__test-info">
						<div>
							<span>{{test.date_created}}</span>
							<span>{{test.user.username}}</span>
						</div>
						<div>
							<icon
								@click.prevent="like(test)"
								icon="chevron-up"
								:class="test.is_liked_user ? 'active' : ''"
								class="tests-list__test-info-icon"
							/>
							<span>{{test.rating}}</span>
							<icon
								@click.prevent="dislike(test)"
								icon="chevron-down"
								:class="test.is_disliked_user ? 'active' : ''"
								class="tests-list__test-info-icon"
							/>
						</div>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
	<div v-else class="tests-not-found">
		Я ничего не нашел (
	</div>
</template>

<script>
	import '~/assets/css/tests/list.css'

	export default {
		data: () => ({
			tests: null,
			loading: true,
			error: ''
		}),
		async fetch() {
			await this.$axios({
				method: 'get',
				url: 'tests/',
				messages: {show: false}
			}).then(answer => {
				this.tests = answer.data
				this.loading = false
			}).catch(error => {
				this.$nuxt.error(error)
			})
		},
		methods: {
			like(test) {
				this.$store.dispatch('tests/like', {
					id: test.id
				}).then(answer => {
					if(answer.success) {
						test.rating = answer.data.rating
						test.is_liked_user = answer.data.user_exists
						test.is_disliked_user = false
					}
				})
			},

			dislike(test) {
				this.$store.dispatch('tests/dislike', {
					id: test.id
				}).then(answer => {
					if(answer.success) {
						test.rating = answer.data.rating
						test.is_disliked_user = answer.data.user_exists
						test.is_liked_user = false
					}
				})
			},

			search({ query, sorting, tags }) {
				this.loading = true

				this.$axios.get('tests/', {params: {
					query: query,
					sorting: sorting,
					tags: tags.toString(),
				}}).then(response => {
					this.tests = response.data
					this.loading = false
				})
			}
		}
	}
</script>

<style scoped>
  .tests-list__test-info > div:first-child {
    display: flex;
    flex-direction: column;
  }

  .tests-list__test-info > div:last-child > span {
    padding-right: .3em;
  }

  .tests-list__test-info-icon {
    transition: .3s;
  }

  .tests-list__test-info-icon.active {
    color: #07f;
  }

  .tests-list__test-info-icon:hover {
    transform: scale(1.2, 1.2);
    cursor: pointer;
  }

  .tests-not-found {
  	margin-bottom: 1rem;
  	font-size: 1.5rem;
  	font-weight: 500;
  	letter-spacing: 2px;
  	text-align: center;
  }
</style>
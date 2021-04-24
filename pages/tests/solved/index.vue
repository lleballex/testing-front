<template>
  <Loading v-if="loading" />
  <div v-else class="tests-list">
    <div v-for="test in tests" class="tests-list__test-container">
      <NuxtLink
        :to="`/tests/solved/${test.id}/`"
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
            <div>*дата*</div>
            <div>
              <icon icon="check" class="tests-list__test-info-icon" />
              <span>{{test.right_answers}} / {{test.answers}}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/tests/list.css'

  export default {
    middleware: 'authenticated',
    head: () => ({
      title: 'Решенные тесты | Tests for everyone'
    }),
    data: () => ({
      loading: true,
      tests: []
    }),
    async fetch() {
      await this.$axios.get('tests/solved/', {messages: {
        show: false
      }}).then(response => {
        this.tests = response.data
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    }
  }
</script>
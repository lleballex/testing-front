<template>
  <div class="profile">
    <LeftCard :username="username" />
    <div class="profile__card content__block">
      <Menu />
      <Loading v-if="loading" inverse />
      <div v-else class="profile__content">
        <div v-if="!tests.length" class="profile__message">Здесь пока ничего нет</div>
        <div v-else class="profile__area">
          <div class="profile__area-cards">
            <NuxtLink v-for="test in tests" :to="`/test/${test.id}/`" class="profile__area-card">
              {{test.title}}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/account/profile.css'

  export default {
    data() {
      return {
        loading: true,
        username: this.$route.params.username,
        tests: []
      }
    },
    components: {
      LeftCard: () => import('~/components/account/profile/LeftCard.vue'),
      Menu: () => import('~/components/account/profile/Menu.vue')
    },
    async fetch() {
      await this.$axios.get(`account/users/${this.username}/?area=tests`, {messages: {
        show: false
      }}).then(response => {
        this.tests = response.data.tests
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    }
  }
</script>
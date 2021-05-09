<template>
  <div class="profile">
    <LeftCard />
    <div class="profile__card content__block">
      <Menu />
      <div class="profile__content">
        ...
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/account/profile.css'

  export default {
    components: {
      LeftCard: () => import('~/components/account/profile/LeftCard.vue'),
      Menu: () => import('~/components/account/profile/Menu.vue')
    }
  }
</script>
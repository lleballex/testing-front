<template>
  <div class="profile-menu">
    <ul>
      <li>
        <NuxtLink :to="`/users/${username}/`" class="profile-menu__link" exact>Основное</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/users/${username}/tests/`" class="profile-menu__link">Тесты</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: this.$route.params.username
      }
    }
  }
</script>

<style scoped>
  .profile-menu {
    border-bottom: 1px solid #bbb;
  }

  .profile-menu > ul {
    display: flex;
    list-style: none;
  }

  .profile-menu__link {
    display: block;
    padding: var(--profile-padding);
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #fff;
    color: #000;
    text-decoration: none;
    transition: .2s;
  }

  .profile-menu__link:hover {
    border-bottom-color: #bbb;
  }

  .profile-menu__link.active {
    border-bottom: 2px solid #ff5252;
    font-weight: 500;
  }
</style>
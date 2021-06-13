<template>
  <div class="users">
    <div class="users__title">Участники проекта</div>
    <form @submit.prevent="search" class="users__search">
      <div class="users__search-input-area">
        <input ref="searchInput" v-model="query" class="users__search-input" type="text" placeholder="Поиск">
        <icon @click="focusSearchInput" icon="search" class="users__search-icon" />
        <icon @click="clearQuery" icon="times" class="users__search-icon" />
      </div>
      <ul class="users__search-sorting">
        <li @click="updateSorting('tests')" :class="sorting == 'tests' ? 'active' : ''">
          По тестам
        </li>
        <li @click="updateSorting('solutions')" :class="sorting == 'solutions' ? 'active' : ''">
          По решениям
        </li>
      </ul>
    </form>
    <Loading v-if="loading" />
    <div v-else-if="!users.length" class="main-message content__block">
      Я ничего не нашел (
    </div>
    <div v-else class="users__list">
      <div ref="users" v-for="(user, index) in users" class="users__user">
        <img
          @click="goToUser(user.username)"
          @mouseenter="toggleHoverClass(index)"
          @mouseleave="toggleHoverClass(index)"
          src="~/assets/images/user.svg"
          class="users__user-image"
        >
        <div class="users__user-info">
          <div
            @click="goToUser(user.username)"
            @mouseenter="toggleHoverClass(index)"
            @mouseleave="toggleHoverClass(index)"
            class="users__user-username"
          >{{user.username}}</div>
          <span class="users__user-line"></span>
          <div class="users__user-links">
            <NuxtLink :to="`/users/${user.username}/tests/`" class="users__user-link">
              {{user.tests}} тестов
            </NuxtLink>
            <span class="users__user-dot"></span>
            <span class="users__user-link">{{user.solutions}} решений</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/message.css'

  export default {
    head: {
      title: 'Участники | Tests for everyone'
    },
    data: () => ({
      users: [],
      loading: true,
      query: '',
      sorting: 'tests',
    }),
    async fetch() {
      await this.$axios.get('account/users/', {
        params: {sorting: this.sorting},
        messages: {show: false}
      }).then(response => {
        this.users = response.data
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    },
    methods: {
      toggleHoverClass(index) {
        this.$refs.users[index].classList.toggle('hovered')
      },

      goToUser(username) {
        this.$router.push(`/users/${username}/`)
      },

      focusSearchInput() {
        this.$refs.searchInput.focus()
      },

      updateSorting(value) {
        this.sorting = value
        this.search()
      },

      clearQuery() {
        this.query = ''
        this.search()
      },

      search() {
        this.loading = true
        this.$axios.get('account/users/', {
          params: {query: this.query, sorting: this.sorting},
        }).then(response => {
          this.users = response.data
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .users {
    font-size: 1rem;
  }

  .users__title {
    margin-top: .8em;
    padding-bottom: 1.1em;
    border-bottom: 1px solid #fff;
    font-size: 2em;
    letter-spacing: 5px;
  }

  .users__search {
    margin: 2.4em 0;
    display: flex;
    justify-content: space-between;
    font-size: 1.1em;
  }

  .users__search-input,
  .users__search-sorting > li {
    padding: .6em .7em;
    background: #fff;
    border-right: 4px solid var(--background);
    transition: .3s;
  }

  .users__search-input-area {
    display: flex;
    position: relative;
    width: 35%;
  }

  .users__search-input {
    padding-right: 2.6em;
    width: 100%;
    border: none;
    border-radius: var(--radius);
    font-size: 1em;
  }

  .users__search-input:focus {
    box-shadow: 0 0 0 4px #9b59b6;
  }

  .users__search-icon {
    display: block;
    position: absolute;
    align-self: center;
    right: .9em;
    color: #9b59b6;
    cursor: pointer;
    transition: .3s;
  }

  .users__search-icon:last-child {
    right: 1.1em;
    transform: scale(0); 
  }

  .users__search-input:focus + .users__search-icon {
    transform: scale(0);
  }

  .users__search-input:focus + .users__search-icon + .users__search-icon {
    transform: none;
  }

  .users__search-sorting {
    display: flex;
    border-radius: var(--radius);
    overflow: hidden;
    color: var(--background);
    list-style: none;
  }

  .users__search-sorting > li:last-child {
    border-right: none;
  }

  .users__search-sorting > li.active,
  .users__search-sorting > li:hover {
    background: #9b59b6;
    color: #fff;
    cursor: pointer;
  }

  .users__list {
    display: flex;
    flex-wrap: wrap;
  }

  .users__user {
    display: flex;
    position: relative;
    margin-top: 1em;
    margin-right: 1em;
    width: calc((100% - 2 * 1em) / 3);
    height: 6em;
  }

  .users__user:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: 2px;
    bottom: 2px;
    background: #e67e22;
    border-radius: var(--radius);
    opacity: 0;
    transition: .3s;
  }

  .users__user.hovered:after {
    opacity: 1;
  }

  .users__user:nth-child(3n) {
    margin-right: 0;
  }

  .users__user:first-child,
  .users__user:nth-child(2),
  .users__user:nth-child(3) {
    margin-top: 0;
  }

  .users__user > * {
    z-index: 1;
  }

  .users__user-image {
    margin-right: .1em;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
  }

  .users__user-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .users__user-username {
    align-self: flex-start;
    font-size: 1.2em;
    cursor: pointer;
  }

  .users__user-line {
    height: 1px;
    background: #000;
  }

  .users__user-links {
    display: flex;
  }

  .users__user-link {
    color: #3498db;
    font-weight: 600;
    text-decoration: none;
  }

  a.users__user-link:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .users__user-dot {
    display: block;
    align-self: center;
    margin: 0 .5em;
    width: .4em;
    height: .4em;
    background: #bbb;
    border-radius: 50%;
  }
</style>
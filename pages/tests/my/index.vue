<template>
  <Loading v-if="loading" />
  <div v-else-if="!tests.length" class="main-message content__block">
    У тебя еще нет ни одного созданного теста.
    <NuxtLink to="/tests/new/">Новый тест</NuxtLink>
  </div>
  <div v-else class="tests-list">
    <div v-for="(test, index) in tests" class="tests-list__test-container">
      <NuxtLink
        :to="`/tests/my/${test.id}/`"
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
            <div>{{test.date_created}}</div>
            <div>
              <div>
                <icon :icon="['far', 'star']" class="tests-list__test-info-icon" />
                <span>{{test.rating}}</span>
              </div>
              <div>
                <icon :icon="['far', 'edit']" class="tests-list__test-info-icon" />
                <span>{{test.solutions}}</span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      <div v-extclick="[closeMenu, [test.id]]" class="test-menu">
        <div @click="toggleMenu(test.id)" class="test-menu__icon">
          <icon icon="ellipsis-h" />
        </div>
        <ul v-show="test.id == showedMenu">
          <li>
            <NuxtLink :to="`/tests/my/${test.id}/`" class="test-menu__link">Посмотреть</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="`/tests/my/${test.id}/update/`" class="test-menu__link">Редактировать</NuxtLink>
          </li>
          <li>
            <span @click="removeTest(test.id, index)" class="test-menu__link warning">
              Удалить
            </span>
          </li>
        </ul>
      </div>   
    </div>
  </div>
</template>

<script>
  import '~/assets/css/message.css'
  import '~/assets/css/tests/list.css'

  export default {
    middleware: 'authenticated',
    head: () => ({
      title: 'Мои тесты | Tests for everyone'
    }),
    data: () => ({
      loading: true,
      tests: [],
      showedMenu: 0,
    }),
    async fetch() {
      await this.$axios.get('tests/own/', {messages: {
        show: false
      }}).then(response => {
        this.tests = response.data
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    },
    methods: {
      removeTest(id, index) {
        if(!confirm('Ты точно этого хочешь?')) return

        this.$axios.delete(`tests/${id}/`).then(() => {
          this.tests.splice(index, 1)
          this.$store.dispatch('messages/show', {
            type: 'success',
            text: 'Тест успешно удален'
          })
        })
      },

      toggleMenu(id) {
        if(!id || this.showedMenu == id)
          this.showedMenu = 0
        else this.showedMenu = id
      },

      closeMenu(id) {
        if(this.showedMenu == id) this.showedMenu = 0
      }
    }
  }
</script>

<style scoped>
  .test-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1em;
    right: 1em;
    font-size: 1rem;
  }

  .test-menu__icon {
    align-self: flex-end;
    padding: .2em .4em;
    background: var(--background);
    border-radius: var(--radius);
    color: #fff;
    font-size: .9em;
    cursor: pointer;
  }

  .test-menu > ul {
    margin-top: .8em;
    overflow: hidden;
    background: #fff;
    border: 2px solid var(--background);
    border-radius: var(--radius);
    list-style: none;
  }

  .test-menu > ul > li {
    border-bottom: 1px solid #bbb;
    font-size: .9em;
  }

  .test-menu > ul > li:last-child {
    border-bottom: none;
  }

  .test-menu__link {
    display: block;
    padding: .4em;
    color: var(--background);
    text-decoration: none;
    cursor: pointer;
    transition: .3s;
  }

  .test-menu__link.warning {
    color: var(--warning);
  }

  .test-menu__link:hover {
    background: #ddd;
  }
</style>
<template>
  <div ref="navbar" class="navbar">
    <NuxtLink to="/" class="navbar__logo">
        <img src="@/assets/images/logo.svg">
    </NuxtLink>
    <div @click="toggleNavbar" class="navbar__bars"></div>
    <ul @click="hideNavbar" ref="navbarMenu" class="navbar__main-menu">
      <li>
        <NuxtLink to="/" class="navbar__main-link" exact>
          Тесты
        </NuxtLink>
        <ul v-if="isUserAuth" class="navbar__extra-menu">
          <li>
            <NuxtLink to="/tests/solved/" class="navbar__extra-link">
              Решенные
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tests/my/" class="navbar__extra-link">
              Мои тесты
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tests/new/" class="navbar__extra-link">
              Новый тест
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li v-if="isUserAuth">
        <NuxtLink to="/" class="navbar__main-link">
          {{username}}
        </NuxtLink>
        <ul class="navbar__extra-menu">
          <li>
            <span @click="$store.dispatch('account/logout')" class="navbar__extra-link">
              Выйти
            </span>
          </li>
        </ul>
      </li>
      <li v-else>
        <NuxtLink to="/login/" class="navbar__main-link">
          Войти
        </NuxtLink>
        <ul class="navbar__extra-menu">
          <li>
            <NuxtLink to="/register/" class="navbar__extra-link">
              Регистрация
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('account', [
        'isUserAuth',
        'username'
      ])
    },
    methods: {
      toggleNavbar() {
        if(this.$refs.navbar.classList.contains('active'))
          this.$refs.navbarMenu.style.transitionDelay = '.5s'
        else
          this.$refs.navbarMenu.removeAttribute('style')

        this.$refs.navbar.classList.toggle('active')
      },
      
      hideNavbar(event) {
        if(event.target != this.$refs.navbarMenu)
          this.toggleNavbar()
      }
    }
  }
</script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0;
    font-size: 1.2rem;
  }

  .navbar__logo img {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
  }

  .navbar__bars {
    display: none;
    position: relative;
    z-index: 101;
  }

  .navbar__bars,
  .navbar__bars:before,
  .navbar__bars:after {
    width: 1.6em;
    height: .15em;
    background: #fff;
    border-radius: 5px;
    transition: .2s ease-in-out;
  }

  .navbar__bars:before,
  .navbar__bars:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;   
  }

  .navbar__bars:before {
    transform: translateY(-.6em);
  }

  .navbar__bars:after {
    transform: translateY(.6em);
  }

  .navbar.active .navbar__bars  {
    transform: rotate(-45deg);
  }

  .navbar.active .navbar__bars:before,
  .navbar.active .navbar__bars:after {
    transform: rotate(-90deg);
  }

  .navbar__main-menu {
    display: flex;
    list-style: none;
  }

  .navbar__main-menu > li {
    position: relative;
    margin-left: 3em;
  }

  .navbar__main-link {
    position: relative;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    transition: .2s;
  }

  .navbar__main-link:hover {
    color: #fce38a;
  }

  .navbar__main-link:after {
    content: '';
    position: absolute;
    top: -.4em;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, #F14D5C, #FDC70C);
    transition: .7s;
  }

  .navbar__main-link.active:after {
    width: 100%;
  }

  .navbar__main-link:hover + .navbar__extra-menu,
  .navbar__extra-menu:hover {
    max-height: 100px;
    opacity: 1;
  }

  .navbar__extra-menu {
    position: absolute;
    top: 1.4em;
    right: -3px;
    max-height: 0;
    opacity: 0;
    z-index: 1;
    overflow: hidden;
    background: #fff;
    border: 3px solid #2a2a2a;
    border-radius: 7px;
    list-style: none;
    white-space: nowrap;
    transition: .4s;
  }

  .navbar__extra-link {
    display: block;
    padding: .29em .55em;
    border-bottom: 1px solid powderblue;
    color: #3498db;
    font-size: .9em;
    text-decoration: none;
    text-align: right;
    transition: .2s;
  }

  .navbar__extra-link:hover {
    background: #eee;
    cursor: pointer;
  }

  .navbar__extra-menu > li:last-child > .navbar__extra-link {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    .navbar__bars {
      display: block;
    }

    .navbar__main-menu {
      flex-direction: column;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 0;
      z-index: 100;
      visibility: hidden;
      background: #8e44ad;
      transition: 1s cubic-bezier(.645,  .045, .355, 1.000);
    }

    .navbar.active .navbar__main-menu {
      width: 100%;
      visibility: visible;
    }

    .navbar__main-menu > li {
      margin: 0 3.8em;
      opacity: 0;
      border-top: 1px solid #fff;
      transform: translateY(100%);
      transition: .5s cubic-bezier(.645,  .045, .355, 1.000);
    }

    .navbar__main-menu > li:last-child {
      border-bottom: 1px solid #fff;
    }

    .navbar.active .navbar__main-menu > li {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 1s;
    }

    .navbar__main-link {
      display: block;
      padding: .35em 0;
      font-size: 1.5em;
      text-align: center;
      text-transform: uppercase;
    }

    .navbar__main-link.active {
      color: #fce38a;
    }

    .navbar__main-link.active:after {
      display: none;
    }

    .navbar__extra-menu {
      position: relative;
      max-height: 100%;
      top: 0;
      right: 0;
      opacity: 1;
      background: none;
      border: none;
      border-radius: 0;
    }

    .navbar__extra-link {
      padding: .4em 0;
      border: none;
      color: #fff;
      font-size: 1em;
      text-align: center;
      text-transform: uppercase;
    }

    .navbar__extra-link:hover {
      background: none;
    }
  }
</style>
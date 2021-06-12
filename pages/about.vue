<template>
  <div ref="about" class="about">
    <div ref="aboutBackground" class="about__background"></div>
    <div ref="aboutTitle" class="about__title">
      Tests for everyone
    </div>
    <div class="about__body">
      Testsforeveryone.ru — это платформа для прохождения онлайн тестов. Здесь ты сможешь создать свой собственный тест различной тематики, а затем наблюдать за результатами. Это может быть проверка знаний учеников, опрос друзей или просто изучение мнения посетителей сайта. Создавайте тесты, решайте их и прводите время с пользой!
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$refs.about.style.width = this.$refs.aboutTitle.offsetWidth + 'px'
      setTimeout(() => {
        this.$refs.aboutBackground.classList.add('active')
      }, 3000)
    }
  }
</script>

<style scoped>
  .about {
    margin: 4rem auto;
    font-size: 1rem;
  }

  .about__background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    background-position: 0% 50%;
  }

  .about__background.active {
    animation: gradient 15s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .about__background:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2a2a2a;
    opacity: 0;
    animation: changeBackground 3s;
  }

  @keyframes changeBackground {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .about__title {
    margin-bottom: .6em;
    width: min-content;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 3em;
    white-space: nowrap;
    letter-spacing: .1em;
  }

  .about__body {
    line-height: 1.7em;
  }
  
  @media (max-width: 480px) {
    .about__title {
      white-space: normal;
    }
  }
</style>
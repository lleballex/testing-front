<template>
  <div class="error content__block">{{message}}</div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style scoped>
  .error {
    margin: 1.2em 0;
    padding: 6.25em 2.9em;
    font-size: 1.5rem;
    letter-spacing: 2px;
    line-height: 1.5em;
    text-align: center;
    color: #fff;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
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
</style>
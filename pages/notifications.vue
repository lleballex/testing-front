<template>
  <div>
    Hello world
  </div>
</template>

<script>
  export default {
    asyncData({ error }) {
      error({
      	status: 200,
      	message: 'Сюда пока нельзя - ведутся строительные работы...'
      })
    }
  }
</script>
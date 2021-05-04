<template>
  <Message message="Hello world" />
</template>

<script>
  export default {
    fetch() {
      return
      this.$nuxt.error({
        message: 'YES it is'
      })
    }
  }
</script>
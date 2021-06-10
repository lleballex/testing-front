<template>
  <Loading v-if="loading" />
  <Editor v-else ref="editor" :action="update" :instanse="test" />
</template>

<script>
  export default {
    middleware: 'authenticated',
    data: () => ({
      loading: true,
      test: null
    }),
    components: {
      Editor: () => import('@/components/tests/editor/Editor.vue')
    },
    async fetch() {
      await this.$axios.post(`tests/${this.$route.params.id}/`, {}, {messages: {
        show: false,
        error: false,
        notFound: 'Кажется, такого теста не существует'
      }}).then(response => {
        this.test = response.data
        this.loading = false
      }).catch(error => {
        this.$nuxt.error(error)
      })
    },
    methods: {
      update() {
        if(!this.$refs.editor.check()) return

        this.$refs.editor.startLoading()

        var data = {
          title: this.$refs.editor.title,
          description: this.$refs.editor.description,
          is_private: this.$refs.editor.isPrivate,
          tags: this.$refs.editor.getTags()
        }

        var image = this.$refs.editor.getImage()
        if(image || image == null) data.image = image

        this.$axios.put(`tests/${this.$route.params.id}/`, data).then(response => {
          this.$store.dispatch('messages/show', {
            type: 'success',
            text: 'Круто! Твой тест обновлен'
          })
          this.$refs.editor.stopLoading()
        }).catch(error => {
          this.$refs.editor.stopLoading()
        })
      }
    }
  }
</script>
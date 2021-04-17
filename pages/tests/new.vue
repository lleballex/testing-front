<template>
  <Editor ref="editor" :action="create"/>
</template>

<script>
  export default {
    middleware: 'authenticated',
    head: () => ({
      title: 'Новый тест | Tests for everyone'
    }),
    components: {
      Editor: () => import('~/components/tests/editor/Editor.vue')
    },
    methods: {
      create() {
        if(!this.$refs.editor.check()) return

        var questions = this.$refs.editor.getQuestions()
        if(!questions) return

        this.$refs.editor.startLoading()

        this.$axios.post('tests/', {
          title: this.$refs.editor.title,
          description: this.$refs.editor.description,
          is_private: this.$refs.editor.isPrivate,
          image: this.$refs.editor.getImage(),
          questions: questions
        }).then(response => {
          this.$refs.editor.stopLoading()
          this.$store.dispatch('messages/show', {
            type: 'success',
            text: 'Твой тест успешно создан'
          })
          this.$router.push('/')
        }).catch(error => {
          this.$refs.editor.stopLoading()
        })
      }
    }
  }
</script>
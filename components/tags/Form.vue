<template>
  <div class="tags-form">
    <div class="tags-form__added-tags">
      <span v-for="tag in addedTags" @click="removeTag(tag)">{{tag}}</span>
    </div>
    <div ref="form" v-extclick="closeForm" class="tags-form__form">
      <input
        v-model="query"
        @focus="toggleForm"
        class="tags-form__input"
        type="text"
        placeholder="Теги"
      >
      <div class="tags-form__tags">
        <span
          v-for="tag in tags"
          v-show="tag.indexOf(query.toLowerCase()) >= 0"
          @click="addTag(tag)"
        >
          {{tag}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      tags: [],
      addedTags: [],
      query: '',
      tagsToAdd: []
    }),
    async fetch() {
      await this.$store.dispatch('tags/getTags').then(answer => {
        if(answer.success) {
          this.tags = answer.data
          this.tagsToAdd.forEach(tag => this.addTag(tag))
        }
      })
    },
    methods: {
      toggleForm() {
        this.$refs.form.classList.toggle('active')
      },

      closeForm() {
        if(this.$refs.form.classList.contains('active'))
          this.$refs.form.classList.remove('active')
      },

      addTag(tag) {
        this.addedTags.push(tag)
        this.tags.splice(this.tags.indexOf(tag), 1)
        this.toggleForm()
        this.$emit('change')
      },

      removeTag(tag) {
        this.tags.push(tag)
        this.addedTags.splice(this.addedTags.indexOf(tag), 1)
        this.$emit('change')
      },

      addTags(tags) {
        if(this.tags.length) tags.forEach(tag => this.addTag(tag))
        else this.tagsToAdd = tags
      }
    }
  }
</script>

<style scoped>
  .tags-form {
    width: 9.3em;
    font-size: 1rem;
  }

  .tags-form__added-tags {
    display: flex;
    flex-wrap: wrap;
  }

  .tags-form__added-tags > span {
    margin: 0 .3em .3em 0;
    padding: .3em;
    background: #3498db;
    border-radius: 4px;
    color: #fff;
    transition: .3s;
  }

  .tags-form__added-tags > span:hover {
    background: #2980b9;
    cursor: pointer;
  }

  .tags-form__form {
    position: relative;
    width: 100%;
    color: #000;
  }

  .tags-form__input {
    padding: .8em;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    font-size: 1em;
    transition: .3s;
  }

  .tags-form__form.active .tags-form__input {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .tags-form__tags {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding: 0 0 .3em .3em;
    top: 100%;
    width: 160%;
    max-height: 0;
    overflow: auto;
    opacity: 0;
    background: #fff;
    border-radius: 4px;
    border-top-left-radius: 0;
    transition: .3s;
  }

  .tags-form__form.active .tags-form__tags {
    max-height: 100px;
    opacity: 1;
  }

  .tags-form__tags > span {
    display: block;
    margin: .3em .3em 0 0;
    padding: .3em;
    background: #f3f3f3;
    border-radius: 4px;
    transition: .3s;
  }

  .tags-form__tags > span:hover {
    background: #e6e6e6;
    cursor: pointer;
  }
</style>
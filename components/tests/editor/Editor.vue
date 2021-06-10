<template>
  <div class="test">
    <div>
      <div
        ref="titleInput"
        @input="title = $event.target.innerText"
        class="test__title content__block"
        data-placeholder="Название"
        contenteditable
      ></div>
      <div
        ref="descriptionInput"
        @input="description = $event.target.innerText"
        class="test__description content__block mb"
        data-placeholder="Описание (необязательно)"
        contenteditable
      ></div>
    </div>
    <div class="test__settings content__block mb">
      <div v-show="hasImagePreview" class="test__image-area">
        <div ref="testPreview" id="testPreview" class="test__image"></div>
        <div class="test__image-icons">
          <icon @click="chooseImage" icon="pen" class="test__image-icon" />
          <icon @click="removeImage" icon="trash" class="test__image-icon" />
        </div>
      </div>
      <div v-show="!hasImagePreview" class="test__image-area">
        <img class="test__image" src="~/assets/images/test-image.svg">
        <div class="test__image-icons fillen">
          <icon @click="chooseImage" icon="image" class="test__image-icon" />
        </div>
      </div>
      <div style="width: 100%;">
        <label style="display: flex; align-items: center; margin-bottom: .5em; width: min-content; white-space: nowrap;">
          <input v-model="isPrivate" type="checkbox">
          <span class="checkbox"></span>
          <span>Приватный тест</span>
        </label>
        <TagsForm ref="tagsForm" class="test__tags-form" />
      </div>
    </div>
    <Questions v-if="!instanse" ref="questions" />
    <FinishButtons
      ref="finishButtons"
      :success="action"
      :cancel="clear"
      successTitle="Создать тест"
      cancelTitle="Очистить все"
    />
    <Cropper
      ref="cropper"
      v-model="hasImagePreview"
      aspectRatio="1"
      preview="#testPreview"
    />
  </div>
</template>

<script>
  import '~/assets/css/tests/test.css'

  export default {
    props: ['action', 'instanse'],
    data: () => ({
      title: '',
      description: '',
      isPrivate: false,
      hasImagePreview: false
    }),
    components: {
      Questions: () => import('~/components/tests/editor/Questions.vue'),
      TagsForm: () => import('~/components/tags/Form.vue'),
      Cropper: () => import('~/components/Cropper.vue')
    },
    mounted() {
      if(!this.instanse) return

      this.title = this.instanse.title
      this.description = this.instanse.description
      this.isPrivate = this.instanse.is_private

      setTimeout(() => {
        this.$refs.tagsForm.addTags(this.instanse.tags)

        if(this.instanse.image) {
          var style = 'width: 100%; height: 100%;'
          this.hasImagePreview = true
          this.$refs.testPreview.innerHTML = `<img src="${this.instanse.image}" style="${style}">`
        }
      }, 0)

      this.$refs.titleInput.innerText = this.title
      this.$refs.descriptionInput.innerText = this.description
    },
    methods: {
      clear() {
        alert('clearing')
      },

      chooseImage() {
        this.$refs.cropper.chooseImage()
      },

      removeImage() {
        this.$refs.cropper.removeImage()
      },

      check() {
        if(!this.title) {
          this.$store.dispatch('messages/show', {
            type: 'error',
            text: 'Необходимо ввести название теста'
          })
          return false
        }
        return true
      },

      getQuestions() {
        return this.$refs.questions.getQuestions()
      },

      getImage() {
        if(this.instanse && !this.$refs.cropper.image) {
          if(this.hasImagePreview) return false
          else return null
        }
        return this.$refs.cropper.image
      },

      getTags() {
        return this.$refs.tagsForm.addedTags
      },

      startLoading() {
        this.$refs.finishButtons.loading = true
      },

      stopLoading() {
        this.$refs.finishButtons.loading = false
      }
    }
  }
</script>

<style scoped>
  div [contenteditable] {
    outline: none;
  }

  div [contenteditable][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #666;
    cursor: text;
  }

  .test__settings {
    display: flex;
  }

  .test__image-area {
    flex-shrink: 0;
    position: relative;
    margin-right: 2em;
    width: 10em;
    height: 10em;
    border: 1px solid #2a2a2a;
    border-radius: 4px;
  }

  .test__image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .test__image-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(0, 0, 0, .3);
    transition: .3s;
  }

  .test__image-area:hover .test__image-icons,
  .test__image-icons.fillen {
    opacity: 1;
  }

  .test__image-icon {
    margin-right: 1em;
    padding: .5em;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #fff;
    color: #2a2a2a;
    font-size: 1.1em;
    transition: .3s;
  }

  .test__image-icon:hover {
    background: #3498db;
    color: #fff;
    cursor: pointer;
  }

  .test__image-icon:last-child {
    margin-right: 0;
  }

  .test__tags-form {
    width: 50% !important;
    font-size: .84em !important;
  }
</style>

<style>
  .test__tags-form .tags-form__input {
    position: relative;
    z-index: 1;
    border: 2px solid #3498db !important;
  }

  .test__tags-form .tags-form__tags {
    top: calc(100% - 2px) !important;
    z-index: 0;
    border: 2px solid #3498db !important;
  }

  .test__tags-form .tags-form__form.active .tags-form__input {
    border-bottom: none !important;
  }
</style>
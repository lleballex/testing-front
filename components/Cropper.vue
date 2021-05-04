<template>
  <div v-show="isShowed" class="cropper">
    <div class="cropper__container">
      <div class="cropper__image">
        <img ref="image" :src="image">
      </div>
      <input
        ref="input"
        v-show="false"
        @change="setImage"
        type="file"
        accept="image/*"
      >
      <FinishButtons
        :success="saveImage"
        :cancel="cancelUpdate"
        successTitle="Сохранить изображение"
        cancelTitle="Отменить редактирование"
      />
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'

  export default {
    props: ['aspectRatio', 'preview'],
    data: () => ({
      isShowed: false,
      image: '',
      lastImage: '',
      cropper: null
    }),
    mounted() {
      this.cropper = new Cropper(this.$refs.image, {
        aspectRatio: this.aspectRatio,
        preview: this.preview,
        viewMode: 2
      })
    },
    methods: {
      chooseImage() {
        this.$refs.input.click()
      },

      setImage(event) {
        var file = event.target.files[0]

        if(!file) return

        if(!file.type.match('image')) {
          this.$store.dispatch('messages/show', {
            type: 'error',
            text: 'Так не пойдет. Выбери изображение',
          })
          return
        }

        var reader = new FileReader()
        reader.onload = e => {
          if(this.image) this.lastImage = this.image
          this.image = e.target.result
          this.cropper.replace(this.image)
          this.isShowed = true
          this.$emit('input', true)
        }
        reader.readAsDataURL(file)
      },

      async saveImage() {
        this.image = await this.cropper.getCroppedCanvas().toDataURL()
        this.lastImage = ''
        this.isShowed = false
      },

      cancelUpdate() {
        if(!this.lastImage) this.$emit('input', false)
        this.image = this.lastImage
        this.cropper.replace(this.image)
        this.lastImage = ''
        this.isShowed = false
      },

      removeImage() {
        this.image = ''
        this.lastImage = ''
        this.$emit('input', false)
      }
    }
  }
</script>

<style scoped>
  .cropper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, .7);
    font-size: 1rem;
  }

  .cropper__container {
    width: 43.75rem;
    margin: auto;
  }

  .cropper__image {
    margin: 3.5em 0;
    max-height: calc(100vh - 3.5em * 3.6);
  }
</style>
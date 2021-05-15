<template>
  <div class="profile-lcard content__block">
    <div class="profile-lcard__image-container">
      <div v-if="isOwner" class="profile-lcard__image-area">
        <img class="profile-lcard__image" src="~/assets/images/user.svg">
        <div class="profile-lcard__image-icons fillen">
          <icon @click="chooseImage" icon="image" class="profile-lcard__image-icon" />
        </div>
      </div>
      <div v-else class="profile-lcard__image-area">
        <img class="profile-lcard__image" src="~/assets/images/user.svg">
      </div>
    </div>
    <div class="profile-lcard__username">{{username}}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['username'],
    computed: {
      isOwner: function() {
        return this.$store.getters['account/username'] == this.username
      }
    },
    methods: {
      chooseImage() {
        this.$store.dispatch('messages/show', {
          type: 'error',
          text: 'Эта функция пока недоступна'
        })
      }
    }
  }
</script>

<style scoped>
  .profile-lcard {
    margin-right: var(--margin);
    width: 30%;
  }

  .profile-lcard__image-container {
    position: relative;
  }

  .profile-lcard__image-container:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .profile-lcard__image-area {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .profile-lcard__image {
    width: 100%;
    height: 100%;
  }

  .profile-lcard__image-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, .3);
    transition: .3s;
  }

  .profile-lcard__image-icons:hover,
  .profile-lcard__image-icons.fillen {
    opacity: 1;
  }

  .profile-lcard__image-icon {
    padding: .5em;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #fff;
    font-size: 1.1em;
    transition: .3s;
  }

  .profile-lcard__image-icon:hover {
    background: #3498db;
    color: #fff;
    cursor: pointer;
  }

  .profile-lcard__username {
    margin-top: calc(var(--margin) / 2);
    font-size: 1.3em;
    font-weight: 300;
  }
</style>
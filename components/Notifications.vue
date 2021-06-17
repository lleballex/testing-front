<template>
  <transition name="modal">
    <div v-if="isShowed" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <span>Уведомления</span>
          <icon icon="times" class="modal__header-icon" @click="hide"></icon>
        </div>
        <div class="modal__body">
          <Loading v-if="loading" inverse />
          <div v-else v-for="notif in notifs" class="notif">
            <icon :icon="getIcon(notif.kind)" class="notif__icon" />
            <div>
              <div v-html="notif.text"></div>
              <div class="notif__time">
                {{notif.date_created}}
              </div>
            </div>
            <div v-if="!notif.is_readed" class="notif__mark">
              <span></span>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button @click="goToAll" class="modal__success-btn">Все уведомления</button>
          <button @click="hide" class="modal__cancel-btn">Закрыть</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import '~/assets/css/modal.css'

  export default {
    data: () => ({
      isShowed: false,
      loading: true,
      notifs: []
    }),
    methods: {
      show() {
        this.loading = true
        this.isShowed = true

        this.$axios.get('notifications/').then(response => {
          this.notifs = response.data
          this.loading = false
          this.$store.commit('account/readNotifications')
        }).catch(error => {
          this.hide()
        })
      },

      hide() {
        this.isShowed = false
      },

      getIcon(kind) {
        switch(kind) {
          case 'GREETING': return ['far', 'hand-peace']
          case 'NEW_TEST': return 'plus'
          case 'NEW_USER': return ['far', 'user']
          case 'NEW_SOLUTION': return ['far', 'edit']
          default: return ['far', 'bell']
        }
      },

      goToAll() {
        this.hide()
        this.$router.push('/notifications/')
      }
    }
  }
</script>

<style scoped>
  .notif {
    display: flex;
    padding: .5em 0 .5em 0;
    border-bottom: 1px solid #bbb;
  }

  .notif:first-child {
    padding-top: 0;
  }

  .notif:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .notif__icon {
    align-self: center;
    margin-right: 0.4em;
    color: #2980b9;
    font-size: 1.8em;
  }

  .notif__time {
    padding-top: .2em;
    color: #777;
    font-size: .85em;
  }

  .notif__mark {
    align-self: center;
    margin-left: auto;
  }

  .notif__mark > span {
    display: block;
    margin-left: 0.5em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background: #8e44ad;
  }
</style>
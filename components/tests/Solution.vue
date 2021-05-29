<template>
  <transition name="modal">
    <div v-if="isShowed" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <span>Ответы пользователья {{solution.user}}</span>
          <icon @click="isShowed = false" icon="times" class="modal__header-icon" />
        </div>
        <div class="modal__body">
          <table class="solution__table">
            <tr>
              <th>#</th>
              <th>Ответ</th>
              <th>Правильный ответ</th>
            </tr>
            <tr
              v-for="(answer, index) in solution.answers"
              @click="goToQuestion(index)"
              :class="getAnswerClass(answer)"
            >
              <td>{{index + 1}}</td>
              <td>{{answer.user_answer}}</td>
              <td>{{answer.right_answer}}</td>
            </tr>
          </table>
        </div>
        <div class="modal__footer">
          <div ref="questions" v-for="(answer, index) in solution.answers" class="solution__question">
            <div>
              <span class="solution__question-index">{{index + 1}}.</span>
              <span>{{answer.condition}}</span>
            </div>
            <div :class="getAnswerClass(answer)" class="solution__question-answer">
              <span>{{answer.user_answer}}</span>
              <span v-if="answer.user_answer != answer.right_answer">{{answer.right_answer}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import '~/assets/css/modal.css'
  import VueScrollTo from 'vue-scrollto'

  export default {
    data: () => ({
      isShowed: false
    }),
    props: ['solution'],
    methods: {
      show() {
        this.isShowed = true
      },

      getAnswerClass(answer) {
        if(answer.user_answer == answer.right_answer)
          return 'success'
        return 'wrong'
      },

      goToQuestion(index) {
        VueScrollTo.scrollTo(this.$refs.questions[index], {
          container: '.modal__content'
        })
      }
    }
  }
</script>

<style scoped>
  .solution__table {
    margin: 0 auto;
    min-width: 70%;
    border-spacing: 0;
  }

  .solution__table th, .solution__table td {
    padding: .4em .5em;
  }

  .solution__table th {
    font-weight: 500;
  }

  .solution__table td {
    text-align: center;
    color: #fff;
  }

  .solution__table tr:not(:first-child) {
    cursor: pointer;
    transition: .3s;
  }

  .solution__table tr:nth-child(2) td:first-child {
    border-top-left-radius: 4px;
  }

  .solution__table tr:nth-child(2) td:last-child {
    border-top-right-radius: 4px;
  }

  .solution__table tr:last-child td:first-child {
    border-bottom-left-radius: 4px;
  }

  .solution__table tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
  }

  .solution__table tr.success, .solution__question-answer.success {
    background: #1fd679;
  }

  .solution__table tr.success:hover {
    background: #27ae60;
  }

  .solution__table tr.wrong, .solution__question-answer.wrong {
    background: #e74c3c;
  }

  .solution__table tr.wrong:hover {
    background: #c0392b;
  }

  .modal__footer {
    text-align: left;
  }

  .solution__question {
    margin-bottom: 1em;
  }

  .solution__question:last-child {
    margin-bottom: 0;
  }

  .solution__question-index {
    margin-right: .3em;
    font-weight: 500;
  }

  .solution__question-answer {
    display: flex;
    justify-content: space-around;
    margin-top: .3em;
    padding: .4em .5em;
    border-radius: var(--radius);
    color: #fff;
  }
</style>
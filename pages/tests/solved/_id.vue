<template>
  <Loading v-if="loading" />
  <div v-else class="test">
    <div class="test__title content__block">{{test.title}}</div>
    <div class="test__description content__block mb">*описание*</div>
    <div class="content__block mb">
      <table class="results">
        <tr>
          <th>#</th>
          <th>Твой ответ</th>
          <th>Правильный ответ</th>
        </tr>
        <tr
          v-for="(answer, index) in test.answers"
          @click="goToAnswer(index)"
          :class="getAnswerClass(answer)"
          class="test__question-answer"
        >
          <td>{{index + 1}}</td>
          <td>{{answer.user_answer}}</td>
          <td>{{answer.right_answer}}</td>
        </tr>
      </table>
    </div>
    <div ref="answers" v-for="(answer, index) in test.answers" class="content__block mb">
      <div class="test__question-title">
        <span>{{index + 1}}.</span>
        <span>{{answer.condition}}</span>
      </div>
      <div :class="getAnswerClass(answer)" class="test__question-answer">
        <span>{{answer.user_answer}}</span>
        <span v-if="answer.user_answer != answer.right_answer">
          {{answer.right_answer}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/tests/test.css'
  import VueScrollTo from 'vue-scrollto'

  export default {
    middleware: 'authenticated',
    head: () => ({
      title: 'Решенный тест | Tests for everyone'
    }),
    data() {
      return {
        loading: true,
        id: this.$route.params.id,
        test: null
      }
    },
    async fetch() {
      await this.$axios.get(`tests/solved/${this.id}/`, {messages: {
        show: false
      }}).then(response => {
        this.test = response.data
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    },
    methods: {
      getAnswerClass(answer) {
        if(answer.user_answer == answer.right_answer)
          return 'success'
        return 'wrong'
      },

      async goToAnswer(index) {
        VueScrollTo.scrollTo(this.$refs.answers[index])
      }
    }
  }
</script>

<style scoped>
  .results {
    margin: auto;
    min-width: 70%;
    border-spacing: 0;
  }

  .results th, .results td {
    padding: .4em .5em;
  }

  .results th {
    font-weight: 500;
  }

  .results td {
    text-align: center;
  }

  .results tr:nth-child(2) td:first-child {
    border-top-left-radius: 4px;
  }

  .results tr:nth-child(2) td:last-child {
    border-top-right-radius: 4px;
  }

  .results tr:last-child td:first-child {
    border-bottom-left-radius: 4px;
  }

  .results tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
  }

  .results .test__question-answer {
    display: table-row;
    margin-top: 0;
    cursor: pointer;
    transition: .3s;
  }

  .results .test__question-answer.success:hover {
    background: #27ae60;
  }

  .results .test__question-answer.wrong:hover {
    background: #c0392b;
  }

  .test__question-answer {
    display: flex;
    justify-content: space-around;
    padding: 0.5em;
    border-radius: 4px;
    color: #fff;
  }

  .test__question-answer.success {
    background: #1fd679;
  }

  .test__question-answer.wrong {
    background: #e74c3c;
  }
</style>
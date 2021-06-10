Q<template>
  <Loading v-if="loading" />
  <div v-else style="display: flex; justify-content: space-between;">
    <div class="area">
      <div class="test">
        <div class="test__title content__block">{{test.title}}</div>
        <div class="test__description content__block mb">*описание*</div>
        <div v-for="(question, index) in test.questions" class="content__block mb">
          <div class="test__question-title">
            <span>{{index + 1}}.</span>
            <span>{{question.condition}}</span>
          </div>
          <div class="test__question-answer">
            <div v-if="question.answer_type == 'RADIOS'" class="test__question-radios">
              <label v-for="option in question.answer_options" class="test__question-radio">
                <input
                  :checked="option == question.answer ? true : false"
                  :name="index"
                  type="radio"
                >
                <span class="radio"></span>
                <span>{{option}}</span>
              </label> 
            </div>
            <input
              v-else
              :value="question.answer"
              :type="question.answer_type"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="test-data area">
      <div class="content__block mb">
        <table class="test-data__info">
          <tr>
            <th>Рейтинг:</th>
            <td>{{test.rating}}</td>
          </tr>
          <tr>
            <th>Решения:</th>
            <td>{{test.solutions.length}}</td>
          </tr>
        </table>
      </div>
      <table v-if="test.solutions.length" class="test-data__solutions">
        <tr>
          <th>Пользователь</th>
          <th>Ответы</th>
          <th>Начало</th>
          <th>Конец</th>
        </tr>
        <tr v-for="solution in test.solutions" @click="showSolution(solution)">
          <td>{{solution.user}}</td>
          <td>{{solution.right_answers}} / {{solution.answers.length}}</td>
          <td>{{solution.date_started}}</td>
          <td>{{solution.date_ended}}</td>
        </tr>
      </table>
    </div>
    <Solution ref="solution" :solution="activeSolution" />
  </div>
</template>

<script>
  import '~/assets/css/tests/test.css'

  export default {
    middleware: 'authenticated',
    head: () => ({
      title: 'Мой тест | Tests for everyone'
    }),
    data() {
      return {
       loading: true,
       id: this.$route.params.id,
       test: null,
       activeSolution: null
     }
    },
    components: {
      Solution: () => import('~/components/tests/Solution.vue')
    },
    async fetch() {
      await this.$axios.get(`tests/own/${this.id}/`, {messages: {
        show: false
      }}).then(response => {
        this.test = response.data
        this.loading = false
      }).catch(error => this.$nuxt.error(error))
    },
    methods: {
      showSolution(solution) {
        this.activeSolution = solution
        this.$refs.solution.show()
      }
    }
  }
</script>

<style scoped>
  .area {
    width: calc(50% - 10px);
  }

  .test__question-answer {
    position: relative;
  }

  .test__question-answer:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .test-data {
    font-size: 1rem;
  }

  .test-data__info {
    margin: auto;
    min-width: 80%;
    border-spacing: 0;
  }

  .test-data__info th, .test-data__info td {
    padding: .4em 0;
    border-bottom: 1px solid #999;
  }

  .test-data__info th {
    font-weight: 400;
    color: #666;
    text-align: left;
  }

  .test-data__info td {
    text-align: right;
  }

  .test-data__solutions {
    width: 100%;
    border-spacing: 0;
    text-align: center;
  }

  .test-data__solutions th {
    background: #01987a;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
  }

  .test-data__solutions th,
  .test-data__solutions td {
    padding: .7em;
  }

  .test-data__solutions th:first-child {
    border-top-left-radius: var(--radius);
  }

  .test-data__solutions th:last-child {
    border-top-right-radius: var(--radius);
  }

  .test-data__solutions td {
    background: #fff;
    border-bottom: 2px solid #dedede;
    color: var(--background);
    transition: .2s;
  }

  .test-data__solutions tr:hover td {
    background: #f3f3f3;
    color: #01987a;
    cursor: pointer;
  }

  .test-data__solutions tr:last-child td {
    border-color: #01987a;
  }
</style>
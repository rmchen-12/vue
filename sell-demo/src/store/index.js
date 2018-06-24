import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  itemNum: 1,
  answerId: [],
  itemDetails: [
    {
      "topic_name": "题目一",
      "active_title": "欢乐星期五标题",
      
      "topic_answer": [{
        "topic_answer_id": 1,
        "answer_name": "答案aaaa",
      }, {
        "topic_answer_id": 2,
        "answer_name": "正确答案",
      }, {
        "topic_answer_id": 3,
        "answer_name": "答案cccc",
      }, {
        "topic_answer_id": 4,
        "answer_name": "答案dddd",
      }]
    }, {
      "topic_name": "题目二",
      "active_title": "欢乐星期五标题",
      "topic_answer": [{
        "topic_answer_id": 5,
        "answer_name": "答案A",
      }, {
        "topic_answer_id": 6,
        "answer_name": "答案B",
      }, {
        "topic_answer_id": 7,
        "answer_name": "正确答案",
      }, {
        "topic_answer_id": 8,
        "answer_name": "答案D",
      }]
    }, {
      "topic_name": "题目三",
      "active_title": "欢乐星期五标题",
      "topic_answer": [{
        "topic_answer_id": 9,
        "answer_name": "测试A",
      }, {
        "topic_answer_id": 10,
        "answer_name": "BBBBBB",
      }, {
        "topic_answer_id": 11,
        "answer_name": "CCCCCC",
      }, {
        "topic_answer_id": 12,
        "answer_name": "正确答案",
      }]
    }, {
      "topic_name": "题目四",
      "active_title": "欢乐星期五标题",
      "topic_answer": [{
        "topic_answer_id": 13,
        "answer_name": "正确答案",
      }, {
        "topic_answer_id": 14,
        "answer_name": "A是错的",
      }, {
        "topic_answer_id": 15,
        "answer_name": "D是对的",
      }, {
        "topic_answer_id": 16,
        "answer_name": "C说的不对",
      }]
    }, {
      "topic_name": "题目五",
      "active_title": "欢乐星期五标题",
      "topic_answer": [{
        "topic_answer_id": 17,
        "answer_name": "错误答案",
      }, {
        "topic_answer_id": 18,
        "answer_name": "正确答案",
      }, {
        "topic_answer_id": 19,
        "answer_name": "错误答案",
      }, {
        "topic_answer_id": 20,
        "answer_name": "错误答案",
      }]
    }],
};

export default new Vuex.Store({
  actions,
  mutations,
  state
})

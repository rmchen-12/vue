<template>
  <div>
    <div class="score-background">
      <div class="score-container">
        <span class="score">{{score}}分！</span>
        <span class="score-tips">{{showtips()}}</span>
      </div>
      <div class="share-btn" @click="showtoggle"></div>
      <div class="cover" v-show="showcover" @click="showtoggle()"><img class="img-cover" src="../images/5-2.png"/></div>
      <div class='share-code'>
        <div class="share-title">关注葡萄之家，获取答案</div>
        <div class="code-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "score",
    data() {
      return {
        rightAnswer: [2, 7, 12, 13, 18],
        score: 0,
        tips: ['你说，是不是把知识都还给小学老师了？', '还不错，但还需要继续加油哦！', '不要嘚瑟还有进步的空间！', '智商离爆表只差一步了！', '你也太聪明啦，葡萄之家欢迎你！'],
        showcover: false
      }
    },
    computed: mapState([
      "answerId",
    ]),
    methods: {
      computedScore() {
        this.answerId.forEach((item, index) => {
          if (item == this.rightAnswer[index]) {
            this.score += 20
          }
        })
      },
      showtoggle() {
        this.showcover = !this.showcover
      },
      showtips() {
        if (this.score < 20) {
          return this.tips[0]
        }
        if (20 < this.score < 40) {
          return this.tips[1]
        }
        if (40 < this.score < 60) {
          return this.tips[2]
        }
        if (60 < this.score < 80) {
          return this.tips[3]
        }
        if (80 < this.score) {
          return this.tips[4]
        }
      }
    },
    created() {
      this.computedScore();
      document.body.style.backgroundImage="url(./static/img/4-1.4c4bb05.jpg)"
    }
  }
</script>

<style>
  .score-background {
    background-image: url("../images/4-2.png");
    background-size: 100% 100%;
    position: absolute;
    top: 1rem;
    left: 2.7rem;
    height: 10rem;
    width: 10rem;
  }

  .score-container {
    position: absolute;
    top: 5.1rem;
    left: .8rem;
    height: 4rem;
    width: 9rem;
  }

  .score, .score-tips {
    display: block;
    clear: both;
  }

  .score {
    text-align: center;
    font-family: Tahoma, Helvetica, Arial;
    color: #a51d31;
    font-size: 150%;
    font-weight: 900;
  }

  .score-tips {
    color: gray;
    font-size: small;
    margin-top: 0.4rem;
  }

  .share-btn {
    height: 2.4rem;
    width: 5.5rem;
    background: url("../images/4-3.png");
    background-size: 100% 100%;
    position: absolute;
    top: 10.5rem;
    left: 2.7rem;
  }

  .cover {
    position: fixed;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    background: url(../images/5-1.png) no-repeat;
    background-size: 100% 100%;
    opacity: 0.92;
  }

  .img-cover {
    background-size: 100% 100%;
    height: 11rem;
    width: 12rem;
    margin: 0.6rem 0 0 2rem;
  }

  .share-code {
    height: 10rem;
    width: 10rem;
    position: absolute;
    top: 15rem;
  }

  .share-title {
    color: gray;
    font-size: 50%;
    text-align: center;
  }

  .code-img {
    background: url("../images/4-4.png");
    height: 6rem;
    width: 6rem;
    background-size: 100% 100%;
    margin: 0.4rem auto;
  }
  .body{
    background: url("../images/4-1.jpg");
  }
</style>

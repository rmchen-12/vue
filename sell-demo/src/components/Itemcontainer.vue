<template>
  <div>
    <div class="top-tips">
      <span class="top-num" v-if="parentComponent=='home'">第一周</span>
      <span class="top-num" v-if="parentComponent=='item'">题目{{itemNum}}</span>
    </div>
    <div v-if="parentComponent=='home'">
      <div class="home-logo"></div>
    </div>
    <div v-if="parentComponent=='item'">
      <ul class="item-container">
        <div class="option-container">
          <header class="option-header">{{itemDetails[itemNum-1].topic_name}}</header>
          <li v-for="(item,index) in itemDetails[itemNum-1].topic_answer" @click="choosed(index,item.topic_answer_id)"
              class="option">
            <span v-bind:class="{'has-choosed':choosedNum == index}" class="option-style">{{chooseType(index)}}</span>
            <span class="option-detail">{{item.answer_name}}</span>
          </li>
        </div>
      </ul>
    </div>
    <div v-if="parentComponent=='home'">
      <router-link to="/item" class="home-btn"></router-link>
    </div>
    <div v-if="parentComponent=='item'">
      <span @click="next()" class="home-btn next-item" v-if="itemNum<itemDetails.length"></span>
      <span @click="submit()" class="home-btn submit" v-else></span>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    props: ['parent-component'],
    computed: mapState([
      'itemNum', 'itemDetails'
    ]),
    data() {
      return {
        choosedNum:null,
        choosedId:null,
      }
    },
    methods: {
      ...mapActions([
        'initialization','nextItem'
      ]),
      submit(){
        if (this.choosedNum !== null){
          this.nextItem(this.choosedId)
          this.$router.push('./score')
        }else {
          alert('还没有选择答案！')
        }
      },
      next(){
        if (this.choosedNum !== null){
          this.choosedNum = null;
          this.nextItem(this.choosedId)
        }else {
          alert('还没有选择答案！')
        }
      },
      choosed(index, type) {
        this.choosedNum = index;
        this.choosedId = type
      },
      chooseType(index) {
        switch (index) {
          case 0:
            return 'A';
          case 1:
            return 'B';
          case 2:
            return 'C';
          case 3:
            return 'D';
        }
      }
    },
   created(){
    this.initialization();
    document.body.style.backgroundImage = 'url(./static/img/1-1.a92218b.jpg)'
   }
  }
</script>

<style scoped>
  .top-tips {
    background: url("../images/WechatIMG2.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 1.6rem;
    top: -0.4rem;
    height: 6rem;
    width: 3rem;
    z-index: 10;
  }

  .top-num {
    position: absolute;
    bottom: 0.8rem;
    right: 0.7rem;
    font-size: 0.5rem;
    font-weight: 900;
    color: darkred;
    text-align: center;
  }

  .home-logo {
    background: url('../images/1-2.png') no-repeat;
    background-size: 13.142rem 100%;
    margin: 4rem 0 0 1.1rem;
    height: 12rem;
    width: 20rem;
  }

  .home-btn {
    background-image: url("../images/1-4.png");
    background-repeat: no-repeat;
    display: block;
    position: absolute;
    top:16rem;
    left: 6rem;
    height: 2.1rem;
    width: 4.35rem;
    background-size: 100%;
  }
  .next-item{
    background-image: url("../images/2-2.png");
  }
  .submit{
    background-image: url("../images/3-1.png");
  }
  .item-container {
    height: 11rem;
    width: 13rem;
    margin: 4rem auto;
    z-index: 222;
    background: url("../images/2-1.png") no-repeat;
    background-size: 100% 100%;

  }
  .option-container {
    margin: 2rem 0 0 2rem;
    float: left;
  }
  .option {
    float: left;
    clear: both;
  }
  .option-style,.option-detail{
    color: white;
    font-size: 70%;
  }
  .option-header{
    color: white;
    font-size: 70%;
  }
  .has-choosed{
    color: dodgerblue;
  }

</style>

<template>
  <div>
    <div class="box"></div>
    
    <div class="taggle-btn">
      <span class="taggle-1" @click="changeIdx(1)">总览</span>
      <span class="taggle-2" @click="changeIdx(2)">区块信息</span>
    </div>

<!-- 总览 -->
    <div v-if="tasks && $route.params.gid" :class="{ active: flag1 }">
      <div class="info-box" >
        <span class="info-name">任务总览</span>
        <span class="info-content">
          {{ getFiles(tasks) }}
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">任务大小</span>
        <span class="info-content">
          {{ tasks.totalLength / 1024 / 1042 }} MB
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">任务状态</span>
        <span class="info-content">
          {{ tasks.status == 'active' ? '正在下载' : '未知' }}
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">进度</span>
        <span class="info-content">
          {{ ((tasks.files[0].completedLength / tasks.totalLength) * 100 ).toFixed(2) }} %
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">下载</span>
        <span class="info-content">
          {{ (tasks.downloadSpeed / 1024).toFixed(2) }} kb/s
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">连接数</span>
        <span class="info-content">
          {{ tasks.connections }}
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">下载地址</span>
        <span class="info-content">
          {{ tasks.files[0].path }}
        </span>
      </div>
      <div class="info-box">
        <span class="info-name">路径</span>
        <span class="info-content">
          {{ tasks.dir }}
        </span>
      </div>
    </div>

<!-- 区块信息 -->
    <BlockInfo v-if="tasks && $route.params.gid" :class="{ active: flag2 }"></BlockInfo>

  </div>
</template>

<style>
  .box{
    height: 52px;
    display: flex;
    flex-direction: column;
  }

  .taggle-btn{
    height: 42px;
    line-height: 42px;
    text-align: left;
    color: rgb(170, 170, 170)
  }

  .taggle-btn span{
    text-align: center;
    display: inline-block;
  }

  .taggle-btn span:hover{
    border-bottom: 2px solid rgb(32, 143, 292);
    color: rgb(32, 143, 292);
    cursor: pointer;
  }


  
  .taggle-btn span:first-child{
    width: 60px;
  }

  .taggle-btn span:nth-child(2){
    width: 80px;
  }

  .info-box{    
    height: 38px;
    text-align: left;
    line-height: 38px;
  }


  .info-box:nth-child(odd){
    background-color: rgb(249, 249, 249);
    border: 1px solid rgb(221, 221, 221)
  }

  .info-name{
    width: 290px;
    display: inline-block;
  }

  .info-name, .info-content{
    padding-left: 20px;
  }

  .active{
    display: none;
  }
</style>


<script>
import BlockInfo from "./BlockInfo.vue"

export default {
  props: ['aria2'],
  data(){
    return{
      tasks: null,
      flag1: false,
      flag2: true
    }
  },
  components: {
    BlockInfo
  },
  async mounted() {
    this.intervalId = setInterval(async () => {
      this.tasks = await this.aria2.tellStatus(this.$route.params.gid)
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    getFiles(it){
      // console.log(it)
      return it.files[0].path.split('/').at(-1)
    },
    changeIdx(str){
      if(str == 1){
        this.flag1 = false
        this.flag2 = true
      } else {
        this.flag1 = true
        this.flag2 = false
      }
      
    }
  }
}
</script>
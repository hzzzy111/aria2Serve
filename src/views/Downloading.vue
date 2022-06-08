<template>
  <div >
    <div class="top-btn nav-top-table">
      <div @click="DownloadPage = false; ">
        <router-link to="/nexttack">
          <span style="padding-left: 17px">
            <i class="el-icon-plus"></i>
            新建
          </span>
        </router-link>
      </div>
      <span class="nav-top-line"></span>
      <button @click="execSelected('unpause')">
        <i class="el-icon-video-play"></i>
      </button>
      <button @click="execSelected('pause')">
        <i class="el-icon-video-pause"></i>
      </button>
      <button @click="execSelected('remove')">
        <i class="el-icon-folder-delete"></i>
      </button>
      <span class="nav-top-line"></span>
      <button @click="selectAllItem()">
        <i class="el-icon-document-copy"></i>
      </button>

    </div>

    <div class="task-table-title">
      <span>文件名</span>
      <span>大小</span>
      <span style="width: 20%">进度</span>
      <span>下载速度</span>
    </div>

    <ul class="download-info" style="margin: 0">
      <li v-for="(task,i) of tasks" :key="i" @click="toggleSelectd(task)" class="main-boxStyle">
        
        <ul class="download-body-info">
          <li>
            <input type="checkbox" :checked="selected.includes(task.gid)" >
            {{ getFilenames(task.files[0].path) }}  
          </li>
      
          <li style="width: 20%"> 
            <el-progress :percentage="+fixed(task.completedLength / task.totalLength * 100)" :format="format"
            :text-inside="true" :stroke-width="26">
            </el-progress>
            <!-- {{  fixed(task.completedLength / task.totalLength * 100) }}%  -->
          </li>
          <li> {{ fixed(task.downloadSpeed / 1024) }} kb/s </li>
          <li style="text-align: right">
            <i class="el-icon-more download-btn" @click.stop="goDetails(task)"></i>
          </li>
        </ul>

      </li>
    </ul>
  </div>
</template>

<style>
  .appPage{
    display: none;
  }
  .download-info{
    margin: 0;
    padding: 0;
    line-height: 49px;
  }
  .download-body-info{
    padding: 0;
    width: 100%;
  }
  .download-body-info li{
    display: inline-block;
    width: 10%;
  }
  .download-body-info li:first-child{
    width: 60%;
  }
  .download-btn{
    width: auto;
    text-align: right;
    font-size: 30px;
    padding-right: 20px;
  }
  .el-progress-bar__outer{
    width: 80%;
  }
</style>

<script>
// @ is an alias to /src


export default {
  name: "Downloading",
  props: ['aria2'],
  data(){
    return{
      tasks: [],
      selected: [],
      percentage: null,
    }
  },
  mounted() {
    this.$store.state.DownloadPage = false
    if(this.aria2){
      
    }
    this.intervalId = setInterval(async () => {
      //异步捕获错误
      // *捕获错误要联系上下文，而异步回调时捕获不到错误。
      try{
        await this.updateList()
      } catch(e) {
        if(e == 'WS_CONNECTION_ERROR'){
          clearInterval(this.intervalId)
        }else{
          throw e
        }
      }
      // console.log(await window.aria2.tellActive())
    }, 1000)
  },
  watch: {
    aria2() {
      this.tasks = []
      this.updateList()
    }
  },
  beforeDestroy(){
    clearInterval(this.intervalId)
  },
  methods: {
    async updateList(){
      try{
        this.tasks = [
          ...await this.aria2.tellActive(),
          ...await this.aria2.tellWaiting(0, 1000)
        ]
        console.log(1)
      } catch(e) {
        this.tasks = []
        throw e
      }
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    getFilenames(str) {
      return str.split('/').at(-1)
    },
    fixed(num){
      num = +num
      return num.toFixed(2)
    },
    toggleSelectd(task){
      let idx = this.selected.indexOf(task.gid)
        // debugger;
      if(idx == -1){
        this.selected.push(task.gid)
      }else{
        this.selected.splice(idx, 1)
      }
    },
    execSelected(str){
      this.selected.forEach(async (it) => {
        try{
          await this.aria2[str](it)
          this.updateList()
        }catch{
          console.log('dont\; repeat')
        }
      })
    },
    selectAllItem(){
      if(this.selected.length == this.tasks.length){
        this.selected = []
      }else{
        this.selected = this.tasks.map(it => it.gid)
      }
    },
    goDetails(task){
      this.$router.push(`/taskinfo/${task.gid}`)
    }
  },
  
};
</script>

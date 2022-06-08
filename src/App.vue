<template>
  <div id="app">
    <div id="nav">
      <div class="nav-top">
        <h1 style="text-align: center;" @click="dropDownSty = !dropDownSty">
          hh
          <i class="el-icon-arrow-down"></i>
        </h1>
        <div class="drop-down" :class="{dropDownSty: dropDownSty}">
          <p v-for="(serve,i) in serves" class="drop-down-link" :key="i" @click=" dropLinkIcon = serve.name ; switchServe(serve)" >
            {{ serve.name }}
            <i class="el-icon-check"  :class="{ dropLinkIcon: dropLinkIcon == serve.name }"></i>
          </p>
          {{ collectionStatus }}
        </div>
        <p class="pSame">下载</p>
      </div>
      <div class="nav-main">
        <!-- :class="{toggleStyle: btnClick == key}"   -->
        <p class="btnClick" @click=" DownloadPage = true;btnClick('Downloading')"  ref = "Downloading" >
          <router-link to="/">
            <span style="padding-left: 17px">
              <i class="el-icon-download"></i>
              正在下载
            </span>
          </router-link> 
        </p>
        <p @click="DownloadPage = false ;btnClick('Completed')"  ref = "Completed">
          <!-- <i class="el-icon-loading"></i> -->
          <router-link to="/completed">
            <span style="padding-left: 17px">
              <i class="el-icon-download"></i>
              已完成
            </span>
          </router-link> 
        </p>
        <!-- <p @click="btnClick()"  ref = "NextTack">
          <router-link to="/nexttack">
            <span style="padding-left: 17px">
              <i class="el-icon-download"></i>
              新建任务
            </span>
          </router-link>
        </p> -->
        <main class="pSame">系统</main>
        <p @click="DownloadPage = false; btnClick('Setting')"  ref = "Setting">
          <router-link to="/setting">
            <span style="padding-left: 17px">
              <i class="el-icon-download"></i>
              aria2 设置
            </span>
          </router-link>
        </p>
        <p @click="DownloadPage = false; btnClick('Serves')"  ref = "Serves">
          <router-link to="/serves" >
            <span style="padding-left: 17px">
              <i class="el-icon-download"></i>
              aria2 服务器设置
            </span>
          </router-link>
        </p>
      </div>
    </div>
    <div style=" flex: 1; height: 100%">
      <div class="nav-footer">

        <div :class="{appPage: DownloadPage}">
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
        </div>
        
        <router-view :aria2="aria2" @serve-changed ="serves = $event"/>

        <footer >
          <div class="messageBox">
            <el-button  type="text" @click="dialogVisible = true" class="el-icon-s-tools">快捷方式</el-button>

            <div style="display: inline-block; position: absolute; right: 20px; margin-top: 25px">
              <span v-if="task"><i class="el-icon-download" style="color: rgb(116, 163, 41)"></i> {{ numFixed(task.downloadSpeed)  }} kb/s </span>
              <span v-if="task"><i class="el-icon-upload" style="color: rgb(58, 137, 232)"></i> {{ numFixed(task.uploadSpeed)  }} kb/s </span>
            </div>

            <el-dialog
              title="全局限制速度"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
              class="el-box">
              <template>
                <span>全局最大下载速度</span>
                <p class="limitBox">
                  <el-input :value="maxDownloadLimit" v-model="maxDownloadLimit" ></el-input>
                  <span>字节</span>
                </p>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="changeLimit()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </footer>
      </div>

    </div>
    
  </div>
</template>

<script>
import Aria2Client from './aria2-client.js'
import Vue from 'vue'

export default {
  data(){
    // this.$store.commit('getStore')
    // console.log(this.$store.state.setStoreNum)
    // let serves = JSON.parse(String(this.$store.state.setStoreNum)) || [] 
    let serves = JSON.parse(localStorage.getItem('aria2Serves')) || [] 
    let btnSty = JSON.parse(localStorage.getItem('btnSty')) || [] 
    return{
      toggleStyle: '',
      judgeStyle: [],
      dialogVisible: false,
      maxDownloadLimit: 0,
      task: null,
      dropDownSty: false,
      dropLinkIcon: null,
      serves: serves,
      selectedServes: null,
      collectionStatus: '',
      aria2: null,
      DownloadPage: true,
      btnSty: btnSty,
    }
  },
  created(){
    if(this.serves.length == 0){
      this.serves = [{name: '127.0.0.1:6800', host: '127.0.0.1', port: '6800', secert: ''}]
    }
    this.selectedServes = this.serves[0]
    this.switchServe(this.selectedServes)
  },
  async mounted(){
    
    if(this.$route.name != 'Downloading'){
      this.DownloadPage = false
    }

    try{
      this.task = await this.aria2.getGlobalStat()
    } catch(e){
      console.log('WS_CONNECTION_ERROR')
    }

    this.setIntervalId = setInterval(async () => {
      try{
        this.task =  await this.aria2.getGlobalStat()
      } catch(e){
        if(e == 'WS_CONNECTION_ERROR'){
          clearInterval(this.setIntervalId)
        } else {
          throw e
        }
      }
      // this.serves = JSON.parse(localStorage.getItem('aria2Serves')) || [] 
    }, 1000)

    // if(this.aria2){
      
    // }
    

    // 异步组件加载，获取不到$route
    let _this = this
    // setTimeout(() => {
    //   this.btnClick(_this.$route.name)
    // }, 500);
    this.$router.onReady(() => {
      this.btnClick(_this.$route.name)
    })
  },
  beforeDestroy(){
    clearInterval(this.setIntervalId)
  },
  methods: {
    async switchServe(serves){
      this.selectedServes = serves
      console.log('关闭现有的服务器')
      this.aria2?.close()
      
      this.collectionStatus = '连接中...'

      console.log('连接新的服务器')
      // debugger
      let aria2 = new Aria2Client(this.selectedServes)
      this.aria2 = aria2
      
      try{
        await aria2.ready()
        this.collectionStatus = '连接成功'
      } catch(e) {
        this.collectionStatus = '连接失败'
      }

    },
    btnClick(str){
      let item = this.$refs
      str = str == 'NextTack' ? this.btnSty.sty : str
      if(str != 'NextTack'){
        localStorage.setItem('btnSty', JSON.stringify({sty: str}))
      }
      // console.log(this)
      this.$store.state.toggleSele = item
      // this.$route.name = item
      for(let key in item){
        item[key].className = ''
      }
      item[str].className = 'btnClick'
    },
    numFixed(num){
      return (num / 1024).toFixed(2)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async changeLimit(){
      console.log(1)
      this.dialogVisible = false
      await this.aria2.changeGlobalOption({'max-overall-download-limit': this.maxDownloadLimit+''})
    },
  },

}
</script>

<style lang="less">
html, body{
  height: 100%;
}

body {
  margin: 0;
  min-width: 1226px;
  height: 0 auto;
}

a {
  text-decoration: none;
}

ul{
  list-style-type: none;
}

.nav-top-table{
  height: 52px;
  border-top: 1px solid rgb(221, 221, 221);
  border-bottom: 1px solid rgb(221, 221, 221);
  width: 100%;
  background: rgb(246, 246, 246);
  font-size: 16px;
}

.nav-top-table > div{
  padding: 15px 17px 15px 0;
}

.nav-top-table i.el-icon-plus{
  font-weight: bolder;
}

.nav-top-table button{
  height: 52px;
  border: none;
  background: none;
  padding-left: 7px;
}

.nav-top-table button:last-child{
  padding: 15px;
}

.nav-top-table i {
  font-size: 20px;
  color: #2c3e50;
}

.nav-top-table a {
  color: rgb(112, 112, 112);
}

.nav-top-table > div span{
  padding: 0;
}

.nav-top-table > div, .nav-top-table > button{
  display: inline-block;
  vertical-align: top;
}

.nav-top-line{
  display: inline-block;
  height: 30px;
  margin-top: 11px;
  width: 1px;
  background: rgb(199, 198, 198);
}

.main-boxStyle{
  width: 100%;
  display: flex;
  height: 49px;
  border-top: 1px solid rgb(195, 192, 192);
  margin: 0;
}

.main-leftStyle{
  text-align: left;
  padding-left: 20px;
  height: 49px;
  line-height: 49px;
}

.main-rightStyle{
  width: 70%;
  margin: 0 30px 0 auto;
  line-height: 49px;
}

.main-boxStyle:first-child{
  border-top: none;
}
.main-boxStyle:nth-child(odd){
  background-color: rgb(245, 245, 245);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
  margin: 0;
}

#nav {
  width: 229px;
  background-color: rgb(62, 72, 82);
  // text-align: center;
}

.nav-top{
  height: 74px;
}

.nav-top h1 {
  color: white;
  height: 51px;
  margin: 0;
  font-size: 30px;
  line-height: 51px;
  position: relative;
  cursor: pointer;
}

.nav-top h1:hover{
  color: #b2b6bb;
}

.pSame {
  background-color: rgb(42, 50, 62);
  height: 22px;
  border-top: 1px solid rgb(112, 112, 112);
  margin: 0;
  position: relative;
  font-size: 10px;
  color: rgb(112, 112, 112);
  text-align: left;
  line-height: 22px;
  padding-left: 17px;
}

.btnClick, p.btnClick a, p.btnClick i {
  background-color: rgb(37, 44, 48);
  color: rgb(83, 153, 232);
  margin: 0;
}


.nav-main{
  height: 40px;
}

.nav-main a{
  width: 229px;
  display: inline-block;
  padding: 0;
}

.nav-main a, i{
  text-decoration: none;
  color:rgb(223, 223, 223);
  font-size: 15px;
  text-decoration: none;
  line-height: 40px;
}

.nav-main p{
  height: 23px;
  text-align: left;
  cursor: pointer;
  margin: 0;
  height: 40px;
}

.nav-footer{
  display: flex;
  flex-direction: column;
  height: 100%;
}

footer {
  width: 100%;
  height: 70px;
  border-top: 1px solid rgb(190, 188, 188);
  margin-top: auto;
}

.limitBox{
  margin: 0;
}

.limitBox .el-input{
  display: inline-block;
  width: 80%;
}

.limitBox span{
  text-align: center;
  background-color: rgb(238, 238, 238);
  border-radius: 3px;
  border: 1px solid rgb(238, 238, 238);
  height: 38px;
  display: inline-block;
  vertical-align: top;
  line-height: 40px;
}

.messageBox button{
  height: 70px;
  padding-left: 20px;
  color: rgb(112, 112, 112);
}

.messageBox span{
  padding-left: 10px;
  position: relative;
}

.drop-down{
  width: 229px;
  height: auto;
  position: absolute;
  background: white;
  z-index: 2000;
  display: none;
}

.drop-down-link{
  width: 100%;
  height: 26px;
  margin: 5px 0 0 0;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}

.drop-down-link:last-child{
  margin-bottom: 5px;
}

.drop-down-link:hover{
  background: #c3c5c6;
  color: white;
  height: 26px;
}

.dropDownSty{
  display: block;
}

.dropDownSty i.el-icon-check{
  display: none;
}

.dropDownSty i.dropLinkIcon{
  display: inline-block;
}
.task-table-title {
  height: 26px;
}
.task-table-title span {
  width: 10%;
  display: inline-block;
}
.task-table-title span:first-child{
  width: 40%;
}
.task-table-title span:nth-child(2){
  width: 20%
}



@media screen and (max-width: 680px){
  .el-box{
    display: none;
  }
  .messageBox div{
    display: none;
  }
}

</style>

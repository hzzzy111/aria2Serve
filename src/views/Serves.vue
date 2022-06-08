<template>
  <div>
    <div class="toggle-nav">
      <div v-for="(serve, i) of serves" :key="i"  :class="{ navDisplay: serve.name == changeServeName }">
        <span class="navStyle" @click.stop="handleChange(serve)" >
          {{ serve.name }}
        </span>
        <span @click="deleteServe(serve)"><i class="el-icon-circle-close" ></i></span>
      </div>
      <div>
        <div class="toggle-add" >
          <el-button type="text" @click="dialogFormVisible = true">
            <i class="el-icon-circle-plus-outline"></i>
          </el-button>
        </div>

        <el-dialog title="服务器" :visible.sync="dialogFormVisible">
          <el-form :model="newServer">
            <el-form-item label="名字"  :label-width="'120px'">
              <el-input  autocomplete="off" v-model="newServer.name" :placeholder="newServer.host + ':' + newServer.port"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="'120px'" >
              <el-input v-model="newServer.host" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="端口" :label-width="'120px'" >
              <el-input v-model="newServer.port" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密钥" :label-width="'120px'">
              <el-input v-model="newServer.secert" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeServes()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="toggle-content" v-for="(serve, i) of serves" :key="i">
      <div :class="{ changePage: serve.name == changeServeName }" class="display-content">
        <div class="main-boxStyle">
          <span class="main-leftStyle">名字</span>
          <el-input type="text" class="main-rightStyle" v-model="saveServe.name" ></el-input>
        </div>
        <div class="main-boxStyle">
          <span class="main-leftStyle">地址</span>
          <el-input type="text" class="main-rightStyle" v-model="saveServe.host" ></el-input>
        </div>
        <div class="main-boxStyle">
          <span class="main-leftStyle">端口</span>
          <el-input type="number" class="main-rightStyle" v-model="saveServe.port" ></el-input>
        </div>
        <div class="main-boxStyle">
          <span class="main-leftStyle">密匙</span>
          <el-input type="password" class="main-rightStyle" v-model="saveServe.secert" ></el-input>
        </div>
        
        <el-button type="primary" @click="changeServesOnPage(serve)">修改</el-button>
      </div>
    </div>
  
  </div>
</template>

<style>
  .main-boxStyle .el-input{
    width: 70%;
  }
  .main-boxStyle:last-child{
    border-bottom: 1px solid rgb(195, 192, 192);
  }
  .toggle-nav{
    display: flex;
    cursor: pointer;
  }
  .toggle-nav > div{
    width: 155px;
    height: 49px;
    text-align: center;
    line-height: 49px;
  }
  .display-content{
    display: none
  }
  .changePage{
    display: block;
  }
  .navDisplay{
    color: rgb(32, 143, 299);
    border-bottom: 2px solid rgb(32, 143, 299);
  }
  .el-icon-circle-close:hover{
    background-color: rgb(181, 3, 3);
    color: white;
    border-radius: 59%;
    border: none;
    font: 20px;
  }
  .toggle-nav > div:first-child span i {
    display: none;
  }
  .toggle-close{
    text-align: left; 
    width: 150px; 
    display: inline-block
  }
  .navStyle{
    width: 80%;
    display: inline-block;
  }
</style>

<script>
export default {
  props: ['aria2'],
  data(){
    let serves = JSON.parse(localStorage.getItem('aria2Serves')) || [] 
    return{
      serves: serves,
      dialogFormVisible: false,
      newServer: {
        name: '',
        host: '127.0.0.1',
        port: '6800',
        secert: ''
      },
      saveServe: {
        name: '',
        host: '',
        port: '',
        secert: ''
      },
      formLabelWidth: '120px',
      changeServeName: '',
      setPassword: '',
      
    }
  },
  // beforeCreate() {
  //   debugger
  // },
  created() {
    if(this.serves.length == 0){
      this.newServer.name = '127.0.0.1:6800'
      this.serves.push(this.newServer)
    }
    this.changeServeName= '127.0.0.1:6800'
  },
  mounted() {
    this.handleChange(this.serves[0])
  },
  watch: {
    // 套两层循环 深层次的 使用函数模式搜索不到。
    // watch里： serves的改变页面不会重新渲染？
    serves: {
      handler (serves) {
        localStorage.setItem('aria2Serves', JSON.stringify(serves))
        this.$emit('serve-changed', serves)
      },
      deep: true,
      immediate: true,
    }

    // serves(){
    //   localStorage.setItem('aria2Serves', JSON.stringify(serves))
    //   this.$emit('serve-changed', this.serves)
    // }
  },
  // updated(){
  //   if(this.serves.length == 1){
  
  //     this.changeServeName = this.serves[0].name
  //   }
  // },
  methods: {
    async changeServes() {
      this.dialogFormVisible = false
      //不重置前面旧的newServes还在联系着（可以用页面刷新看newServe的数组）
      if(!this.newServer.name){
        try{
          await this.$confirm('请命名')
          return
        } catch(e){
          return
        }
      }
      for(let item in this.serves){
        if(this.serves[item].name == this.newServer.name){
          // localStorage.removeItem(JSON.stringify(serve[item]))
          try{
            await this.$confirm('名字已存在')
            return
          } catch(e){
            return
          }
        }
      }
      this.serves.push(this.newServer)
      this.handleChange(this.newServer)
      this.newServer= {
        name: '',
        host: '127.0.0.1',
        port: '6800',
        secert: ''
      }
    },
    changeServesOnPage(serve) {
      // 修改选项的值时
      let it = this.serves
      for(let key in it){
        if(it[key].name == serve.name){
          this.serves.splice(+key, 1, this.saveServe)
          
          // for(let y in this.saveServe){
          //   this.serves[key][y] = this.saveServe[y]
          // }
          // 这种以数组的下标修改，watch感应不到修改的。

          this.changeServeName = this.serves[key].name
          // this.$emit('getStoreNum', this.serves[key].name)
          return
        }
      }
    },
   handleChange(serve){
      this.changeServeName = serve.name
      // this.saveServe = serve
      // 使用这种方法会让saveServe直接跟serve绑定
      for(let key in serve){
        this.saveServe[key] = serve[key]
      }
    },
    deleteServe(name){
      let serve = this.serves
      for(let item in serve){
        if(serve[item].name == name.name){
          serve.splice(item, 1)
          this.changeServeName = serve[item - 1].name
          this.handleChange(serve[item - 1])
          return
        }
      }
    }
  },
  
}
</script>
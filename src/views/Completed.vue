<template>
  <div>
    <ul class="complete-sty">
      <li v-for="(task, i) of tasks" :key = i class="main-boxStyle">
       {{ getFilenames(task.files[0].path) }} / {{ fixed(task.completedLength / task.totalLength * 100)  }}% 
      </li>
    </ul>
  </div>
</template>

<style>
  .complete-sty{
    margin: 0;
    padding: 0;
  }
  .complete-sty li{
    line-height: 49px;
  }
</style>

<script>
export default {
  name: 'completed',
  props: ['aria2'],
  data(){
    return{
      tasks: []
    }
  },
  mounted(){
    this.$store.state.DownloadPage = false
    try{
      this.intervalId = setInterval(async () => {
        // console.log(this.aria2.tellStopped())
        this.tasks = await this.aria2.tellStopped(0, 1000)
      }, 1000)
    }catch(e){
      if(e == 'WS_CONNECTION_ERROR'){
        clearInterval(this.intervalId)
      }else{
        throw e
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.intervalId)
  },
  methods: {
    getFilenames(str) {
      return str.split('/').at(-1)
    },
    fixed(num){
      num = +num
      return num.toFixed(2)
    } 
  }
}
</script>
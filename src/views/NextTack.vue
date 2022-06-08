<template>
  <div>
      <textarea cols="30" rows="10" v-model="item">aaa</textarea>
      <button @click="uploadItem(item)">确定</button>
  </div>  
</template>

<script>
export default {
  name: "NextTick",
  props: ['aria2'],
  data(){
    return{
      item: ''
    }
  },
  methods: {
    async uploadItem(item){
      //要变成数组
      let uris = item.split('/n').map(it => it.trim())
      await this.aria2.addUri(uris)
      // this.$store.state.toggleSele['Downloading'].className = 'btnClick'
      // this.$store.state.toggleSele['NextTack'].className = ''
      this.$router.push('/')
    }
  }
}
</script>
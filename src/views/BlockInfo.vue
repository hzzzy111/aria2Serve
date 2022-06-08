<template>
  <div>
    <span v-for="(it,i) in bitfied" :key = i class="bitfiedBox" :class="{ changeBitfied: it == 1 }"></span>
  </div>
</template>

<style>
  div{
    text-align: left;
  }
  .bitfiedBox{
    background-color: rgb(238, 242, 244);
    height: 15px;
    width: 15px;
    margin: 5px;
    display: inline-block;
  }
  .changeBitfied{
    background-color: aquamarine;
  }
</style>

<script>
export default {
  props: ['aria2'],
  data() {
    return{
      task: null,
      bitfied: null
    }
  },
  async mounted() {
    this.task =  await window.aria2.tellStatus(this.$route.params.gid)
    console.log(this.task)
    this.bitfied = this.task.bitfield.split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('').split('')
    console.log(this.bitfied)
  },
  beforeDesTroy() {
    clearInterval(this.intervalId)
  },

}
</script>
<template>
    <div style="overflow-y: scroll;">
      <template>
        <el-row>
          <el-button type="primary" round @click="changeGlobalOpt()">提交</el-button>
        </el-row>
        <p v-for="(it, i) in setting" class="setting main-boxStyle" :key="i + 'a'" >
          <span class="text"> {{ $store.state.settingDesc[i] || i }} </span>
          <template>
            <template v-if="it == 'true' || it == 'false'"  >
              <div style="width: 70%" class="select">
                <el-radio v-model="setting[i]" value="true" label="true" >是</el-radio>
                <el-radio v-model="setting[i]" value="false" label="false">否</el-radio>
              </div>
            </template>
            <div v-else-if="it == '/^[0-9]+$/.test(it)'" style="width: 70%" class="select">
              <el-input  v-model="setting[i]" ></el-input>
            </div>
            <div v-else style="width: 70%" class="select">
              <el-input v-model="setting[i]" ></el-input>
            </div>
          </template>
        </p>
      </template>
    </div>
</template>

<script>
export default {
  props: ['aria2'],
  data(){
    return{
      setting: null,
      radio: '1',
    }
  },
  async mounted(){
    this.setting = await this.aria2.getGlobalOption()
  },
  methods: {
    async changeGlobalOpt(){
      this.aria2.changeGlobalOption(this.setting)
      this.setting = await this.aria2.getGlobalOption()
    }
  }
}
</script>

<style>
  .text{
    line-height: 49px;
    padding-left: 20px;
  }
  .select{
    margin: 0 30px 0 auto;
    line-height: 49px;
  }
  .el-row{
    text-align: right;
    padding-right: 30px;
  }
  
</style>
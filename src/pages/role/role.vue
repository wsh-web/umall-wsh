<template>
  <div>
     <el-button type='primary' class="add" @click="willAdd">添加</el-button>
      <v-add ref='add' :info="info"  @init="init" ></v-add>
      <v-list ref='list' @init="init" :info="info" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
import {reqMenuList} from '@/utils/http'
export default {
  components:{
    vAdd,
    vList
  },
  data(){
    return{
      info:{
        ishow:false,
        isAdd: true
      },

    }
  },
  methods:{
    willAdd(){
      this.info.ishow=true
      this.info.isAdd=true
    },
    init(){
      this.$refs.list.init()
    },
    edit(id){
      this.info.ishow=true  
      this.info.isAdd=false 
      this.$refs.add.getOne(id)
    }
    
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.add{
  margin:20px 0;
}
</style>
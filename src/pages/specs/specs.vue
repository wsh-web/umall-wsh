<template>
  <div>
      <el-button class="add" type="primary" @click="willAdd">添 加</el-button>
      <v-list  @edit="edit" ></v-list>
      <v-add :info="info"  ref="add"></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from './components/add'
import {reqManageCount,reqManageList} from "@/utils/http"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return{
      info:{
        ishow:false,
        isAdd:true
      },
    }
  },
  methods:{
    willAdd(){
      this.info.ishow=true
    },
    edit(id){
      this.info.ishow = true
      this.info.isAdd=false
      this.$refs.add.getOne(id)
    },
  },

}
</script>

<style scoped>
.add{
  margin: 20px 0;
}
</style>
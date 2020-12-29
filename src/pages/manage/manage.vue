<template>
  <div>
      <el-button class="add" type="primary" @click="willAdd">添 加</el-button>
      <v-list ref = "list" @edit="edit" :list="list"></v-list>
      <v-add :info="info" @init="init" ref="add"></v-add>
       <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="changePage" background> </el-pagination>
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
      list: [],
      info:{
        ishow:false,
        isAdd:true
      },
      total:0,
      pageSize:2,
      page:1
    }
  },
  methods:{
    changePage(e){
      this.page=e
      this.getList()
    },
    willAdd(){
      this.info.ishow=true
    },
    init(){
      this.getToal()
      this.getList()
    },
    edit(uid){
      this.info.ishow = true
      this.info.isAdd=false
      this.$refs.add.getOne(uid)
    },
    getToal(){
      reqManageCount().then(res=>{
        if(res.data.code ==200){
          this.total = res.data.list[0].total
        }
      })
    },
    getList(){
      reqManageList({ size: this.pageSize, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          this.list= res.data.list;
        }
      });
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped>
.add{
  margin: 20px 0;
}
</style>
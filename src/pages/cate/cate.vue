<template>
  <div>
    <el-button type="primary" class="add" @click="willAdd">添加</el-button>
    <v-add ref="add" :info="info" @init="init"></v-add>
    <v-list
      :list="list"
      @init="init"
      :info="info"
      @edit="edit($event)"
    ></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { reqcateList } from "@/utils/http";
import {mapGetters,mapActions} from "vuex"
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        ishow: false,
        isAdd: true,
      },
    };
  },
  computed:{
    ...mapGetters({
      list:'cate/list'
    })
  },
  methods: {
    ...mapActions({
      reqList:"cate/reqList"
    }),
    willAdd() {
      this.info.ishow = true;
    },
    edit(id) {
      this.info.ishow = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id);
    },
    init(){
      this.reqList({istree:true})
    }
  },
  mounted(){
    this.reqList({istree:true})
  }
};
</script>

<style scoped>
.add {
  margin: 20px 0;
}
</style>
<template>
  <div>
    <el-button type="primary" class="add" @click="willAdd">添加</el-button>
    <v-add ref="add" :info="info" @init="init"></v-add>
    <v-list
      :info="info"
      @edit="edit($event)"
      :list="list"
      @init="init"
    ></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import {reqSkillList} from "@/utils/http"
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
      list:[]
    };
  },
  methods: {
    willAdd() {
      this.info.ishow = true;
      this.info.isAdd = true;
    },
    init() {
      reqSkillList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.ishow = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.add {
  margin: 20px 0;
}
</style>
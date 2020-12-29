<template>
  <div>
    <el-button type="primary" class="add" @click="willAdd">添 加</el-button>
    <v-list :list='list' @init='init' :info='info' @edit='edit($event)'></v-list>
    <v-add :info="info" @init="init" :list="list" ref="one"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import { reqMenuList , reqMenuGetOne} from "@/utils/http";
export default {
  data() {
    return {
      info: {
        ishow: false,
        isadd:true,
      },
      
      list: [],
    };
  },
  components: {
    vAdd,
    vList,
  },
  methods: {
    init() {
      reqMenuList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    willAdd() {
      this.info.isadd = true;

      this.info.ishow = true;
     
    },
    edit(id){
      this.info.ishow=true,
      this.$refs.one.getOne(id)
    }
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
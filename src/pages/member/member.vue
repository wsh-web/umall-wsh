<template>
  <div>
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
import { reqMemberList } from "@/utils/http";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        ishow: false,
      },
      list:[]
    };
  },
  methods: {
    init() {
      reqMemberList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(uid) {
      this.info.ishow = true;
      this.$refs.add.getOne(uid);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>

</style>
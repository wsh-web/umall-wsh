<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSkillDel } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info","list"],
  data() {
    return {
      data: [],
    };
  },
  methods: {
   
    del(id) {
      reqSkillDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  
};
</script>

<style>
</style>
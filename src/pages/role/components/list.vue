<template>
  <div>
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoleList, reqRloeDel, reqRoleOne } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      data: [],
    };
  },
  methods: {
    init() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.list;
        }
      });
    },
    del(id) {
      reqRloeDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.init();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
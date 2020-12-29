<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="roleid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
          <!-- <el-button type="danger" @click="del(scope.row.uid)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqManageDel } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["list"],
  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        }
      });
    },
  },
  mounted() {},
};
</script>

<style>
</style>
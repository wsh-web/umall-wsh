<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%"
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "@/utils/alert";
export default {
  props: ["list"],
  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>

<style scoped>
.myImg {
  width: 100px;
  height: 100px;
}
</style>
<template>
  <div>
    <template>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="菜单编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
            <el-i :class="scope.row.icon"></el-i>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址"> </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <del-btn @confirm="del(scope.row.id)"></del-btn>
            <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { reqMenuList, reqMenuDel, reqMenuEdit } from "@/utils/http";
import { successAlert, delAlert } from "@/utils/alert";

export default {
  props: ["list", "info"],
  methods: {
    del(id) {
      reqMenuDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.info.isadd = false;
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
</style>
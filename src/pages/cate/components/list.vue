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
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img != 'null'"
            class="myImg"
            :src="$pre + scope.row.img"
            alt=""
          />
        </template>
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqcateList, reqcateDel } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["list"],
  methods: {
    del(id) {
      reqcateDel(id).then((res) => {
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

<style scoped>
.myImg {
  width: 100px;
  height: 100px;
}
</style>
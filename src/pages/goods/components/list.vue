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
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
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

      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
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

      <el-table-column prop="address" label="操作" >
        <template slot-scope="scope" width="200">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import {reqgoodsDel} from "@/utils/http"
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "@/utils/alert";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
      changePage: "goods/changePage",
    }),
    del(id) {
      reqgoodsDel({id:id}).then((res) => {
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
  mounted(){
    this.reqList()
    this.reqTotal()
  }
};
</script>

<style scoped>
.myImg {
  width: 100px;
  height: 100px;
}
</style>
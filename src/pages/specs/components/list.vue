<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column  label="规格属性"> 
        <template slot-scope="scope">
           <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
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
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" 
    :total="total"
    :page-size="size"
    @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import { reqSpecsDel } from "@/utils/http";
import { successAlert } from "@/utils/alert";

export default {
  computed:{
    ...mapGetters({
      list:'specs/list',
      total:'specs/total',
      size:"specs/size"
    })
  },
  methods: {
    ...mapActions({
      reqList:'specs/reqList',
      reqTotal:'specs/reqTotal',
      changePage:'specs/changePage'
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqSpecsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqList()
          this.reqTotal()
        }
      });
    },
  },
  mounted(){
    this.reqTotal()
    this.reqList()
    
  }
};
</script>

<style>
</style>
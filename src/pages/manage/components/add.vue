<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="info.ishow"
      :closed="cancel"
    >
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              :label="item.rolename"
              :value="item.id"
              v-for="item in roleList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <template>
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleList,
  reqManageAdd,
  reqManageGetOne,
  reqManageEdit,
} from "@/utils/http";
import { successAlert,erroralert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      roleList: [],
    };
  },
  methods: {
    init() {
      reqRoleList().then((res) => {
        this.roleList = res.data.list;
      });
    },
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.ishow = false;
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    checkProps(){
      return new Promise(resolve=>{
        if(this.form.roleid==""){
          erroralert("请选择所属角色")
          return
        }
        if(this.form.username==""){
          erroralert("用户名不能为空")
          return
        }
       resolve()
      })
    },
    add() {
      this.checkProps().then(()=>{
         if(this.form.password==""){
          erroralert("用户密码不能为空")
          return
        }
        reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
      })
    },
    getOne(uid) {
      reqManageGetOne(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        }
      });
    },
    update() {
      this.checkProps().then(()=>{
        reqManageEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
      })
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
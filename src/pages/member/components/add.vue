<template>
  <div class="wrap">
    <el-dialog title="会员修改" :visible.sync="info.ishow" @closed="cancel">
      <el-form :model="user">
        {{ user }}

        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <template>
            <el-switch
              v-model="user.status"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </template>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import{
  reqMemberGetOne,
  reqMemberEdit
} from "@/utils/http";
import { successAlert,erroralert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      }
    };
  },
  methods: {
    cancel() {
      this.empty()
      this.info.ishow = false;
    },
    empty() {
      this.user ={
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      }
    },
    getOne(uid) {
      reqMemberGetOne(uid).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = uid
          this.user.password=""
        }
      });
    },
    checkProps(){
      return new Promise(resolve=>{
        if(this.user.phone==""){
          erroralert("手机号不能为空")
          return
        }
        if(this.user.nickname==""){
          erroralert("昵称不能为空")
          return
        }
        resolve()
      })
    },
    edit() {
      this.checkProps().then(()=>{
        reqMemberEdit(this.user).then((res) => {
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
};
</script>

<style >

</style>
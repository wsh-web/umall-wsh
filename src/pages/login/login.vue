<template>
  <div class="wrap">
    <div class="con">
      <h3 class="center">登  录</h3>
      <el-form
        :model="user"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="账号" prop="username" class="item">
          <el-input
            placeholder="请输入内容"
            v-model="user.username"
            clearable
            class="ipt"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item">
             <el-input
          placeholder="请输入密码"
          v-model="user.password"
          clearable
          show-password
          class="ipt"
        ></el-input>
        </el-form-item>
      </el-form>
        <div class="center center2">         
            <el-button type="primary" @click="login">登  录</el-button>
        </div>
    </div>
    
  </div>
</template>

<script>
import { reqLogin } from "@/utils/http";
import { successAlert}  from "@/utils/alert"
import {mapGetters,mapActions} from "vuex"
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ]
      }
    };
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list)
          this.$router.push("/")
        }
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  background: #fff;
  width: 600px;
  height: 300px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 200px auto;
  border-radius: 15px;
}
.item{
  margin-top:40px;
}
.ipt{
  width:80%
}
.center {
  width:200px;
  text-align: center;
  margin: 20px auto;
  font-size: 20px;
}
.center2{
  margin-bottom:40px;
}
.center button{
  width:200px;
  
}

</style>
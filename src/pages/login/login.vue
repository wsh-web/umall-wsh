<template>
  <div class="wrap">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="ipt">
        <el-input placeholder="请输入内容" v-model="user.name" clearable></el-input>
      </div>
      <div class="ipt">
        <el-input
          placeholder="请输入密码"
          v-model="user.password"
          clearable
          show-password
        ></el-input>
        <div class="center"><el-button type="primary" @click='login'>登录</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqLogin} from '@/utils/http'
export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods:{
    login(){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553544,#433A52,#303D60);
}
.con{
  background: #fff;
  width: 500px;
  position: fixed;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  margin: 200px auto;
  border-radius: 15px;
}
.ipt{
    margin: 30px;

}
.center{
  text-align: center;
  margin-top: 40px ;
  font-size: 20px;
}
.center button{
  width: 100%;
}

</style>
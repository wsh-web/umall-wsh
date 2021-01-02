<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-col :span="12">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#20222a"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 单纯是菜单 -->
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <!-- 有目录，有菜单 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <span class="out" @click="layout">退出登录</span><span>{{userInfo.username}}</span>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    layout(){
      this.changeUser({})
      this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.el-col {
  width: 200px;
}
.header{
  height: 60px;
}
.header span{
  float:right;
  margin-right: 20px;
  padding: 10px;
  border-radius:15px;
  margin:6px

}
.out{
  background: red;
  color: #fff;
  
}
</style>
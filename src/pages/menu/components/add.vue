<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.ishow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input
            v-model="user.title"
            autocomplete="off"
            class="menu"
          ></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="user.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0" name="目录"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
              name="子菜单"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="user.type == 1"
        >
          <el-select v-model="user.icon">
            <el-option
              v-for="item in icon"
              :key="item"
              :value="item"
              name="菜单图标"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
              name="菜单路径"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "@/router";
import { reqMenuAdd, reqMenuGetOne, reqMenuEdit } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        status: 1,
        type: 1,
        url: "",
      },
      icon: [
        "el-icon-setting",
        "el-icon-goods",
        "el-icon-camera",
        "el-icon-s-order",
        "el-icon-s-custom",
        "el-icon-location-information",
      ],
      indexRoutes,
    };
  },
  methods: {
    cancel() {
      this.info.ishow = false;
      if (!this.info.isadd) {
        this.empty();
      }
    },
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        status: 1,
        type: 1,
        url: "",
      };
    },
    add() {
      reqMenuAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqMenuGetOne(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    update() {
      reqMenuEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.ishow = false;
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style scoped>
.menu {
  width: 80%;
}
</style>>

<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="info.ishow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        {{ user }}
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="Menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd, reqMenuList, reqRoleOne, reqRoleEdit } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: [],
        status: 1,
      },
      Menulist: [],
    };
  },
  methods: {
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.ishow = false;
    },
    empty() {
      this.user = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqRoleOne(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    edit() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.user).then((res) => {
        if (res.data.code == 200) {
            successAlert(res.data.msg);
          this.cancel();
        
          this.empty();
          
          this.$emit("init");
          // this.info.isAdd = true
        }
      });
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.Menulist = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>
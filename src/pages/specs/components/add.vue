<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加规格' : '修改规格'"
      :visible.sync="info.ishow"
      :closed="cancel"
    >
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="specs">
            <el-input
              autocomplete="off"
              class="specsInput"
              v-model="item.value"
            ></el-input>
            <el-button
              type="primary"
              class="specsBtn"
              v-if="index === 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" class="specsBtn" v-else @click="del(index)"
              >删除</el-button
            >
          </div>
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
import { reqSpecsAdd, reqSpecsGetOne, reqSpecsEdit } from "@/utils/http";
import { successAlert, erroralert } from "@/utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
    }),
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    del(index) {
      this.attrsArr.splice(index, 1);
    },

    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.ishow = false;
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    checkProps() {
      return new Promise((resolve) => {
        if (this.form.specsname == "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.attrsArr.some((item) => item.value == "")) {
          erroralert("规格属性不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkProps().then(() => {
        this.form.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqSpecsAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.empty();
            successAlert(res.data.msg);
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    getOne(id) {
      reqSpecsGetOne(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.form.attrs = JSON.parse(this.form.attrs);
          this.attrsArr = this.form.attrs.map((item) => {
            return { value: item };
          });
        }
      });
    },
    update() {
      this.checkProps().then(() => {
        this.form.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqSpecsEdit(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqTotal();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.specs {
  display: flex;
}
.specsBtn {
  width: auto;
}
.specsInput {
  flex: 1;
}
</style>
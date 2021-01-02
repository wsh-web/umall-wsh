<template>
  <div class="wrap">
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品修改'"
      :visible.sync="info.ishow"
      @closed="cancel"
    >
      <el-form :model="user">
       
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">

          <el-date-picker
            v-model="value"
            type="datetimerange"
            prefix-icon="el-icon-time"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '00:00:00']"
            @change="changeTime"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择分类--" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid" @change="changeSceondCateId">
            <el-option label="--请选择分类--" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择商品--" value="" disabled></el-option>
            <el-option
              v-for="item in showgoods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  reqcateList,
  reqgoodsAdd,
  reqgoodslist,
  reqSkillAdd,
  reqSkillGetOne,
  reqSkillEdit
  
} from "../../../utils/http";
import { successAlert, erroralert } from "@/utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      secondCateList: [],
      showgoods: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.ishow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value = [];
      this.secondCateList = [];
      this.showgoods = [];
    },
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSceondCateId() {
      this.user.goodsid = "";
      this.getShowgoods();
    },
    getShowgoods() {
      reqgoodslist().then((res) => {
        if (res.data.code == 200) {
          this.showgoods = res.data.list.filter((item) => {
            return item.second_cateid == this.user.second_cateid;
          });
        }
      });
    },
    changeTime() {
      this.user.begintime = this.value[0];
      this.user.endtime = this.value[1];
      console.log(this.user.begintime, this.user.endtime);
    },

    checkProps() {
      return new Promise((resolve, resject) => {
        if (this.user.title === "") {
          erroralert("商品名称不能为空");
          return;
        }

        if (this.value.length == 0) {
          erroralert("请填写活动期限");
          return;
        }
        if (this.user.first_cateid == "") {
          erroralert("请填写一级分类");
          return;
        }

        if (this.user.second_cateid === "") {
          erroralert("请填写二级分类");
          return;
        }

        if (this.user.goodsid === "") {
          erroralert("请选择商品");
          return;
        }

        resolve();
      });
    },
    add() {
      this.checkProps().then(() => {
        reqSkillAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.$emit("init")
          }
        });
      });
    },
    getOne(id) {
      reqSkillGetOne(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.getSecondList();
          this.getShowgoods();
          this.user.id = id;
          // let arr = []
          this.value.splice(0,2,+res.data.list.begintime,+res.data.list.endtime)
          // console.log(arr);
          // this.value = JSON.stringify(arr)
          ;
        }
      });
    },
    edit() {
      if(this.user.title==""){
        erroralert("商品名称不能为空")
        return
      }
      this.checkProps().then(() => {
          this.changeTime()
          reqSkillEdit(this.user).then(res=>{
             if(res.data.code==200){
              successAlert(res.data.msg)
              this.cancel()
              this.empty()
              this.$emit("init")
            }
          })
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList({ istree: true });
    }
    this.reqSpecsList(true);
    this.reqGoodsList({ page: 1, size: 5 });
  },
};
</script>

<style scoped lang="stylus">
.avatar-uploader>>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div class="wrap">
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品修改'"
      :visible.sync="info.ishow"
      @closed="cancel"
    >
      <el-form :model="user">
        {{ user }}
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" id="myImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="user.specsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="user.specsattr">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <template>
            <el-radio v-model="user.ishot" label="1">是</el-radio>
            <el-radio v-model="user.ishot" label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <template>
            <el-radio v-model="user.isnew" label="1">是</el-radio>
            <el-radio v-model="user.isnew" label="2">否</el-radio>
          </template>
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
  reqcateAdd,
  reqcateList,
  reqcateGetOne,
  reqcateEdit,
} from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:null,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      imageUrl: "",
      cateList: [],
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
      this.imageUrl = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    changeImg(e) {
      console.log(e);
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    add() {
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqcateGetOne(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imageUrl = this.$pre + this.user.img;
        }
      });
    },
    edit() {
      reqcateEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    reqcateList().then((res) => {
      if (res.data.code == 200) {
        this.cateList = res.data.list;
      }
    });
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
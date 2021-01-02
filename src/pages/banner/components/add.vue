<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '修改轮播图'"
      :visible.sync="info.ishow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
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
import { reqBannerAdd, reqBannerGetOne, reqBannerEdit } from "@/utils/http";
import { successAlert ,erroralert} from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
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
        title: "",
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
    checkProps(){
      return new Promise(resolve=>{
        if(this.user.title==""){
          erroralert("标题不能为空")
          return
        }
        if(!this.user.img){
          erroralert("请上传图片")
          return
        }
        resolve()
      })
    },
    add() {
      this.checkProps().then(()=>{
        reqBannerAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
      })  
    },
    getOne(id) {
      reqBannerGetOne(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imageUrl = this.$pre + this.user.img;
        }
      });
    },
    edit() {
      this.checkProps().then(()=>{
          reqBannerEdit(this.user).then((res) => {
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

<style scoped lang="stylus">
.avatar-uploader >>> .el-upload {
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
<template>
  <div>
      <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>

<script>
export default {
    methods:{
      del(){
        this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          this.$emit('confirm')
        }).catch(() => {

          }); 
    }
    }
}
</script>

<style>

</style>
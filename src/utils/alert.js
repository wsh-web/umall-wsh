
import Vue from "vue"
let vm = new Vue()

export let successAlert = (msg) => {

    vm.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
}

export let failAlert = (msg) => {
    vm.$message({
        showClose: true,
        message: msg,
        type: 'warning'
    })
}


export let delAlert =()=>{
    vm.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
}
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from  "../store"
import { erroralert } from '@/utils/alert'
import router from "@/router"

Vue.prototype.$pre = "http://localhost:3000"
let baseUrl = "/api"


// Vue.prototype.$pre=""
// let baseUrl=""



axios.interceptors.request.use(config=>{
    if(config.url!=baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})



axios.interceptors.response.use(res => {
    console.log("这是响应拦截的数据" + res.config.url);
    console.log(res);
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    if (!res.data.list) {
        res.data.list = []
    }
    if(res.data.msg==="登录已过期或访问权限受限"){
        
        store.dispatch("changeUser",{})
        
        router.push("/login")
    }

    return res
})

//POST传参有文件调用此函数
function dataToFormData (obj){
    let data = new FormData()
    for(let k in obj){
        data.append(k,obj[k])
    }
    return data
} 

//=======================登录管理===================

export let  reqLogin = (obj)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ======================菜单管理===================


// 添加菜单
export let reqMenuAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: 'post',
        data: qs.stringify(obj)
    })
}



// 获取列表数据
export let reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}


//删除

export let reqMenuDel = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}



// 获取一条信息

export let reqMenuGetOne = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        params: {
            id: id
        }
    })
}

//编辑

export let reqMenuEdit = (obj) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(obj)
    })
}
//===================================================


//=================角色管理=======================

//角色添加
export let reqRoleAdd = (obj) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: "post",
        data: qs.stringify(obj)
    })
}

//获取角色列表

export let reqRoleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
    })
}

//一条角色信息

export let reqRoleOne = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}



//角色修改
export let reqRoleEdit = (obs) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(obs)
    })
}

//角色删除

export let reqRloeDel = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//======================================================


//===================管理员==================

// 添加
export let reqManageAdd = (data) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: "post",
        data: qs.stringify(data)
    })
}

//分页   管理员总数

export let reqManageCount = () => {
    return axios({
        url: baseUrl + '/api/usercount',
    })
}

//管理员列表

export let reqManageList = (obj) => {
    return axios({
        url: baseUrl + '/api/userlist',
        params: obj
    })
}

//管理员 一条信息

export let reqManageGetOne = (uid) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        params: {
            uid: uid
        }
    })
}

//管理员修改 编辑

export let reqManageEdit = (obj) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(obj)
    })
}

//管理员删除

export let reqManageDel = (obj) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}

//管理员登录

export let reqManageLogin = (user) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(user)
    })
}




//===============管理员end========================

//================商品分类start===============

// 商品添加

export let reqcateAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(obj)
    })
}

//商品分类列表

export let reqcateList = (obj)=>{
    return axios({
        url:baseUrl +'/api/catelist',
        params:obj
    })
}

// 获取一条商品信息

export let reqcateGetOne =(id)=>{
    return axios({
        url:baseUrl + "/api/cateinfo",
        params:{
            id:id
        }
    })
}

//修改商品信息

export let reqcateEdit = (obj)=>{
    return axios({
        url:baseUrl + '/api/cateedit',
        method:'post',
        data:dataToFormData(obj)
    })
}

//删除商品信息

export let reqcateDel = (id)=>{
    return axios({
        url:baseUrl +'/api/catedelete',
        method:'post',
        data:{
            id:id
        }
    })
}

//======================商品分类end===============


//====================轮播图start=====================

//轮播图添加

export let reqBannerAdd = (obj)=>{
   
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:dataToFormData(obj)
    })
}

//轮播图列表

export let reqBannerList = ()=>{
    return axios({
        url:baseUrl + '/api/bannerlist'
    })
}

//获取一条轮播图信息

export let reqBannerGetOne = (id)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        params:{
            id:id 
        }
    })
}

//轮播图修改

export let reqBannerEdit = (obj)=>{
    return axios({
        url:baseUrl+'/api/banneredit',
        method:"post",
        data:dataToFormData(obj)
    })
}

//轮播图删除

export let reqBannerDelete = (id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:{
            id:id
        }
    })
} 

//=================轮播图管理end=================

//==================会员管理=====================

//会员列表

export let reqMemberList = ()=>{
    return axios({
        url:baseUrl+"/api/memberlist"
    })
}

//获取一条会员信息

export let reqMemberGetOne = (uid)=>{
    return axios({
        url:baseUrl + '/api/memberinfo',
        params:{
            uid:uid
        }
    })
}


//会员修改

export let reqMemberEdit = (obj)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data:qs.stringify(obj)
    })
}

//===================会员管理end======================

//====================商品规格start=======================


//商品规格添加

export let reqSpecsAdd = (obj)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(obj)
    })
}

//规格总数

export let reqSpecsCount = ()=>{
    return axios({
        url:baseUrl+'/api/specscount'
    })
}
//规格列表  obj={size:1,page:2}

export let reqSpecsList = (obj)=>{
    return axios({
        url:baseUrl +'/api/specslist',
        params:obj
    })
}

//商品规格一条 

export let reqSpecsGetOne = (id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        params:{
            id:id
        }
    })
}

//商品规格修改

export let reqSpecsEdit = (obj)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(obj)
    })
}

//商品规格删除

export let reqSpecsDel = (id)=>{
    return axios({
        url:baseUrl +'/api/specsdelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}

//==============商品规格管理end==============

/************商品管理 start**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

/************商品管理 end**************************/


//==================限时秒杀管理start==============


//添加
export let reqSkillAdd = (obj)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(obj)
    })
}

//列表
export let reqSkillList = ()=>{
    return axios({
        url:baseUrl+"/api/secklist",
    })
}

//获取一条


export let reqSkillGetOne = (id)=>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        params:{id:id}
    })
}

//修改
export let reqSkillEdit = (obj)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

//删除
export let reqSkillDel = (id)=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}



import {reqcateList} from "@/utils/http"


let state = {
    list:[]
}

let mutations={
    changeList(state,arr){
        return state.list = arr
    }
}

let getters={
    list(state){
        return state.list
    }
}

let actions={
    reqList(context,user){
        reqcateList(user).then(res=>{
            if(res.data.code==200){
                context.commit('changeList',res.data.list)
            }
        })  
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}
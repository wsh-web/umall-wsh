import { reqSpecsList } from "@/utils/http"
import { reqSpecsCount } from "../../utils/http"

let state = {
    list: [],

    total: 50,

    page: 1,

    size: 2
}

let mutations = {
    changeList(state, arr) {
        return state.list = arr
    },

    changeTotal(state, count) {
        return state.total = count
    },

    changePage(state, num) {
        return state.page = num
    }
}

let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }


}

let actions = {
    reqList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        reqSpecsList(params).then(res => {
            if (res.data.code == 200) {
                if (res.data.list.length == 0 && context.state.page > 1) {
                    context.commit('changePage', context.state.page - 1)
                    context.dispatch("reqList")
                    return
                }
                let list = res.data.list
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                context.commit("changeList", list)
            }
        })
    },

    reqTotal(context) {
        reqSpecsCount().then(res => {
            if (res.data.code == 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },

    changePage(context, num) {
        context.commit('changePage', num)
        context.dispatch('reqList')
    }


}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
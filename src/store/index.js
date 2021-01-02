import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state,mutations,getters} from './mutations'
import {actions} from './actions'
import specs from   "./modules/specs"
import goods from "./modules/goods"
import cate from './modules/cate'
import seckill from  "./modules/seckill"
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        specs,
        goods,
        cate,
        seckill
    }
})
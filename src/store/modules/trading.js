import { apiTradingList, apiTranostate, apiSortLists, apiSortChangeorder, apiChangestate, apiChangeinfo, apiTradingAdd,apiLooklists,apiLookMenu} from '@/api/trading'

const state = {
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

const actions = {
    actionTradingList({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiTradingList(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionTranostate({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiTranostate(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionSortLists({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiSortLists(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionSortChangeorder({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiSortChangeorder(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionChangestate({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiChangestate(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionChangeinfo({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiChangeinfo(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionTradingAdd({ commit }, data) {
        return apiTradingAdd(data)
    },
    actionLookMenu({ commit }, data) {
        return apiLookMenu(data)
    },
    actionLooklists({ commit }, data) {
        return apiLooklists(data)
    },
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

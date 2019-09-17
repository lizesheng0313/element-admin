import { apiTradingList, apiTranostate,apiSortLists,apiSortChangeorder} from '@/api/trading'

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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

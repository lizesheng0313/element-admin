import { apiTradingList } from '@/api/trading'

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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

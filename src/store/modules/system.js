import { getRoleList, apiRoleEdit,apiRuleAdd,apiRuleRead,apiAdminlog} from '@/api/role'

const state = {
}
const mutations = {
    // SET_TOKEN: (state, token) => {
    //     state.token = token
    // }
}

const actions = {
    getRoleList({ commit }) {
        return new Promise((resolve, reject) => {
            getRoleList().then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionRoleEdit({commit},data) {
        return new Promise((resolve, reject) => {
            apiRoleEdit(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionRuleAdd({commit},data) {
        return new Promise((resolve, reject) => {
            apiRuleAdd(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionRuleRead({commit},data) {
        return new Promise((resolve, reject) => {
            apiRuleRead(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminlog({commit},data) {
        return new Promise((resolve, reject) => {
            apiAdminlog(data).then(response => {
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

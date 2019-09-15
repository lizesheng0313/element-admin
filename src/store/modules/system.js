import { getRoleList, apiRoleEdit, apiRuleAdd, apiRuleRead, apiAdminlog, apiAdminlist, apiAdminedit, apiAdminrolelist, apiAdminadd,apiSettingRead,apiSettingEdit } from '@/api/role'

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
    actionRoleEdit({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiRoleEdit(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionRuleAdd({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiRuleAdd(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionRuleRead({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiRuleRead(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminlog({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiAdminlog(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminlis({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiAdminlist(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminedit({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiAdminedit(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminrolelist({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiAdminrolelist(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionAdminadd({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiAdminadd(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionSettingRead({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiSettingRead(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    actionSettingEdit({ commit }, data) {
        return new Promise((resolve, reject) => {
            apiSettingEdit(data).then(response => {
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

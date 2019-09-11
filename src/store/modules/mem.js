import { getMemList, postMemDetails } from '@/api/user'

const state = {
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  getMemList({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getMemList(userInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  postMemDetails({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      postMemDetails(userInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

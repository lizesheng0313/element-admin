import request from '@/utils/request'

export function apiTradingList(data) {
    return request({
        url: '/index/trading/lists',
        method: 'post',
        data
    })
}

export function apiTranostate(data) {
    return request({
        url: '/index/trading/tranostate',
        method: 'post',
        data
    })
}

export function apiSortLists(data) {
    return request({
        url: '/index/czc/lists',
        method: 'post',
        data
    })
}
export function apiSortChangeorder(data) {
    return request({
        url: '/index/czc/changeorder',
        method: 'post',
        data
    })
}
/**
 * Created by Liu on 2020/6/10.
 */


import { observe } from './observer/index.js'

export function initState (vm) {
    const options = vm.$options
    options.props && initProps(vm)
    options.methods && initMethod(vm)
    options.data && initData(vm)
}

function initProps (vm) {

}
function initMethod (vm) {

}
function initData (vm) {
    // 响应式原理从此处开始
    let data = vm.$options.data // 用户传入的数据
    data = vm._data = typeof data === 'function'? data.call(vm): data // vm._data 是数据观测后存储的真实位置。 在使用vm[key]取值时，最终会到vm._data里面取值
    // 数据观测
    observe(data)
}
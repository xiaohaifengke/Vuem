/**
 * Created by Liu on 2020/6/10.
 */
import {initState} from './state'
import {compileToFunctions} from './compiler/index.js'

export function initMixin (Vuem) {
    Vuem.prototype._init = function (options) {
        const vm = this
        vm.$options = options // 暂不处理参数
        initState(vm) // 初始化状态
        // 模板渲染
        if (vm.$options.el) { // 判断用户是否传入了el属性
            vm.$mount(vm.$options.el)
        }
    }

    Vuem.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)

        if (!options.render) {
            let template = options.template
            if (!template && el) {
                template = el.outerHTML
            }
            const render = compileToFunctions(template)
            options.render = render
        }
    }
}


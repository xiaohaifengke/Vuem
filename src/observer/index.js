/**
 * Created by Liu on 2020/6/10.
 */

import { arrayMethods } from './array'
import { isObject } from '../utils'

class Observer {
    constructor (data) {
        Object.defineProperty(data, '__ob__', {
            enumerable: false,
            configurable: false,
            value: this
        })
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods
            this.observeArray(data)
        } else {
            this.walk(data)
        }
    }

    observeArray (arr) {
        for (let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }

    walk (val) {
        const keys = Object.keys(val)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            defineReactive(val, key, val[key])
        }
    }
}

function defineReactive (data, key, value) {
    observe(value) // 如果传入的值还是一个对象的话 就做递归循环检测
    Object.defineProperty(data, key, {
        get () {
            return value
        },
        set (val) {
            if (val === value) return
            observe(val)
            value = val // 监控当前设置的值，有可能用户给了一个新值
        }
    })
}

export function observe (data) {
    if (!isObject(data)) return // 只监控对象

    if (data.__ob__ instanceof Observer) return // 防止重复观测

    // 对数据进行defineProperty
    return new Observer(data)
}


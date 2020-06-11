/**
 * Created by Liu on 2020/6/10.
 */
const arrayPrototype = Array.prototype

const arrayMethods = Object.create(arrayPrototype)
const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = arrayPrototype[method].apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        inserted && ob.observeArray(inserted)
        return result
    }
})

export { arrayMethods }
/**
 * Created by Liu on 2020/6/10.
 */
import {initMixin} from './init'
function Vuem (options) {
    if (!(this instanceof Vuem)) {
        console.warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options) // 初始化操作
}

initMixin(Vuem) // 各种初始化 配置、生命周期、data等
export default Vuem
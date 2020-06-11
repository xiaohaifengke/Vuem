(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vuem = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Created by Liu on 2020/6/10.
   */
  var arrayPrototype = Array.prototype;
  var arrayMethods = Object.create(arrayPrototype);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = arrayPrototype[method].apply(this, args);
      var ob = this.__ob__;
      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      }

      inserted && ob.observeArray(inserted);
      return result;
    };
  });

  /**
   * Created by Liu on 2020/6/11.
   */
  function isObject(value) {
    return value !== null && _typeof(value) === 'object';
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      Object.defineProperty(data, '__ob__', {
        enumerable: false,
        configurable: false,
        value: this
      });

      if (Array.isArray(data)) {
        data.__proto__ = arrayMethods;
        this.observeArray(data);
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(arr) {
        for (var i = 0; i < arr.length; i++) {
          observe(arr[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(val) {
        var keys = Object.keys(val);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          defineReactive(val, key, val[key]);
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 如果传入的值还是一个对象的话 就做递归循环检测

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(val) {
        if (val === value) return;
        observe(val);
        value = val; // 监控当前设置的值，有可能用户给了一个新值
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) return; // 只监控对象

    if (data.__ob__ instanceof Observer) return; // 防止重复观测
    // 对数据进行defineProperty

    return new Observer(data);
  }

  /**
   * Created by Liu on 2020/6/10.
   */
  function initState(vm) {
    var options = vm.$options;
    options.props && initProps();
    options.methods && initMethod();
    options.data && initData(vm);
  }

  function initProps(vm) {}

  function initMethod(vm) {}

  function initData(vm) {
    // 响应式原理从此处开始
    var data = vm.$options.data; // 用户传入的数据

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // vm._data 是数据观测后存储的真实位置。 在使用vm[key]取值时，最终会到vm._data里面取值
    // 数据观测

    observe(data);
  }

  /**
   * Created by Liu on 2020/6/11.
   */
  function compileToFunctions(template) {
    var ast = parseHTML(template); // 模板编译原理
    // 1.先把template转化成ast语法树 （1）  parser 解析  (正则)
    // 2.标记静态树  （2） 树得遍历标记 markup
    // 3.通过ast产生的语法树 生成 代码 =》 render函数  codegen
  }

  /**
   * Created by Liu on 2020/6/10.
   */
  function initMixin(Vuem) {
    Vuem.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 暂不处理参数

      initState(vm); // 初始化状态
      // 模板渲染

      if (vm.$options.el) {
        // 判断用户是否传入了el属性
        vm.$mount(vm.$options.el);
      }
    };

    Vuem.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        var render = compileToFunctions(template);
        options.render = render;
      }
    };
  }

  /**
   * Created by Liu on 2020/6/10.
   */

  function Vuem(options) {
    if (!(this instanceof Vuem)) {
      console.warn('Vue is a constructor and should be called with the `new` keyword');
    }

    this._init(options); // 初始化操作

  }

  initMixin(Vuem); // 各种初始化 配置、生命周期、data等

  return Vuem;

})));
//# sourceMappingURL=vuem.js.map

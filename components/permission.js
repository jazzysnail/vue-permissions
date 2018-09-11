/**
 * render 函数
 * @param  {[type]} component [description]
 * @return {[type]}           [description]
 */
const render = function(component) {
  return function(h) {
    const mixinProps = {};
    if (this.ctrlType == 'disable') {mixinProps.disabled = !this.show}
    const props = Object.assign({}, this.$attrs, mixinProps);
    if (this.show || this.ctrlType == 'disable') {
      return h(
        component || this.component,
        { props },
        this.$slots.default
      )
    } else {
      return null
    }
  }
}
/**
 * 组件构造函数
 * @param  {Boolean} highOrder     是否构造为高阶
 * @param  {String || VueComponent}  component     非高阶时使用的渲染组件
 * @return {Object}                Vue 组件配置
 */
export const permissionFactory = function(highOrder = true, component) {
  let org = {
    inheritAttrs: false,
    props: {
      component: {
        required: true
      },
      ctrlType: {
        type: String,
        default: 'disable'
      },
      pass: {
        type: String,
        default: ''
      },
      nonPass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      getPermission(name) {
        return this.$root.$options.permissions.getPermission(name);
      },
      computeShow() {
        if (this.nonPass) {
          return !this.getPermission(this.nonPass);
        } else {
          return this.getPermission(this.pass);
        }
      },
      update() {
        this.show = this.computeShow();
      }
    },
    created() {
      const vm =this;
      this.update();
      this.$root.$options.permissions.$on('tokenSetUpdated', function() {
        vm.update();
      });
    },
    render: render()
  }
  // 如果不构造为高阶则删除 props.component 改为参数 组件
  if (!highOrder) {
    delete org.props.component;
    org.render = render(component);
  }
  return org
}

/**
 * 高阶组件
 * 代理子组件得 disabled 属性，并混入其余的 props
 */
export default function(Vue) {
  Vue.component('permission', permissionFactory());
}

/**
 * render 函数
 * @param  {[type]} component [description]
 * @return {[type]}           [description]
 */
const render = function(component) {
  return function(h) {
    const vm = this;
    const mixinProps = {};
    if (vm.ctrlType == 'disable') {
      mixinProps.disabled = !vm.show;
    }
    const props = Object.assign({}, vm.$attrs, mixinProps);
    if (vm.show || vm.ctrlType == 'disable') {
      return h(
        component || vm.component,
        {
          props,
          on: {
            click(e) {
              vm.$emit('click', e);
            }
          }
        },
        this.$slots.default
      );
    } else {
      return null;
    }
  };
};
/**
 * 组件构造函数
 * @param  {Boolean} highOrder     是否构造为高阶
 * @param  {String || VueComponent}  component     非高阶时使用的渲染组件
 * @return {Object}                Vue 组件配置
 */
export const permissionFactory = function(
    highOrder = true,
    component,
    options = {
      ctrlType: 'disable'
    }
  ) {
  let org = {
    inheritAttrs: false,
    props: {
      component: {
        required: true
      },
      ctrlType: {
        type: String,
        default: options.ctrlType
      },
      pass: {
        type: String,
        default: ''
      },
      nonPass: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        permission: false
      };
    },
    methods: {
      updatePermission() {
        const permissions = this.$root.$options.permissions;
        if (this.nonPass) {
          this.permission = !permissions.getPermission(this.nonPass);
        } else {
          this.permission = permissions.getPermission(this.pass);
        }
      }
    },
    computed: {
      show() {
        return this.permission && !this.disabled;
      }
    },
    created() {
      const vm =this;
      this.updatePermission();
      this.$root.$options.permissions.$on('tokenSetUpdated', function() {
        vm.updatePermission();
      });
    },
    render: render()
  };
  // 如果不构造为高阶则删除 props.component 改为参数 组件
  if (!highOrder) {
    delete org.props.component;
    org.render = render(component);
  }
  return org;
};

/**
 * 高阶组件
 * 代理子组件得 disabled 属性，并混入其余的 props
 */
export default function(Vue) {
  Vue.component('permission', permissionFactory());
}

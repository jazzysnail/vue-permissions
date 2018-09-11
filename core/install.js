import permissions from '../components/permissions.vue';
import permissionBundle from '../components/permission-bundle.vue';
import permission from '../components/permission';
import directive from './directive';

/**
 * 安装函数
 * @param  {[type]} Permissions [description]
 * @return {[type]}             [description]
 */
export default function (Permissions) {
  Permissions.prototype.install = Permissions.install = function (Vue) {
    const pms_this = this;

    // 注册权限指令
    directive(Vue);

    // 注册内置权限组件
    Vue.component('Permissions', permissions);
    Vue.component('PermissionBundle', permissionBundle);
    permission(Vue);

    // 注册自定义组件
    Object.keys(pms_this.components).forEach(name => {
      Vue.component(name, pms_this.components[name]);
    });

    // 注入实例方法
    Vue.prototype.$getPermission = function(name) {
      return this.$parent.$options.permissions.getPermission(name)
    }
  }
}
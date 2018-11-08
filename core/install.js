import permissions from '../components/permissions.vue';
import permissionScope from '../components/permission-scope.vue';
import permission from '../components/permission';
import directive from './directive';
import withRouter from './with-router';

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
    Vue.component('PermissionScope', permissionScope);
    permission(Vue);

    // 注册自定义组件
    Object.keys(pms_this.components).forEach(name => {
      Vue.component(name, pms_this.components[name]);
    });
    // 与路由协同
    withRouter(Vue);

    // 实例方法 获取权限
    Vue.prototype.$getPermissions = function(name) {
      return this.$root.$options.permissions.getPermission(name);
    };
    // 实例方法 订阅权限变更
    Vue.prototype.$addEventListener = function(event, callback) {
      return this.$root.$options.permissions.$on(event, callback);
    };
    // 实例方法 获取权限信息
    Vue.prototype.$getPermissionsInfo = function(name) {
      return this.$root.$options.permissions.permissions[name];
    };
  };
}

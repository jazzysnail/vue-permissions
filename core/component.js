import { permissionFactory } from '../components/permission.js';

export default function (Permissions) {
  /**
   * 组件构建函数
   * @type {Object}
   */
  Permissions.components = {};
  Permissions.component = function(name, component) {
    if (component instanceof Object || typeof component == 'string') {
      // Vue 组件或已经注册的全局组件名可以直接用
      this.components[name] = permissionFactory(false, component);
    } else {
      // 这人在逗我玩
    }
  }
}
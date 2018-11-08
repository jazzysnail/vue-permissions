import { permissionFactory } from '../components/permission.js';

export default function (Permissions) {
  Permissions.components = {};
  Permissions.component = function(name, component, opt) {
    if (component instanceof Object || typeof component == 'string') {
      this.components[name] = permissionFactory(false, component, opt);
    } else {
      // 这人在逗我玩
    }
  };
}

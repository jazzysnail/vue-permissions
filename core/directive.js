export default function (Vue) {
  Vue.directive('permission', {

    bind(el, binging, vnode) {
      // const { arg, value, expression, modifiers } = binging;




      // if (arg !== 'disable') {
      //   el.originalOpacity = el.style.opacity;
      //   el.style.opacity = 0;
      // }
      // console.log(vnode);
      // console.log(el);
      // vnode.child.disabled = true;
      // vnode.child.type = 'danger';
      // el.setAttribute('disabled', true);
    },

    update(el, binging, vnode) {
      const { value, modifiers } = binging;
      const { disable } = modifiers;
      // 这个地方调用混淆算法
      const permissions = vnode.context.$root.$options.permissions;
      const permission = permissions.getPermission(value);

      if (permission) {

        // return el;
      } else {
        if (disable) {
          // disabled 实现
        } else {
          // 移除 DOM
          el.remove();
        }
      }



      // if (!permission) {
        // if (arg == 'disable') {
        //   // console.log(el.originalOpacity)
        //   // 禁用但显示
        //   // el.style.opacity = + el.originalOpacity || "";
        //   // console.log(el.style.opacity)
        //   vnode.componentOptions.propsData.disabled = false;
        //   // el.setAttribute('disabled', false);
        // } else {
        //   // 移除 DOM
        //   // vnode.context.$options.parent.remove();
        // }
      // } else {


        // // 无权限
        // if (arg == 'disable') {
        //   // 禁用但显示
        //   // el.originalOpacity = el.style.opacity;
        //   // el.style.opacity = 0;
        //   vnode.componentOptions.propsData.disabled = true;
        //   // el.setAttribute('disabled', true);
        // } else {
        //   // 移除 DOM
        //   el.remove();
        // }
      // }
    }
  });
}
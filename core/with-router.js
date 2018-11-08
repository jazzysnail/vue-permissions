export default function (Vue) {
  Vue.mixin({
    beforeRouteEnter(to, from, next) {
      next(vm => {
        const checkPurview = window.setInterval(() => {
          const tokenset = vm.$root.$options.permissions.$tokenSet;
          if (tokenset !== undefined && tokenset.length !== 0) {
            const permission = vm.$getPermissions(to.meta.permission);
            if(!permission) {
              window.clearInterval(checkPurview)
              const withRouter = vm.$root.$options.permissions.$options.withRouter;
              if (withRouter instanceof Function) {
                withRouter(vm, to, from);
              }
            }
          }
        }, 100);
      });
    }
  });
}

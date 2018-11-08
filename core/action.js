export default function (Permissions) {
  /**
   * 更新权限码表
   * @param  {Array} 新的码表
   * @return {Void}
   */
  Permissions.prototype.updateTokenSet = function(newTokenSet) {
    if (this.$set instanceof Function) {
      this.$tokenSet = this.$set(newTokenSet);
    } else {
      this.$tokenSet = newTokenSet;
    }
    this.$emit('tokenSetUpdated', this.$tokenSet);
  };

  /**
   * 获取匹配的具名权限
   * @param  {String}  权限名
   * @return {Boolean} 是否具有权限
   */
  Permissions.prototype.getPermission = function(name) {
    name = this.confuse ? this.confuse(name) : name;
    if (this.$get instanceof Function) {
      const per = this.$get(name);
      return per;
    } else {
      const permissions = this.permissions.find(val => val.name == name);
      const pmsIndex = this.$tokenSet.findIndex(val => (val == (permissions ? permissions.token : '')));
      return pmsIndex != -1;
    }
  };
}
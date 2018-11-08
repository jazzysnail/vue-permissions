export default function (Permissions) {
  Permissions.prototype.eventCenter = {
    event: {},
    /**
     * 注册事件
     * @param  {String}   事件名
     * @param  {Function} 回调函数
     * @return {Void}
     */
    on(event, call) {
      if (this.eventCenter[event] && this.eventCenter[event].length > 0) {
        this.eventCenter[event].push(call);
      } else {
        this.eventCenter[event] = [call];
      }
    },
    /**
     * 触发事件
     * @param  {String}
     * @return {Void}
     */
    emit(event, ...arg) {
      if (this.eventCenter[event]) {
        this.eventCenter[event].forEach(fun => {
          if (fun instanceof Function) {
            fun(...arg);
          }
        });
      }
    }
  }
}

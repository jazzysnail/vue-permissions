'use strict';

import action from './core/action';
import component from './core/component';
import event from './core/event';
import install from './core/install';

const Permissions = function (option) {
  this.$options = option;
  this.$tokenSet = [];
  this.$on = this.eventCenter.on;
  this.$emit = this.eventCenter.emit;
  this.$get = option.get || null;
  this.$set = option.set || null;
  this.components = {};
  this.confuse = option.confuse;
  // 进行混淆计算
  if(option.confuse instanceof Function) {
    this.permissions = option.permissions.map(pms => {
      return Object.assign({}, pms, {
        name: option.confuse(pms.name)
      });
    });
  } else {
    this.permissions = option.permissions;
  }
};

install(Permissions);
action(Permissions);
event(Permissions);
component(Permissions);

export default Permissions;

const COMMANDER = require('commander');
const _ = require('lodash');

module.exports = class Core {

  constructor(...dependencies = []) {
    this.dependencies = _.reduce(dependencies, (acc, val) => {
      acc[val.moduleName()] = val;
    }, {});
  }

  get moduleList() {
    return Object.keys(this.dependencies);
  }

  get moduleName() {
    return this.module_name;
  }

}

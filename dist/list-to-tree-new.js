// const IronTree = require('@denq/iron-tree');
const IronTree = require('iron-tree');
const defaultOptions = {
  key_id: 'id' ,
  key_parent: 'parent' ,
  key_child: 'child',
  empty_children: false,
};

function sortBy(collection, propertyA, propertyB) {
  return collection.sort(function(a, b) {
    if (a[propertyB] < b[propertyB]) {
      if (a[propertyA] > b[propertyA]) {
        return 1;
      }
      return -1;
    } else {
      if (a[propertyA] < b[propertyA]) {
        return -1;
      }
      return 1;
    }
  });
};

module.exports = class LTT{

  constructor(list, options = {}) {
    options = Object.assign({}, defaultOptions, options);
    this.options = options;
    const { key_id, key_parent } = options;

    sortBy(list, key_parent, key_id);
    const tree = new IronTree({ [key_id]: 0 });
    list.forEach((item, index) => {
      tree.add((parentNode) => {
        return parentNode.get(key_id) === item[key_parent];
      }, item);
    });

    this.tree = tree;
  }

  GetTree() {
    const { key_child, empty_children } = this.options;
    return this.tree.toJson({
      key_children: key_child,
      empty_children: false,
    })[key_child];
  }

}

const ListMark = function(options = { listStyle: 'none', activeOrder: 0 }) {
  this.currentOrder = 0;
  this.listStyle = options.listStyle || 'none';
  this.activeOrder = options.activeOrder || 0;
};

ListMark.prototype.setActiveOrder = function(activeOrder) {
  this.activeOrder = activeOrder;
};

ListMark.prototype.initCurrentOrder = function() {
  this.currentOrder = 0;
};

ListMark.prototype.getNextMark = function() {
  let mark = '';
  switch (this.listStyle) {
    case 'number': {
      mark = `${this.currentOrder + 1}.`;
      break;
    }
    case 'star': {
      mark = '*';
    }
    case 'circle': {
      if (this.activeOrder === this.currentOrder) {
        mark = '●';
      } else {
        mark = '○';
      }
      break;
    }
    case 'square': {
      if (this.activeOrder === this.currentOrder) {
        mark = '■';
      } else {
        mark = '□';
      }
      break;
    }
  }
  this.currentOrder++;
  return mark;
};

module.exports = ListMark;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indent;

var _defined = require('defined');

var _defined2 = _interopRequireDefault(_defined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indent(node, depth) {
  var indentStr = '    '.repeat(depth);
  return function (ar) {
    return ar.forEach(function (key) {
      node.raws[key] = (0, _defined2.default)(node.raws[key], '').trim().concat('\n' + indentStr);
    });
  };
}
module.exports = exports['default'];
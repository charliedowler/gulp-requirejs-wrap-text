'use strict';
module.exports = function (namespace, filename, data) {
  return [
    'define([], function () {',
    data,
    '  return ' + namespace + '.' + filename + ';',
    '});',
    ''
  ].join('\n');
};
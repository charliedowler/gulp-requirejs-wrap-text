'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var Buffer = require('buffer').Buffer;
var path = require('path');
var wrap = require('./lib/wrap');

module.exports = function (opt) {
  function modifyFile(file) {
    if (file.isNull()) { return this.emit('data', file); } // pass along
    if (file.isStream()) return this.emit('error', new Error("gulp-requirejs-wrap-text: Streaming not supported"));

    var data;
    var str = file.contents.toString('utf8');

    try {
      var filename = file.path.split('/');
      filename = filename[filename.length - 1].split('.')[0];
      data = wrap(opt.namespace, filename, str);
    } catch (err) {
      return this.emit('error', new Error(err));
    }

    file.contents = new Buffer(data);
    this.emit('data', file);
  }

  return es.through(modifyFile);
};

var nodeunit = require('nodeunit');
var jsdom = require("jsdom");

var repo_nl = 'https://raw.github.com/ystskm/web-storages-js/';

var scripts = [];
scripts.push(repo_nl + "master/web-storages.js");

function setup(callback) {
  jsdom.env("<html><head></head><body></body></html>", {
    scripts: scripts
  }, function(errors, window) {
    errors && console.error(errors), callback(window);
  });
}

module.exports = nodeunit.testCase({
  'readme': function(t) {
    setup(function(window) {
      t.expect(24);
      ['localStorage', 'sessionStorage'].forEach(function(type, i) {
        var storage = window[type];
        var m = function(t) {
          return '[' + (i == 0 ? 'local': 'session') + '] ' + t;
        };

        t.deepEqual(storage.setItem('hoge', 'Hello,hoge!'), undefined);
        t.deepEqual(storage.setItem('fuga', 'Hello,fuga!'), undefined);
        t.equals(storage.getItem('hoge'), 'Hello,hoge!', m('get0'));
        t.equals(storage.getItem('fuga'), 'Hello,fuga!', m('get0'));
        t.equals(storage.key(0), 'hoge', m('key0'));
        t.equals(storage.length(), 2, m('len0'));

        t.deepEqual(storage.removeItem('hoge'), undefined, m('remove1'));
        t.deepEqual(storage.getItem('hoge'), null, m('get1'));
        t.equals(storage.length(), 1, m('len1'));

        t.deepEqual(storage.clear(), undefined, m('clear2'));
        t.deepEqual(storage.getItem('fuga'), null, m('get2'));
        t.equals(storage.length(), 0, m('len2'));

      });
      t.done();
    });
  }
});

var nodeunit = require('nodeunit');
require('../web-storages');

module.exports = nodeunit.testCase({
  'readme': function(t) {
    t.expect(24);
    [localStorage, sessionStorage].forEach(function(storage, i) {
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
  }
});

/***/
// foonyah-plugins [storage] storage.js
(function(has_win, has_mod) {

  has_win && storage(window);

  if(has_mod) {
    typeof global != 'undefined' && storage(global);
    storage(module.exports);
  }

  function storage(exports) {
    var k = null, document = exports.document || {};
    var is_window = exports.document === document;

    // Errors
    var E = {};
    E.type = function(type) {
      return "Failed to execute '" + type
        + "' on 'Storage': 1 argument required, but only 0 present.";
    };

    // localStorage emulator
    var LSProtos = {
      setItem: l_setItem,
      getItem: l_getItem,
      removeItem: l_removeItem,
      clear: l_clear,
      key: l_key,
      length: l_length
    };
    for(k in LSProtos)
      LS.prototype[k] = LSProtos[k];

    //sessionStorage emulator
    var SSProtos = {
      setItem: s_setItem,
      getItem: s_getItem,
      removeItem: s_removeItem,
      clear: s_clear,
      key: s_key,
      length: s_length
    };
    for(k in SSProtos)
      SS.prototype[k] = SSProtos[k];

    var storages = {
      localStorage: LS,
      sessionStorage: SS
    };

    if(!exports)
      return;

    if(is_window) {
      exports.keyCookie = keyCookie;
      exports.setCookie = setCookie;
      exports.getCookie = getCookie;
    }

    if(typeof exports.localStorage == 'undefined')
      exports.localStorage = new LS();

    if(typeof exports.sessionStorage == 'undefined') {
      var parent = exports.parent;
      try {
        // top frame or throws Access-Allow-Origin error.
        if(parent == null || parent.host != location.host)
          exports.sessionStorage = new SS();
      } catch(e) {
        exports.sessionStorage = new SS();
      }
      if(parent)
        try {
          while(parent.parent && parent.parent !== parent)
            parent = parent.parent;
          exports.sessionStorage = parent.sessionStorage;
        } catch(e) {
          exports.sessionStorage = parent.sessionStorage;
        }
    }

    /**
     * @constructor localStorage
     */
    function LS() {
    }

    /**
     * @constructor sessionStorage
     */
    function SS() {
      this.hash = {};
    }

    /**
     * @prototype localStorage.setItem
     * @param k
     * @param v
     */
    function l_setItem(k, v) {
      setCookie(k, String(v));
    }
    /**
     * @prototype localStorage.getItem
     * @param k
     * @returns
     */
    function l_getItem(k) {
      return getCookie(k);
    }
    /**
     * @prototype localStorage.removeItem
     * @param k
     */
    function l_removeItem(k) {
      setCookie(k, '', -1);
    }
    /**
     * @prototype localStorage.clear
     */
    function l_clear() {
      keyCookie().forEach(function(k) {
        setCookie(k, '', -1);
      });
    }
    /**
     * @prototype localStorage.key
     * @param n
     * @returns {Boolean}
     */
    function l_key(n) {
      if(arguments.length == 0)
        throw new Error(E.type('key'));
      return keyCookie()[parseInt(n) || 0] || null;
    }
    /**
     * @prototype localStorage.length
     * @returns {Number}
     */
    function l_length() {
      return keyCookie().length;
    }

    /**
     * @prototype sessionStorage.setItem
     * @param k
     * @param v
     */
    function s_setItem(k, v) {
      this.hash[k] = String(v);
    }
    /**
     * @prototype sessionStorage.getItem
     * @param k
     * @returns
     */
    function s_getItem(k) {
      return this.hash[k] || null;
    }
    /**
     * @prototype sessionStorage.removeItem
     * @param k
     */
    function s_removeItem(k) {
      delete this.hash[k];
    }
    /**
     * @prototype sessionStorage.clear
     * @returns
     */
    function s_clear() {
      this.hash = {};
    }
    /**
     * @prototype sessionStorage.key
     * @param n
     * @returns {Boolean}
     */
    function s_key(n) {
      if(arguments.length == 0)
        throw new Error(E.type('key'));
      return Object.keys(this.hash)[parseInt(n) || 0] || null;
    }
    /**
     * @prototype sessionStorage.length
     * @returns {Number}
     */
    function s_length() {
      return Object.keys(this.hash).length;
    }

    function keyCookie() {
      var cookie = is_window ? document.cookie: document.cookie || '';
      if(typeof cookie == 'string') {
        var keys = [];

        var i, cookies = cookie.split("; ");
        !cookies[0] && (cookies = []);// initial state

        for( var i = 0; i < cookies.length; i++) {
          var key = cookies[i].split("=")[0];
          if(typeof key == 'string' && keys.indexOf(key) == -1)
            keys.push(key);
        }

        return keys;
      } else {
        throw new Error('Cookie key failure.');
      }
    }
    function setCookie(key, value, days) {
      var cookie = is_window ? document.cookie: document.cookie || '';
      if(typeof cookie == 'string') {

        var i, cookies = cookie.split("; ");
        !cookies[0] && (cookies = []);// initial state

        for(i = 0; i < cookies.length; i++) {
          var str = cookies[i].split("=");
          if(str[0].trim() == key)
            break;
        }

        days = days || 365;

        var nowtime = new Date().getTime();
        var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * days));

        var kv = key + "=" + escape(value);
        var expires = clear_time.toGMTString();

        if(is_window)
          document.cookie = kv + "; expires=" + expires + "; path=/";
        else {
          // cookie emulation (no matter for expires, path options)
          var in_cookies = 0 <= i && i < cookies.length;
          if(days <= 0)
            in_cookies && cookies.splice(i, 1);
          else
            in_cookies ? (cookies[i] = kv): cookies.push(kv);
          document.cookie = cookies.join("; ");
        }

        return;
      } else {
        throw new Error('Cookie set failure.');
      }
    }

    function getCookie(key) {
      var cookie = is_window ? document.cookie: document.cookie || '';
      if(key && typeof cookie == 'string') {

        var i, cookies = cookie.split("; ");
        !cookies[0] && (cookies = []);// initial state

        for(i = 0; i < cookies.length; i++) {
          var str = cookies[i].split("=");
          if(str[0].trim() != key)
            continue;
          return unescape(str[1]);
        }

        return null;
      } else {
        throw new Error('Cookie get failure.');
      }
    }

  }
})(typeof window != 'undefined', typeof module != 'undefined');

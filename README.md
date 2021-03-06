# web-storages
  
[![Rank](https://nodei.co/npm/web-storages.png?downloads=true&amp;downloadRank=true&amp;stars=true)](https://nodei.co/npm/web-storages/)  
  
[![Version](https://badge.fury.io/js/web-storages.png)](https://npmjs.org/package/web-storages)
[![Build status](https://travis-ci.org/ystskm/web-storages-js.png)](https://travis-ci.org/ystskm/web-storages-js)  
  
Emulating localStorage and sessionStorage if not exist. 

## Install

Install with [npm](http://npmjs.org/):

    npm install web-storages
    
## API - Set functions by args

```js
    // On node.js, storages will attached to global automatically.
    // Take care for that exporting storages are not equals global storages.
    require('web-storages');
    
    // localStorage
    localStorage.setItem('hoge', 'Hello,hoge!');
    localStorage.setItem('fuga', 'Hello,fuga!');
    console.log(localStorage.getItem('hoge')); // => 'Hello,hoge!'
    console.log(localStorage.key(0)); // => 'hoge'
    console.log(localStorage.length()); // => 2
    
    localStorage.removeItem('hoge');
    console.log(localStorage.getItem('hoge'))); // => null
    console.log(localStorage.length()); // => 1
    
    localStorage.clear();
    console.log(localStorage.getItem('fuga'))); // => null
    console.log(localStorage.length()); // => 0
    
    // sessionStorage
    sessionStorage.setItem('hoge', 'Hello,hoge!');
    sessionStorage.setItem('fuga', 'Hello,fuga!');
    console.log(sessionStorage.getItem('hoge')); // => 'Hello,hoge!'
    console.log(sessionStorage.key(0)); // => 'hoge'
    console.log(sessionStorage.length()); // => 2
    
    sessionStorage.removeItem('hoge');
    console.log(sessionStorage.getItem('hoge'))); // => null
    console.log(sessionStorage.length()); // => 1
    
    sessionStorage.clear();
    console.log(sessionStorage.getItem('fuga'))); // => null
    console.log(sessionStorage.length()); // => 0
```
    
### also use on browser
  
On browser, storages will attached to window automatically.  
Now, almost all browsers have implemented web-storage, so that  
native module is used in natural.  
  
If you want to use this storages on a modern browser,  
you have to prepare "module.exports" object or "global" object  
on window namespace.  
  
Ways to import module with using "[require-js](http://requirejs.org/)"  
or "[foonyah](http://liberty-technology.biz/foonyahstation/docs/)" is awesome way for importing module.
  
And more, 4 functions to access "document.cookie" are attached to exports.  
`docCookie(document)` ... change cookie document to arguments[0] provided.  
`keyCookie()` ... get cookies key array.  
`setCookie(key, value, options)` ... set a cookie value. options accepts <Object> or <Number> to given days of period.  
`getCookie(key)` ... get a cookie value.  
  
```html
<script type="text/javascript">

    var src = 'https://raw.github.com/ystskm/web-storages-js/master/web-storages.js';
    foonyah.require(src).done(function(){
      localStorage.setItem( ... )
    });

</script>
```


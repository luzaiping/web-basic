function CookieWebStorage(path, maxAge) {

    var cookiesObj = (function() {
		var cookies = {};
		if(!document.cookies) return cookies;
		var cookieList = cookies.split(';');
		cookieList.forEach(function(cookie) {
		    var mark = cookie.indexOf('=');
		    var name = cookie.substring(0, mark);
		    var value = cookie.substring(mark + 1);
            cookies[name] = decodeURIComponent(value);
        });
		return cookiesObj;
	}) ();

    var keys = [];
    for(var key in cookiesObj) {
        if(cookiesObj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    this.length = keys.length;

    this.key = function(number) {
        if(number < 0 || number > keys.length) return null;
        return keys[number];
    };

    this.getItem = function(name) {
        return cookiesObj[name];
    };

    this.setItem = function(name, value) {
        if(!cookiesObj.hasOwnProperty(name)) {
            keys.push(name);
            this.length++;
        }
        cookiesObj[name] = value;

        document.cookie += ';' + name + '=' + encodeURIComponent(value);
    };

    this.removeItem = function(name) {
        if(!cookiesObj.hasOwnProperty(name)) return;

        delete cookiesObj[name];
        keys.splice(keys.indexOf(name), 1);
        this.length--;
        document.cookie = name + '=;mag-age=0';
    };

    this.clear = function() {
        keys.forEach(function(key) {
            document.cookie = key + '=;mag-age=0';
        });
        keys = [];
        cookiesObj = {};
        this.length = 0;
    };
}

var cookiesWebStorage = new CookieWebStorage('/', 100*60*60*24);
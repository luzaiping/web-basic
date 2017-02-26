/**
 * Created by Administrator on 2016/12/2.
 */

var req = new XMLHttpRequest();

req.open('GET', 'data.json');
// req.setRequestHeader('Content-Type', 'applicaiton/json');
req.send('id=123'); // body is null for get method.

req.onreadystatechange = function () {
    if(req.readyState === 4 && req.status === 200) {
        var type = req.getResponseHeader('Content-Type'); // get response data type
        console.log(type);
        if(type.indexOf('xml') !== -1 && req.responseXML) {
            callback(req.responseXML);
        } else if (type === 'application/json') {
            callback(JSON.parse(req.responseText));
        } else {
            callback(req.responseText); // text/plain or text/html
        }

        function callback(responseData) {
            
        }
    }
};

function postFormData(data) {
    if(typeof FormData === 'undefined') {
        throw new Error('FormData is not implemented'); // FormData in XHR2
    }

    var req = new XMLHttpRequest();
    req.onreadystatechange(function () {
        if(req.readyState === 4 && req.status === 200) {
            callback(req.response);
        }
    });

    // monitor file download progress.
    req.onprogress = function (event) {
        if(event.lengthComputable)  {
            progress.innerHTML = Math.round(100*event.loaded/event.total) + '% completed.';
        }
    }

    var formData = new FormData();
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === 'function') continue;
        formData.append(name, data[name]);
    }

    req.open('POST', url);
    req.send(formData);

    function monitorUploadProgress() {
        var uploadRequest = req.upload; // XMLHttpRequestUpload type
        uploadRequest.onprogress = function (event) {
            if(event.lengthComputable)  {
                progressEle.innerHTML = Math.round(100*event.loaded/event.total) + '% completed.';
            }
        }
        
        uploadRequest.onload = function (event) {
            progressEle.classList.remove('uploading'); // remove uploading style
            progressEle.innerHTML = 'upload is done.'
        }
    }

    function timedGetText() {
        var timeout = false;
        var timer = setTimeout(function () {
            timeout = true;
            req.abort();
        }, 5000);
        req.open('GET', url);
        req.send(null);
        req.onreadystatechange(function () {
            if(req.readyState !== 4) return ; // ignore incomplete request.
            if(timeout) return ; // ignore aborted request.
            clearTimeout(timer); // cancel pending timeout
            if(req.status === 200) {
                callback(req.responseText);
            }
        });

    }
}

function corsDemo() {
    var req = new XMLHttpRequest();
    var supportedCORS = req.withCredentials !== undefined;

    var links = document.getElementsByTagName('a');
    for(var i=0; i<links.length; i++) {
        var link = links[i];
        if(!link.href) continue; // ignore without href
        if(!link.title) continue; // ignore already have tooltips

        link.addEventListener('mouseover', getToolTip, false);

        function getToolTip() {
            req.open('HEAD', link.href);
            req.onredaystatechange(function () {
                if(req.readyState === 4) return;
                if(req.status === 200) {
                    var type = req.getResponseHeader('Content-Type');
                    var data = req.getResponseHeader('Last-Modified');
                    var size = req.getResponseHeader('Content-Length');
                    link.title = type + data + size;
                } else {
                    link.title = "can't fetch tooltip";
                }
            });
            req.send(null)
        }
    }
}

function getJSONP(url, callback) {
    var cbnum = 'cb' + getJSONP.counter++;
    var cbname = 'getJSONP.' + cbnum;
    url += (url.indexOf('?') !== -1 ? '?' : '&') + 'jsonp=' + cbname;

    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    getJSONP[cbnum] = function (response) {
        try {
            callback(response);
        }finally {
            delete getJSONP[cbnum];
            script.parentNode.removeChild(script);
        }
    }
}
getJSONP.counter = 0;

function comet() {
    var eventSource = new EventSource(url);
    eventSource.onmessage = function(event) {
        var type = event.type;
        var data = event.data;
    };

}

/**
 * Created by Administrator on 2016/12/1.
 */

/*(function(){
    var promise = new Promise(function (resolve, reject) {
        if(true) {
            resolve(1);
        } else {
            reject(Error('error occur'));
        }
    });

    promise.then(function(value) {
        console.log(value + 8);
    }).then(function(value) {
        console.log('result : ' + value);
    });
}());*/

(function() {

    function get(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET',url);
            req.onload = function() {
                if(req.status === 200) { // condition is required
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(Error("Network Error."));
            }
            req.send();
        });
    }

    function fail(error) {
        console.error("Failed!", error);
    }

    function log(response) {
        console.log('after parse: ' + response.heading);
    }

    function getJSON(url) {
        return get(url).then(JSON.parse, fail); // return promise-like object
    }

    var url = 'story.json';

    /*get(url).then(JSON.parse).then(function(json) {
        console.log('YEP JSON!', json);
    });*/

    /*getJSON(url).then(function(json) {
        console.log('getJSON!', json);
    }, fail);*/

    getJSON(url).then( function(storyJson) {
        return getJSON(storyJson.chapterUrls[0]);
    }).then( function(chapterJson) {
        console.log('Got Chapter 1: ' ,chapterJson.heading);
    }).catch(function(error) {
        console.log('error occur: ', error);
    });

    /*get(url).then(JSON.parse).then(function(story) {
        return get(story.chapterUrls[0]).then(JSON.parse);
    }).then( function(chapter1) {
        console.log(chapter1.heading);
    });*/
})();
/* function simplestCase() {
    let promise = new Promise(function (resolve, reject) {
        try {
            setTimeout(function () {
                resolve(111)
            }, 100)
        } catch (error) {
            reject(error)
        }
    })
    
    promise.then(function (result) {
        console.log(result)
    }, function (error) {
        console.error(error)
    })
} */

let targetDom = document.getElementById('result')

function addHtmlToPage(html) {
    targetDom.innerHTML += `<div>${html}</div>`
}

function addTextToPage(text) {
    targetDom.innerText += text
}

function get(url) {
    return new Promise(function (resolve, reject) {
        try {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.send()
            
            xhr.onload = function () {
                // status 404 also goes here. We should hanlde status 200 as successful.
                let { status, response, statusText } = xhr
                status === 200 ? resolve(response) : reject(Error(statusText))
            }
            
            xhr.onerror = function () {
                reject(Error('Networrk Error.'))
            }
        } catch (error) {
            reject(error)
        }
    })
}

// take a url and parse response as JSON format.
function getJSON(url) {
    return get(url).then(JSON.parse)
}

let storyPromise

// 返回一个promise，这个promise要等then里的getJSON resolve后，才可以继续then
function getChapter(index) {
    storyPromise = storyPromise || getJSON('story.json')
    return storyPromise.then(function (story) {
        return getJSON(story.chapterUrls[index])
    })
}

/* getJSON('story.json')
    .then(function (story) {
        return getJSON(story.chapterUrls[0])
    })
    .then(chapterOneJSON => {
        printResult(chapterOneJSON)
    }) */

/* getChapter(0).then(function (chapter) {
    addHtmlToPage(chapter.html)
    return getChapter(1)
}).then(function (chapter) {
    addHtmlToPage(chapter.html)
    return getChapter(2)
}).then(function (chapter) {
    addHtmlToPage(chapter.html)
    return getChapter(3)
}).then(function (chapter) {
    addHtmlToPage(chapter.html)
    return getChapter(4)
}).then(function (chapter) {
    addHtmlToPage(chapter.html)
}) */

/**
 * 有序执行实现方式
 */
function sequenceExecute() {
    
    getJSON('story.json')
        .then(function (story) {
            addHtmlToPage(story.heading)
            
            // 这种方式chapterUrls的执行顺序是有序，但是返回结果是无序
            /* story.chapterUrls.forEach(function(chapterUrl) {
                getJSON(chapterUrl)
                    .then(function (chapter) {
                        addHtmlToPage(chapter.html)
                    })
            }) */
    
            // 这种方式执行顺序和返回结果都是有序，因为下一个要等上一个执行完才能执行
            /* let sequence = Promise.resolve()
            story.chapterUrls.forEach(function(chapterUrl) {
                sequence = sequence.then(function () {
                    return getJSON(chapterUrl)
                }).then(function (chapter) {
                    addHtmlToPage(chapter.html)
                })
            }) */
    
            // 这种方式跟上面那个是等效，写法更加简洁和直观、容易理解
            return story.chapterUrls.reduce(
                function(sequence, chapterUrl) {
                    return sequence.then(function() {
                        return getJSON(chapterUrl)
                    }).then(chapter => {
                        addHtmlToPage(chapter.html)
                    })
                }, Promise.resolve())
        })
        .then(function () {
            addTextToPage('All done')
        })
        .catch(function (error) {
            addTextToPage('broken:' + error.message)
        })
        .then(function () {
            console.log('clean up!')
        })
}

// sequenceExecute()

// 并发执行并且有序，但是需要所有请求都完成才能显示内容
function parallelism() {
    getJSON('story.json')
        .then(function (story) {
            addHtmlToPage(story.heading)
            return Promise.all(story.chapterUrls.map(getJSON))
        })
        .then(function (chapters) { // 这边返回的chapters就是all方法参数的数组顺序
            chapters.forEach(function(chapter) {
                addHtmlToPage(chapter.html)
            })
            addTextToPage('All done')
        })
        .catch(function (error) {
            addTextToPage('broken:' + error.message)
        })
        .then(function () {
            console.log('clean up!')
        })
}

// parallelism()

// 并发执行并且有序，并且优先展示
//(比如chaper1已经加载完，就立马显示；如果chapter3已经完，但是chapter2 还没完，要等chapter2完了后，先显示chapter2 紧跟着显示 chapter3)
// 这种情形适合前面的promise resolve的result不传给后面的promise；如果要上一个promise的resolved result，那么就得用sequenceExecute，即不能
// 并发执行promise，而要按顺序执行，因为下一个promise需要上一个promise的resolved result。
function paralleismAndSequence() {
    getJSON('story.json')
        .then(function (story) {
            addHtmlToPage(story.heading)
            return story.chapterUrls.map(getJSON).reduce(function (sequence, chapterPromise) {
                return sequence.then(function() {
                    return chapterPromise
                }).then(chapter => {
                    addHtmlToPage(chapter.html)
                })
            }, Promise.resolve())
        })
        .then(function () { // 这边返回的chapters就是all方法参数的数组顺序
            addTextToPage('All done')
        })
        .catch(function (error) {
            addTextToPage('broken:' + error.message)
        })
        .then(function () {
            console.log('clean up!')
        })
}

// paralleismAndSequence()

function spawn(generatorFunc) {
    function continuer(verb, arg) {
        var result
        try {
            result = generator[verb](arg)
        } catch (err) {
            return Promise.reject(err)
        }
        if (result.done) {
            return result.value
        } else {
            return Promise.resolve(result.value).then(onFulfilled, onRejected)
        }
    }
    var generator = generatorFunc()
    var onFulfilled = continuer.bind(continuer, 'next')
    var onRejected = continuer.bind(continuer, 'throw')
    return onFulfilled()
}

spawn(function *() {
    try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json')
        addHtmlToPage(story.heading)

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download in parallel.
        let chapterPromises = story.chapterUrls.map(getJSON)

        for (let chapterPromise of chapterPromises) {
        // Wait for each chapter to be ready, then add it to the page
            let chapter = yield chapterPromise
            addHtmlToPage(chapter.html)
        }

        addTextToPage('All done')
    }
    catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage('Argh, broken: ' + err.message)
    }
    // document.querySelector('.spinner').style.display = 'none'
})
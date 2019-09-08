function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest()
        req.open('GET', url)

        req.onload = function() {
            if(req.status === 200) {
                resolve(req.response)
            } else {
                reject(Error(req.statusText))
            }
        }

        req.onerror = function() {
            reject(Error('Network Error'))
        }

        req.send()
    })
}

function getJSON(url) {
    // return get(url).then(JSON.parse)
    return get(url).then(response => JSON.parse(response))
}

function getChapter(index) {
    storyPromise = storyPromise || getJSON('story.json')
    return storyPromise.then(story => getJSON(story.chapterUrls[index]))
}

var storyPromise

let resultEle = document.getElementById('result')

/* get('story.json')
    .then(function(response) {
        return JSON.parse(response)
    })
    .then(function(response) {
        resultEle.innerText = response.heading
    })
    .catch(function(error) {
        resultEle.innerText = error
    }) */

/* getJSON('story.json')
    .then(story => {
        return getJSON(story.chapterUrls[0])
    })
    .then(chapter1 => {
        resultEle.innerText = chapter1.heading
    })
    .catch(error => {
        resultEle.innerText = error
    }) */

/* getChapter(0)
    .then(chapter => {
        resultEle.innerText = chapter.heading
        return getChapter(1)
    })
    .then(chapter => {
        resultEle.innerText += chapter.heading
    })
    .catch(error => {
        resultEle.innerText = error
    }) */

function addHtmlToPage(html) {
    resultEle.innerHTML += `<div>${html}</div>`
}

function addTextToPage(text) {
    resultEle.innerText += text
}

/* getJSON('story.json')
    .then(story => {
        return getJSON(story.chapterUrls[0])
    })
    .then(chapter => {
        addHtmlToPage(chapter.html)
    })
    .catch( () => {
        addTextToPage('something goes wrong while fetching chapter1')
    })
    .then(() => {
        console.log('no matter what i just keep going.')
    }) */

/* getJSON('story.json')
    .then(story => {
        addHtmlToPage(story.heading)

        return story.chapterUrls.reduce((chain, url) => {
            return chain.then(() => {
                return getJSON(url)
            }).then(chapter => {
                addHtmlToPage(chapter.html)
            })
        }, Promise.resolve())
    })
    .then(() => {
        addTextToPage('All done.')
    })
    .catch(error => {
        addTextToPage('something is wrong. ' + error.message)
    })
    .then(() => {
        addTextToPage('88')
    }) */

    /* getJSON('story.json')
        .then(story => {
            addHtmlToPage(story.heading)
            return Promise.all(story.chapterUrls.map(getJSON))
        })
        .then(chapters => {
            chapters.forEach(chapter => {
                addHtmlToPage(chapter.html)
            })
        })
        .catch(error => {
            addTextToPage(`something goes wrong: ${error.message}`)
        })
        .then(() => {
            addTextToPage('well done.')
        }) */

getJSON('story.json')
    .then(story => {
        addHtmlToPage(story.heading)
        story.chapterUrls.map(getJSON).reduce( // 对所有chapter的getJSON promise进行reduce
            (chain, chapterPromise) => {
                chain.then(() => {
                        return chapterPromise // 前面的promise resolve完了，才处理下一个 promise
                    })
                    .then(chapter => {
                        addHtmlToPage(chapter)
                    })
            }, Promise.resolve()) // 默认是一个立即resolve的promise
    })
    .then(() => {
        addTextToPage('All done.')
    })
    .catch(error => {
        addTextToPage(error.message)
    })
    .then(() => {
        addTextToPage('hide spinner')
    })
function* fetchPosts() {
    yield put(action.requestPosts())
    const products = yield call(fetchApi, '/products')
    yield put(action.receivePosts(products))
}

function* watchFetch() {
    while (yield take(FETCH_POSTS)) {
        yield call(fetchPosts) // call another generator
    }
}

function* game(getState) {
    let finished
    while (!finished) {
        const { score, timeout } = yield race({
            score: call(play, getState),
            timeout: call(delay, 1000)
        })

        if (!timeout) {
            finished = true
            yield put(showScore(score))
        }
    }
}
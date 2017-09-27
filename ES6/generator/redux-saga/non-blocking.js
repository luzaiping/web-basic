import { take, call , put, cancel, cancelled } from 'redux-saga/effects'

let Api = {
    authorize: function(user, password) {
        return Promise(function(resolve) {
            setTimeout(function() {
                console.log(user, password)
                resolve({ id: 1111 })
            }, 1000)
        })
    },
    storeItem: function({token}) {

    },
    clearItem: function({token}) {

    }
}

function* authorize(user, password) {
    try {
        const token = yield call(Api.authorize, user, password)
        yield put({ type: 'LOGIN_SUCCESS', token})
        return token
    } catch (error) {
        yield put({ type: 'LOGIN_FAILURE', error })
    }
}

function *loginFlow() {
    while (true) {
        const { user, password } = yield take('LOGIN_REQUEST') // pull future action and return action info
        const token = yield call(authorize, user, password) // call can invokes generator function but also function returns promise
        if (token) {
            yield call(Api.storeItem, { token })
            yield take('LOGOUT')
            yield call(Api.clearItem, { token })
        }
    }
}

function* authorize2() {
    try {
        const token = yield call(Api.authorize, user, password)
        yield put({ type: 'LOGIN_SUCCESS', token })
        yield call(Api.storeItem, {token})
    } catch (error) {
        yield put({ type: 'LOGIN_FAILURE', error })
    } finally {
        if ( yield cancelled() ) { // check while task is terminated accidently
            yield put({ type: 'RESET_LOGIN_PENDING' }) // so we can do some cleaned up work
        }
    }
}

function* loginFlow2() {
    while (true) {
        const { user, password } = yield take('LOGIN_REQUEST')
        const task = yield fork(authorize2, user, password) // non-blocking call
        let action = yield take(['LOGOUT', 'LOGIN_ERROR']) // waiting for LOGOUT or LOGIN_ERROR action
        if (action.type === 'LOGOUT') {
            cancel(task) // if LOGOUT acttion is dispatched, forked task must be cancelled, or there will be more than one concurrent tasks running
        }
        yield call(Api.clearItem, { token })
    }
}
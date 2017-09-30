// Called sometime after postMessage is called
// Do we trust the sender of this message?
/*
 * In the popup's scripts, running on <http://example.com>:
 */


/**
 * Created by Administrator on 2016/11/28.
 */
function receiveMessage(event) {
    if (event.origin !== "http://localhost:63342") {
        return;
    }
    console.log('pop up, event.data : ' + event.data);
    // event.source is window.opener
    // event.data is "hello there!"

    // Assuming you've verified the origin of the received message (which
    // you must do in any case), a convenient idiom for replying to a
    // message is to call postMessage on event.source and provide
    // event.origin as the targetOrigin.
    event.source.postMessage("hi there yourself!  the secret response " + "is: rheeeeet!", event.origin);
}

window.addEventListener("message", receiveMessage, false);
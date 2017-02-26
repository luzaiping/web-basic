/**
 * Created by Administrator on 2016/11/28.
 */
/*
 * In window A's scripts, with A being on <http://example.com:8080>:
 */

var button = document.getElementById('button');

button.onclick = function() {
    var popup = window.open('popup.html', '_blank');

    setTimeout(function () {
        // When the popup has fully loaded, if not blocked by a popup blocker:
        // This does nothing, assuming the window hasn't changed its location.
        popup.postMessage("The user is 'bob' and the password is 'secret'", "http://secure.example.net");

        // This will successfully queue a message to be sent to the popup, assuming
        // the window hasn't changed its location.
        popup.postMessage("hello there!", "http://localhost:63342"); // popup is the receiver. origin should set to popup's url.
    }, 1000);
};

function receiveMessage(event) {
    // Do we trust the sender of this message?  (might be
    // different from what we originally opened, for example).
    if (event.origin !== "http://localhost:63342")
        return;

    //console.log(event.Simulation);
    console.log('Simulation, event.data : ' + event.data);
    // event.Simulation is popup
    // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}

window.addEventListener("message", receiveMessage, false);
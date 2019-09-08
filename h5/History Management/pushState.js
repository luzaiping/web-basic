/**
 * Created by Administrator on 2016/11/28.
 */

function burger() {
    history.pushState({
        id: 1,
        name: 'Burger'
    }, null, '/plate/burger');

    changeScreen('Burger');
}

function sandwich() {
    history.pushState({
        id: 2,
        name: 'Sandwich'
    }, null, '/plate/sandwich');

    changeScreen('Sandwich');
}

function fries() {
    history.pushState({
        id: 3,
        name: 'Fries'
    }, null, '/plate/fries');

    changeScreen('Fries');
}

function changeScreen(name) {
    document.getElementById("chosen_plate").innerHTML = name;
}

function back() {
    history.back(); // only change location but not screen
}

window.onpopstate = function (event) {
    if(event.state) {
        console.log('event.id : ' + event.state.id);
        changeScreen(event.state.name);
    }
};
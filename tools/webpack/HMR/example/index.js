import hello from './hello';

const div = document.createElement('div');
div.innerHTML = hello();

document.body.appendChild(div);

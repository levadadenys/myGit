let image = React.createElement('img', {src : './../../react.png'});
let title = React.createElement ('h1', null, 'Hello React!');
let subTitle = React.createElement('p', null, 'Library for creating user interface');

let container = React.createElement('div', {className : 'container' }, image,title,subTitle);

ReactDOM.render(container, document.getElementById('root'));
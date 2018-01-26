console.log('demo JavaScript file');

var elDemo = document.querySelector('.demo-class');
console.log('elDemo', elDemo);

document.querySelector('.demo-class').addEventListener('click', function(event) {
console.log ('you clicked demo-class el');
});

console.log('demo JavaScript file');

var elDemo = document.querySelector('.demo-class');

if (elDemo) {
  console.log ('el demo exists!');
}
console.log('elDemo', elDemo);

if ( document.querySelector('.demo-class') ) {
  document.querySelector('.demo-class').addEventListener('click', function(event) {
    console.log ('you clicked demo-class el');
  });
}

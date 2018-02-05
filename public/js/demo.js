
var elDemo = document.querySelector('.demo-class');
var demoId = document.getElementById('demo-id');

// console.log ('elDemo using querySelector:', elDemo);
// console.log ('demoId using getElementById:', demoId);

if (elDemo) {
  // console.log ('el demo exists!');
}

if ( document.querySelector('.demo-class') ) {
  document.querySelector('.demo-class').addEventListener('click', function(event) {
    console.log ('you clicked demo-class el');
  });
}


//works:
// var demoClassTest = document.querySelector('.demo-class');
// document.querySelector('.demo-class').addEventListener('click', function(event) {
// console.log ('you clicked demo-class');
// });

//works:
// var demo = document.getElementById('demo-btn');
// demo.addEventListener('click', function(event) {
//   console.log ('clicked demo btn');
// });

//works:
    // var x = document.getElementById("demo");
    // x.style.color = "orange";

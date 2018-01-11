// console.log('hi this is the SBLC app!');
//
// var listController = (function() {
//   //calculation and data structure goes here.
// })();
//
// // code for displaying or updating UI here:
// var UIController = (function() {
//
//   var DOMstrings = {
//     toggleBtn: '.toggle-btn'
//   };
//
//   return {
//     getDOMstrings: function() {
//       return DOMstrings;
//     }
//   }
//
// })();
//
// // GLOBAL APP CONTROLLER: main job is to call other methods
// var controller = (function(listCtrl, UICtrl) {
//
//   var setupEventListeners = function() {
//     var DOM = UICtrl.getDOMstrings();
//     // document.querySelector(DOM.toggleBtn).addEventListener('click', )
//   };
//
//   var ctrlAddItem = function(event) {
//     console.log ('a click event caused ctrlAddItem to be called!');
//   }
//
// })(listController, UIController);
//
// controller.init();
//


$(document).ready(function(){

  //  $('.collapseAll').click(function(){
  //      $('.panel-collapse.in')
	// 	.collapse('hide');
  //   });
  //   $('.expandAll').click(function(){
	// $('.panel-collapse:not(".in")')
	// 	.collapse('show');
  //   });

console.log ('hi!!');

    $('.btn-main-controller').click(function() {
      console.log (' you clicked!!');
      $('.multi-collapse').collapse('hide');


    });

});

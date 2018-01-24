console.log('hi this is the SBLC app!');
var listController = (function() {
  //calculation and data structure goes here.
})();

// code for displaying or updating UI here:
var UIController = (function() {

  var DOMstrings = {
    toggleBtn: '.toggle-btn',
    submitBtn: '.submit-btn'
  };

  return {
    getDOMstrings: function() {
      return DOMstrings;
    }
  }

})(); //end of UIController

// GLOBAL APP CONTROLLER: main job is to call other methods
var controller = (function(listCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    // document.querySelector(DOM.toggleBtn).addEventListener('click', )
  };

  var ctrlAddItem = function(event) {
    console.log ('a click event caused ctrlAddItem to be called!');
  }

  return {
    init: function() {
      setupEventListeners();
    }
  }

})(listController, UIController);

controller.init();


    $('.btn-main-controller').click(function() {
      console.log (' you clicked!!');
      $('.multi-collapse').collapse('hide');
    });

  var subject = document.getElementById('subject');
  var submitThreadBtn = document.getElementById('submit-thread');
  document.querySelector('.submit-btn').addEventListener('click', validateInput);

  submitThreadBtn.addEventListener('click', function(event) {
    if (subject.validity.valueMissing) {
      subject.setCustomValidity('Please write a something in the field.');
    }
  });

  function validateInput() {
    console.log ('you clicked!!');
  }

  // $(document).ready(function(){
// });

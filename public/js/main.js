// var submitThreadBtn = document.getElementById('submit-thread');
// submitThreadBtn.addEventListener('click', function(event) {
//   console.log ('clicked submitThreadBtn');
// });

// $(document).ready(function(){

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


var listController = (function() {
  //calculation and data structure goes here.
})();

// code for displaying or updating UI here:
var UIController = (function() {

  var DOMstrings = {
    toggleBtn: '.toggle-btn',
    submitBtn: '.submit-btn',
    subject: '.subject',
    textBody: '.text-body',
    demoBtn: '.demo-btn',
    demoClass: '.demo-class'
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
    console.log ('demo-class', DOM.demoClass);
    console.log (DOM.submitBtn);
    console.log (typeof DOM.submitBtn);
    console.log ('demo btn str:', typeof DOM.demoBtn, DOM.demoBtn);

    console.log ('asdfkjl;', document.querySelector(DOM.demoClass) );
    if ( document.querySelector(DOM.demoClass) ) {
      document.querySelector(DOM.demoClass).addEventListener('click', function(event) {
        console.log('clicked!!!!!');
      });
    }

    var submitBtn = document.querySelector(DOM.submitBtn);
    if (submitBtn) {
      submitBtn.addEventListener('click', validateInput);
    }

    // document.querySelector('.submit-btn').addEventListener('click', displayTest);

  };

  var ctrlAddItem = function(event) {
    console.log ('a click event caused ctrlAddItem to be called!');
  }

  var displayTest = function(event) {
    console.log ('yes!! clicked!');
  };

  var validateInput = function() {
    console.log ('validateInput running...');
    var subject = document.querySelector(DOM.subject);
    var textBody = document.querySelector(DOM.textBody);
      if (subject.validity.valueMissing || textBody.validity.valueMissing) {
        subject.setCustomValidity('Please write a something in the field.');
      }
  };

  // var validateInput = function() {
  //   console.log ('validateInput running...');
  //   var subject = document.getElementById('subject');
  //     if (subject.validity.valueMissing) {
  //       subject.setCustomValidity('Please write a something in the field.');
  //     }
  // };

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

  // var submitThreadBtn = document.getElementById('submit-thread');

  // submitThreadBtn.addEventListener('click', function(event) {
  //   if (subject.validity.valueMissing) {
  //     subject.setCustomValidity('Please write a something in the field.');
  //   }
  // });


// }); //end of document ready fxn



// function validateInput() {
//   console.log ('you clicked!!');
// }




// document.querySelector('demoId').addEventListener('click', function(event) {
// console.log ('you clicked myEl');
// });
// console.log ('myEl', myEl);


// $(document).ready(function(){
//
//   document.querySelector(".room-sblc").addEventListener('click', function() {
//     console.log ('room sblc container!!');
//   });
// });
// $(document).ready(function(){

var listController = (function() {
  //calculation and data structure goes here.
  // console.log ('LISTcONTROLLER!!');
})();

// code for displaying or updating UI here:
var UIController = (function() {

  var DOMstrings = {
    toggleBtn: '.toggle-btn',
    submitBtn: '.submit-btn',
    subject: '.subject',
    textBody: '.text-body',
    demoBtn: '.demo-btn',
    demoClass: '.demo-class',
    delBtn: '.del-btn',
    replyTextBox: '.reply-text-box',
    replyBoxParent: '.reply-box-parent',
    replyBtn: '.reply-btn',
    threadsBox: '.threads-box'
  };

  var createReplyBox = function() {
    // console.log ('createReplyBox method running!');
    //create and return the element to be re-used:
    var divParent = document.createElement('div');
    divParent.className = 'replyBoxParent';
    var input = document.createElement('input');
    // var input = document.createElement('input');
    // var results;
    input.type = 'text';
    input.name = 'myName';
    input.className = 'reply-text-box';
    divParent.appendChild(input);
    // console.log ('input created:', input);
    return divParent;
  };

  return {
    getDOMstrings: function() {
      return DOMstrings;
    },
    //e: event, el: element
    checkElementClicked: function(e) {
      // console.log ('checkElementClicked running...');
      var elClicked, parentEl;
      elClicked = e.target;
      // console.log ('element clicked is', elClicked);
      parentEl = elClicked.parentNode;
      console.log ('parent el for clicked el: ', parentEl);
      if (elClicked.className === 'reply-btn') {
        // console.log ('element clicked is a reply btn!');
        // console.log ('createReplyBox results:', typeof createReplyBox() );
      // var replyBtnTest = document.querySelector('.reply-btn');
      // var notExist = document.querySelector('.test-ted');
      // console.log('parent el contains:', parentEl.contains(replyBtnTest) );
      // console.log('parent el contains:', parentEl.contains(notExist) );
      var replyTextBox = document.querySelector(DOMstrings.replyTextBox);
      var replyBoxParent = document.querySelector(DOMstrings.replyTextBox);

      console.log('parentEl has replyTextBox:', parentEl.contains(replyTextBox), 'replyTextBox el is:' );
        //only create a reply box if parent does not already have reply text box
        if (parentEl.contains(replyBoxParent) === false) {
          console.log ('appending to parent!!');
          //target, then append created element to the chosen element:
          parentEl.appendChild(createReplyBox());
        }
      }
    },
  }   //end of UIController return statement
})(); //end of UIController

// GLOBAL APP CONTROLLER: main job is to call other methods
var controller = (function(listCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //remember that you'll get error: Uncaught TypeError: Cannot read property 'addEventListener'
    //of null if there's no logged in user, since ejs
    //renders only certain parts of page if there's a user
    document.querySelector(DOM.threadsBox).addEventListener('click', UICtrl.checkElementClicked);
    if ( document.querySelector(DOM.demoClass) ) {
      document.querySelector(DOM.demoClass).addEventListener('click', function(event) {
        console.log('clicked!!!!!');
      });
    }

    var submitBtn = document.querySelector(DOM.submitBtn);
    if (submitBtn) {
      submitBtn.addEventListener('click', validateInput);
    }

    var delBtn = document.querySelector(DOM.delBtn);
    if (delBtn) {
      delBtn.addEventListener('click', validateInput);
    }
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

// document.querySelector('demoId').addEventListener('click', function(event) {
// console.log ('you clicked myEl');
// });
// console.log ('myEl', myEl);


// $(document).ready(function(){
//
//   document.querySelector(".room-sblc").addEventListener('click', function() {
//     console.log ('room sblc container!!');
//   });
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
  console.log ('LISTcONTROLLER!!');
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
    replyBtn: '.reply-btn',
    threadsBox: '.threads-box'
  };

  var createReplyBox = function() {
    console.log ('createReplyBox method running!');
    //create and return the element:
    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'myName';

    console.log ('input created:', input);
    return input;

  };

  return {
    getDOMstrings: function() {
      return DOMstrings;
    },

    //e: event, el: element
    checkElementClicked: function(e) {
      console.log ('checkElementClicked running...');
      createReplyBox();

      var elClicked, parentEl;
      elClicked = e.target;
      console.log ('element clicked is', elClicked);
      parentEl = elClicked.parentNode;
      console.log ('parent el: ', parentEl);
      console.log (elClicked.className, DOMstrings.replyBtn);
      if (elClicked.className === 'reply-btn') {
        console.log ('element clicked is a reply btn!');
        //only create a reply box if parent does not already have reply text box
        // parentEl.contains();
        // console.log ('created reply box:', createReplyBox());

        //target, then append created element to the chosen element:
        // var parent = document.querySelector(DOMstrings.replyBtn).parentElement;
        console.log ('parent', parentEl);
        console.log ('createReplyBox results:', createReplyBox() );
        parentEl.appendChild(createReplyBox());





        // var replyBtn = document.querySelector(DOM.replyBtn);
        // if (replyBtn) {
        //   replyBtn.addEventListener('click', UICtrl.createReplyBox);
        // }


      }



    },

    // createReplyBox: function() {
    //   console.log ('createReplyBox method running!');
    //   //create and return the element:
    //   var input = document.createElement('input');
    //   input.type = 'text';
    //   input.name = 'myName';
    //
    //   console.log ('input created:', input);
    //   //target, then append created element to the chosen element:
    //   var parent = document.querySelector(DOMstrings.replyBtn).parentElement;
    //
    //   console.log ('parent', parent);
    //   parent.appendChild(input);
    // }


  }

})(); //end of UIController

// GLOBAL APP CONTROLLER: main job is to call other methods
var controller = (function(listCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //remember that you'll get error: Uncaught TypeError: Cannot read property 'addEventListener' of null if there's no logged in user, since ejs
    //renders only certain parts of page if there's a user
    document.querySelector(DOM.threadsBox).addEventListener('click', UICtrl.checkElementClicked);





    // console.log ('demo-class', DOM.demoClass);
    // console.log (DOM.submitBtn);
    // console.log (typeof DOM.submitBtn);
    // console.log ('demo btn str:', typeof DOM.demoBtn, DOM.demoBtn);
    //
    // console.log ('asdfkjl;', document.querySelector(DOM.demoClass) );
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






    // document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);




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



// document.querySelector('demoId').addEventListener('click', function(event) {
// console.log ('you clicked myEl');
// });
// console.log ('myEl', myEl);

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
    replyForm: '.reply-form',
    replyBtn: '.reply-btn',
    threadsBox: '.threads-box'
  };

  var createReplyBox = function(parent) {
    console.log ('createReplyBox running, the parent param:', parent);
    var divParent = parent;

    var form = document.createElement('form');
    form.action = '/threads/reply';
    form.method = 'POST';
    form.className = 'reply-form';
    divParent.appendChild(form);

    var div = document.createElement('div');
    div.className = 'form-group';
    form.appendChild(div);

    var textArea = document.createElement('textarea');
    textArea.autofocus = true;
    textArea.required = true;
    textArea.className = 'form-control';
    textArea.className = 'comment-text-input';
    textArea.name = 'reply';

    var input = document.createElement('input');
    div.appendChild(input);
    // console.log('input el created:', input.parentNode.parentNode.parentNode);
    var parentId = input.parentNode.parentNode.parentNode.getAttribute('id');
    input.type = 'hidden';
    input.name = 'threadId';
    input.value = parentId;

    div.appendChild(textArea);

    var button = document.createElement('button');
    button.className = 'btn';
    button.innerText = 'Submit!';
    div.appendChild(button);
    return form;
  };
      // <form action="/threads/<%= thread._id %>?_method=PUT" method="POST">
      //   <div class="form-group">
      //     <textarea autofocus name="comment[text]" class="form-control comment-text-input" value="<%= comment.text %>" required><%= comment.text %></textarea>
      //   </div>
      //   <input type="hidden" name="threadId">
      //   <button class="btn btn-primary">Submit</button>
      // </form>

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
      console.log ('el clicked:', elClicked, 'parent el for clicked el: ', parentEl);
      if (elClicked.className === 'reply-btn') {
        // console.log ('element clicked is a reply btn!');
        // console.log ('createReplyBox results:', typeof createReplyBox() );
      // var replyBtnTest = document.querySelector('.reply-btn');
      // console.log('parent el contains:', parentEl.contains(replyBtnTest) );
      var replyTextBox = document.querySelector(DOMstrings.replyTextBox);
      var replyBoxParent = document.querySelector(DOMstrings.replyTextBox);
      var replyForm = document.querySelector(DOMstrings.replyForm);
      console.log('parentEl has replyTextBox:', parentEl.contains(replyTextBox), 'replyTextBox el is:' );
        //only create a reply box if parent does not already have reply text box
        if (parentEl.contains(replyForm) === false) {
          console.log ('appending to parent!!');
          //target, then append created element to the chosen element:
          parentEl.appendChild(createReplyBox(parentEl)); //DOM is now updated to have results of createReplyBox method call
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
    //of null if there's no logged in user, since ejs renders only certain parts of page if there's a user
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

// }); //end of document ready fxn

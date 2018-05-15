// $(document).ready(function(){
//
// });
// $(document).ready(function(){

var listController = (function() {
  //calculation and data structure goes here.
  // console.log ('LISTcONTROLLER!!');
})();

// code for displaying or updating UI here:
var UIController = (function() {

  //make sure to add a period(.) for the value
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
    container: '.container'
  };

  var createReplyBox = function(elClicked) {
    console.log ('createReplyBox running, the parent param:', parent);
    // var divParent = parent;

    // data-parent-thread="<%= thread._id %>"
    // data-parent-reply="<%= reply._id %>"

    var thread = elClicked.getAttribute('data-parent');
    var reply = elClicked.getAttribute('data-self');
    // console.log('threadasdjk;fl', thread);

    var form = document.createElement('form');
    form.action = '/threads/' + thread + '/replies/' + reply +'/replies';
    // form.action = '/threads/:id/replies/:reply_id/replies';
    form.method = 'POST';
    form.className = 'reply-form';
    elClicked.appendChild(form);

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
    button.className = 'btn-secondary';
    button.innerText = 'Submit';
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
      var elClicked, appendTarget;
      elClicked = e.target;
      appendTarget = elClicked.nextElementSibling;
      // parentEl = elClicked.parentNode;
      // console.log ('elClicked:', elClicked, 'elClicked parent:', parentEl, 'appendTarget', appendTarget);

      if (elClicked.className === 'reply-btn') {
        console.log ('element clicked is a reply btn!');
      // var replyTextBox = document.querySelector(DOMstrings.replyTextBox);
      // var replyBoxParent = document.querySelector(DOMstrings.replyTextBox);
      // var replyForm = document.querySelector(DOMstrings.replyForm);
      // console.log('parentEl has replyTextBox:', parentEl.contains(replyTextBox), 'replyTextBox el is:' );
        //only create a reply box if parent does not already have reply text box
        console.log ('child!!', appendTarget.firstChild)
        if (appendTarget.firstChild === null) {
          console.log ('')
          // console.log ('contains?', appendTarget.contains(replyForm), 'replyForm:', replyForm);
          //target, then append created element to the chosen element:
          appendTarget.appendChild(createReplyBox(elClicked)); //DOM is now updated to have results of createReplyBox method call
        }


        // if (appendTarget.contains(replyForm) === false) {
        //   console.log ('contains?', appendTarget.contains(replyForm), 'replyForm:', replyForm);
        //   //target, then append created element to the chosen element:
        //   appendTarget.appendChild(createReplyBox(appendTarget)); //DOM is now updated to have results of createReplyBox method call
        // }



      }

      if (elClicked.className === 'collapse-expand') {
        console.log('collapse-expand!!');
         elClicked.classList.toggle("collapsed");
      }
      if (elClicked.className === 'hide-show') {
        console.log('hide show!!!!!');
         elClicked.classList.toggle("collapsed");
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
    // document.querySelector(DOM.threadsBox).addEventListener('click', UICtrl.checkElementClicked);
    // if ( document.querySelector(DOM.demoClass) ) {
    //   document.querySelector(DOM.demoClass).addEventListener('click', function(event) {
    //     console.log('clicked!!!!!');
    //   });
    // }


    document.querySelector(DOM.container).addEventListener('click', UICtrl.checkElementClicked);

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


    //triggered right before the modal is shown
    $('#basicModal').on('show.bs.modal', function(e) {
      console.log('teddy occuring just before modal about to be shown!! here!');
      //the clicked element already has the threadid when the page is rendered.
      console.log('clicked el:', $(e.relatedTarget));

        //get data-id attribute of the clicked element
        var id = $(e.relatedTarget).data('id');
        var selfId = $(e.relatedTarget).data('self');

        if ( $(e.relatedTarget).hasClass("comment-del-btn") ) {
          console.log('comment-del-btn!!!');
          var formAction = "/comments/" + id + "?_method=DELETE";
        }
        else if ( $(e.relatedTarget).hasClass("thread-del-btn") ) {
          console.log ('thread-del-btn!!');
          var formAction = "/threads/del/" + id + "?_method=PUT";
        }
        // pseudo delete reply
        else if ( $(e.relatedTarget).hasClass("reply-del-btn") ) {
          console.log ('reply-del-btn!!');
          var formAction = "/threads/" + id + "/replies/" + selfId + "?_method=DELETE";
        }

        // else if ( $(e.relatedTarget).hasClass("reply-del-btn") ) {
        //   console.log ('reply-del-btn!!');
        //   var formAction = "/threads/" + id + "/replies/" + selfId + "?_method=DELETE";
        //   // /threads/:id/replies/:reply_id
        // }

        //after pulling out id from clicked element, target the form element, and stick
        //id into it's action attribute:
        $("#modal-form-action").attr("action", formAction);
    });

    //triggered right before the modal is shown
    $('#deleteModal').on('show.bs.modal', function(e) {
      console.log('deleteModel !! occuring just before modal about to be shown!! here!');
      //the clicked element already has the threadid when the page is rendered.
      console.log('clicked el:', $(e.relatedTarget));
        //get data-id attribute of the clicked element
        var id = $(e.relatedTarget).data('thread-id');
        var formAction = "/threads/del/" + id + "?_method=PUT";
        //after pulling out id from clicked element, target the form element, and stick
        //id into it's action attribute:
        $("#modal-form-action").attr("action", formAction);
    });


// }); //end of document ready fxn

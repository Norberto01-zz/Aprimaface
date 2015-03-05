/**
 * Created by root on 3/5/15.
 */
$(document).ready(function(){
  $('#sign-up-form').validate({
    rules: {
      password: {
        minlength: 6,
        required: true
      },
      confirmation: {
        minlength: 6,
        equalTo: '#password'
      }
    },
    success: function(element){
      element.text('OK').addClass('valid');
    }
  });
});

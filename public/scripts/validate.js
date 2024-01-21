document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
      form: '.form',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#username', 'Please enter your full name'),
        Validator.isRequired('#LastName', 'Please enter your full name'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', function () {
          return document.querySelector('#formRegister #password').value;
        }, 'Re-entered password is incorrect')
      ],
      onSubmit: function (data) {
        // Call API
        console.log(data);
      }
    });


    Validator({
      form: '.form',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
      ],
      onSubmit: function (data) {
        // Call API
        console.log(data);
      }
    });
  });

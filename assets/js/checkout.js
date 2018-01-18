$(document).ready(function() {

  // $('.checkout-form-shipping-info').find('.continue-button').on('click', function() {
  //   $('.checkout-form-shipping-info').removeClass('incomplete editing').addClass('complete');
  //   $('.checkout-form-shipping-options').removeClass('incomplete').addClass('editing');
  // });
  //
  // $('.checkout-form-shipping-options').find('.continue-button').on('click', function() {
  //   $('.checkout-form-shipping-info').removeClass('incomplete editing').addClass('complete');
  //   $('.checkout-form-payment').removeClass('incomplete').addClass('editing');
  // });
  // fn.init();
  bind_step();

  function bind_step() {
    $('.checkout-form-shipping-info').find('.continue-button').on('click', function() {
      $('.checkout-form-shipping-info').removeClass('incomplete editing').addClass('complete');
      $('.checkout-form-shipping-options').removeClass('incomplete').addClass('editing');
    });

    $('.checkout-form-shipping-options').find('.continue-button').on('click', function() {
      $('.checkout-form-shipping-options').removeClass('incomplete editing').addClass('complete');
      $('.checkout-form-payment').removeClass('incomplete').addClass('editing');
    });
  };

  function validateShippingInfo() {

  };

  function validateShippingOptions() {

  };

  function validatePayment () {

  };
});

$(document).ready(function() {

/* Variables */
  var prodcuts;
  var currentClothingType = "shirt";
  var currentShirtColor = "black";
  var currentHoodyColor = "black";
  var currentHatColor = "black";
  var totalBackGraphics = 10;
  var totalFrontGraphics = 10;
  var myCart = [];
  var url = "https://chancequick2.myshopify.com/cart/";
  var images = [
      'assets/image/shirt/blue_back.png',
      'assets/image/shirt/blue_front.png',
      'assets/image/shirt/marroon_back.png',
      'assets/image/shirt/marroon_front.png',
      'assets/image/shirt/orange_back.png',
      'assets/image/shirt/orange_front.png',
      'assets/image/shirt/turqoise_back.png',
      'assets/image/shirt/turqoise_front.png',
      'assets/image/shirt/lightyellow_back.png',
      'assets/image/shirt/lightyellow_front.png',
      'assets/image/shirt/yellow_back.png',
      'assets/image/shirt/yellow_front.png',
      'assets/image/shirt/lavender_back.png',
      'assets/image/shirt/lavender_front.png',
      'assets/image/shirt/navy_back.png',
      'assets/image/shirt/navy_front.png',
      'assets/image/shirt/red_back.png',
      'assets/image/shirt/red_front.png',
      'assets/image/shirt/seafoam_back.png',
      'assets/image/shirt/seafoam_front.png',
      'assets/image/shirt/green_front.png',
      'assets/image/shirt/green_back.png',
      'assets/image/shirt/black_front.png',
      'assets/image/shirt/black_back.png',
      'assets/image/shirt/white_front.png',
      'assets/image/shirt/white_back.png',
      'assets/image/shirt/pink_front.png',
      'assets/image/shirt/pink_back.png',
      'assets/image/hoody/red_front.png',
      'assets/image/hoody/red_back.png',
      'assets/image/hoody/black_back.png',
      'assets/image/hoody/black_front.png',
      'assets/image/hoody/blue_back.png',
      'assets/image/hoody/blue_front.png',
      'assets/image/hoody/lightblue_back.png',
      'assets/image/hoody/lightblue_front.png',
      'assets/image/hoody/marroon_back.png',
      'assets/image/hoody/marroon_front.png',
      'assets/image/hoody/white_back.png',
      'assets/image/hoody/white_front.png',
      'assets/image/hat/black_back.png',
      'assets/image/hat/black_front.png',
      'assets/image/hat/marroon_back.png',
      'assets/image/hat/marroon_front.png',
      'assets/image/hat/pink_back.png',
      'assets/image/hat/pink_front.png',
      'assets/image/hat/red_back.png',
      'assets/image/hat/red_front.png',
      'assets/image/hat/lightblue_back.png',
      'assets/image/hat/lightblue_front.png',
      'assets/image/hat/darkblue_back.png',
      'assets/image/hat/darkblue_front.png',
      'assets/image/hat/green_back.png',
      'assets/image/hat/green_front.png',
      'assets/image/hat/grey_back.png',
      'assets/image/hat/grey_front.png',
      'assets/image/hat/white_back.png',
      'assets/image/hat/white_front.png',
  ];

  ////////////// Preload images before loading /////////////////////

    var innerHeight = $(window).innerHeight();
    // $('html').css('height', innerHeight + 'px');
    // alert($(document).height() + " : " + $(window).innerHeight());
  ////////////// ----------------------------- /////////////////////
////////////// Preload images before loading /////////////////////

  $.preload(images, 1, function(last){
    if (last) {
      $('body').animate({'opacity': 1}, 500);
      $('body .loading-overlay').hide();
    }
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user change graphic color /////////////////////
  $('.graphic-colors span').on('click', function() {
    var self = this;
    var colorVal = $(self).data('value');
    $('.img-col .whole-img-wrapper svg').css('fill', colorVal);
    $(self).siblings().removeClass('active');
    $(self).addClass('active');

    $('.graphic_color').val(colorVal);
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user change clothing type /////////////////////
  $('.nav-clothing .nav-menu').on('click', function() {
    var self = this;
    if($(self).hasClass('active')) {
      return;
    }
    var clothingType = $(self).data('value');
    currentClothingType = clothingType;
    var curClothingColor = $('.clothing-colors.' + clothingType + ' span.active').data('value');
    var curGraphicColor = $('.graphic-colors.' + clothingType + ' span.active').data('value');
    var curFrontGraphicType = $('.img-wrapper .img-front svg.front.active').data('value');
    var curBackGraphicType = $('.img-wrapper .img-back svg.back.active').data('value');
    var frontImgSrc = "url('assets/image/" + clothingType + "/" + curClothingColor + "_front.png')";
    var backImgSrc = "url('assets/image/" + clothingType + "/" + curClothingColor + "_back.png')";

    $(self).parent().siblings().find('path,line').attr('stroke', '#ffffff');
    $(self).find('path,line').attr('stroke', '#000000');
    if(clothingType == 'hoody') {
      $('.img-wrapper').addClass('hoody');
      $('.img-wrapper img.bg-img').addClass('hoody');
    }
    else {
      $('.img-wrapper').removeClass('hoody');
      $('.img-wrapper img.bg-img').removeClass('hoody');
    }
    if(clothingType == 'hat') {
      $('.img-wrapper .mark-nav').css('opacity', '0');
      $('.img-wrapper .mark-nav').css('visibility', 'hidden');
      $('.img-wrapper .mark-hint').css('opacity', '0');
      $('.img-wrapper .img-front svg.front.active').hide();
      $('.img-wrapper .img-front svg.front-hat').show();
      $('.img-wrapper .img-back svg.back.active').hide();
      $('.img-wrapper .img-back svg.back-hat').show();
      $('.size-options-wrap').css('opacity', '0');
      curFrontGraphicType = $('.img-wrapper .img-front svg.front-hat').data('value');
      curBackGraphicType = $('.img-wrapper .img-back svg.back-hat').data('value');
    }
    else {
      $('.img-wrapper .mark-nav').css('opacity', '1');
      $('.img-wrapper .mark-nav').css('visibility', 'visible');
      $('.img-wrapper .mark-hint').css('opacity', '1');
      $('.img-wrapper .img-front svg.front.active').show();
      $('.img-wrapper .img-front svg.front-hat').hide();
      $('.img-wrapper .img-back svg.back.active').show();
      $('.img-wrapper .img-back svg.back-hat').hide();
      $('.size-options-wrap').css('opacity', '1');
    }


    $('.img-wrapper .img-front img').css('background-image', frontImgSrc);
    $('.img-wrapper .img-back img').css('background-image', backImgSrc);
    $('.img-col .whole-img-wrapper svg').css('fill', curGraphicColor);

    $('.clothing-colors .current_clothing').html(clothingType);
    $('.clothing-colors').hide();
    $('.graphic-colors').hide();
    $('.clothing-colors.' + clothingType).show();
    $('.graphic-colors.' + clothingType).show();
    $('.img-wrapper').removeClass('shirt hat hoody');
    $('.img-wrapper').addClass(clothingType);
    $(self).parent().siblings().find('span').removeClass('active');
    $(self).addClass('active');

    $('.clothing_type').val(clothingType);
    $('.clothing_color').val(curClothingColor);
    $('.front_graphic_type').val(curFrontGraphicType);
    $('.back_graphic_type').val(curBackGraphicType);
    $('.graphic_color').val(curGraphicColor);
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user change clothing color /////////////////////
  $('.clothing-colors span').on('click', function() {
    var self = this;
    var colorVal = $(self).data('value');
    var frontImgSrc = "url('assets/image/" + currentClothingType + "/" + colorVal + "_front.png')";
    var backImgSrc = "url('assets/image/" + currentClothingType + "/" + colorVal + "_back.png')";
    $('.img-wrapper .img-front img').css('background-image', frontImgSrc);
    $('.img-wrapper .img-back img').css('background-image', backImgSrc);
    $(self).siblings().removeClass('active');
    $(self).addClass('active');
    $(self).siblings().removeClass('active');
    $(self).addClass('active');

    $('.clothing_color').val(colorVal);
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user change clothing size /////////////////////
  $('.size-options-wrap span').on('click', function(){
    $('.size-options-wrap .selected').removeClass('selected');
    $(this).addClass('selected');

    $('.clothing_size').val($(this).data('value'));
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user change side of clothing on mobile /////////////////////
  $('#mobile-wrapper .nav-side').on('click', function() {
    var self = this;
    var sideType = $(self).data('value');
    if(sideType == "img-front") {
      $('#mobile-wrapper .img-wrapper .img-col.img-front .whole-img-wrapper').removeClass('appear').addClass('disappear');
      setTimeout(function() {
        $('#mobile-wrapper .img-wrapper .img-col').hide();
        $('#mobile-wrapper .img-wrapper .img-col.img-back').show();
        $('#mobile-wrapper .img-wrapper .img-col.img-back .whole-img-wrapper ').removeClass('disappear').addClass('appear');
        $('#mobile-wrapper .img-wrapper .img-col.img-back .whole-img-wrapper svg.back.active').attr('class', 'back active');
        $('#mobile-wrapper .img-wrapper .img-col.img-front .whole-img-wrapper').removeClass('disappear');
      }, 500);
      $(self).data('value', 'img-back');
    }
    else {
      $('#mobile-wrapper .img-wrapper .img-col.img-back .whole-img-wrapper ').removeClass('appear').addClass('disappear');
      setTimeout(function() {
        $('#mobile-wrapper .img-wrapper .img-col').hide();
        $('#mobile-wrapper .img-wrapper .img-col.img-front').show();
        $('#mobile-wrapper .img-wrapper .img-col.img-front .whole-img-wrapper ').removeClass('disappear').addClass('appear');
        $('#mobile-wrapper .img-wrapper .img-col.img-front .whole-img-wrapper svg.front.active').attr('class', 'front active');
        $('#mobile-wrapper .img-wrapper .img-col.img-back .whole-img-wrapper').removeClass('disappear');
      }, 500);
      $(self).data('value', 'img-front');
    }
  });

////////////// ----------------------------- /////////////////////

////////////// Action when user click previous design for front of clothing /////////////////////
  $('.img-front .prev-front').on('click', function() {
    var curIndex = $('.img-col svg.front.active').data('order');
    curIndex = parseInt(curIndex) + totalFrontGraphics;
    curIndex -= 1;
    var prevInd = curIndex % totalFrontGraphics;
    $('.img-front svg.front').attr('class', 'front slideToLeft');
    setTimeout(function() {
      $('.img-front svg.front').attr('class', 'front').hide();
      $('.img-col svg.front[data-order="' + prevInd + '"]').attr('class', 'front appearFromRight active').show();
      $('.front_graphic_type').val($('.img-col svg.front.active').data('value'));
    }, 500);
    $('.front_graphic_type').val($('.img-col svg.front.active').data('value'));
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user click next design for front of clothing /////////////////////
  $('.img-front .next-front').on('click', function() {
    var curIndex = $('.img-col svg.front.active').data('order');
    curIndex = parseInt(curIndex);
    curIndex += 1;
    var nextInd = curIndex % totalFrontGraphics;
    $('.img-front svg.front').attr('class', 'front slideToRight');
    setTimeout(function() {
      $('.img-front svg.front').attr('class', 'front').hide();
      $('.img-front svg.front[data-order="' + nextInd + '"]').attr('class', 'front appearFromLeft active').show();
      $('.front_graphic_type').val($('.img-col svg.front.active').data('value'));
    }, 500);

    $('.front_graphic_type').val($('.img-col svg.front.active').data('value'));
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user click previous design for back of clothing /////////////////////
  $('.img-back .prev-back').on('click', function() {
    var curIndex = $('.img-back svg.back.active').data('order');
    curIndex = parseInt(curIndex) + totalBackGraphics;
    curIndex -= 1;
    var prevInd = curIndex % totalBackGraphics;
    $('.img-back svg.back').attr('class', 'back slideToLeft');
    setTimeout(function() {
      $('.img-back svg.back').attr('class', 'back').hide();
      $('.img-back svg.back[data-order="' + prevInd + '"]').attr('class', 'back appearFromRight active').show();
      $('.back_graphic_type').val($('.img-col svg.back.active').data('value'));
    }, 500);

    $('.back_graphic_type').val($('.img-col svg.back.active').data('value'));
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user click next design for back of clothing /////////////////////
  $('.img-back .next-back').on('click', function() {
    var curIndex = $('.img-back svg.back.active').data('order');
    curIndex = parseInt(curIndex);
    curIndex += 1;
    var nextInd = curIndex % totalBackGraphics;
    $('.img-back svg.back').attr('class', 'back slideToRight');
    setTimeout(function() {
      $('.img-back svg.back').attr('class', 'back').hide();
      $('.img-back svg.back[data-order="' + nextInd + '"]').attr('class', 'back appearFromLeft active').show();
      $('.back_graphic_type').val($('.img-col svg.back.active').data('value'));
    }, 500);

    $('.back_graphic_type').val($('.img-col svg.back.active').data('value'));
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user sumit to buy /////////////////////
  $('form').on('submit', function(e) {
    e.preventDefault();
    $('body .loading-overlay').show();
    var $inputs = $(this).find(':input');
    var values = {};

    $inputs.each(function() {
      values[this.name] = $(this).val();
    });
    $.ajax({
      type: "POST",
      url: '/goToCheckout.php',
      data: {
        "clothing-type": values['clothing-type'],
        "clothing-size": values['clothing-size'],
        "clothing-color": values['clothing-color'],
        "front-graphic-type": values['front-graphic-type'],
        "back-graphic-type": values['back-graphic-type'],
        "graphic-color": values['graphic-color'],
      },
      success: function(json) {
        result = JSON.parse(json);
        if(result.success) {
          product = [];
          product['product_desc'] =result.product_desc;
          product['variant_id'] = result.variant_id;
          product['note'] = result.note;
          myCart.push(product);
          product_count = myCart.length;
          $('.cart-wrapper span.product-count').html(product_count);
          var item_html = create_product_item(product_count, result.product_desc, result.note);
          $('.cart-wrapper .product-list').append(item_html);
          $('body .loading-overlay').hide();
        }
        else {
          $('body .loading-overlay').hide();
        }
      },
    });
    return false;
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user add product to cart /////////////////////
  $('form .btn-buy-now').on('click', function(e) {
    var attached_variants = "";
    var attached_notes = "?note=";
    if(myCart.length < 1) {
      var $inputs = $('form').find(':input');
      var values = {};

      $inputs.each(function() {
        values[this.name] = $(this).val();
      });
      $.ajax({
        type: "POST",
        url: '/goToCheckout.php',
        data: {
          "clothing-type": values['clothing-type'],
          "clothing-size": values['clothing-size'],
          "clothing-color": values['clothing-color'],
          "front-graphic-type": values['front-graphic-type'],
          "back-graphic-type": values['back-graphic-type'],
          "graphic-color": values['graphic-color'],
        },
        success: function(json) {
          result = JSON.parse(json);
          if(result.success) {
            product = [];
            product['product_desc'] =result.product_desc;
            product['variant_id'] = result.variant_id;
            product['note'] = result.note;
            myCart.push(product);
            product_count = myCart.length;
            $('.cart-wrapper span.product-count').html(product_count);
            var item_html = create_product_item(product_count, result.product_desc, result.note);
            $('.cart-wrapper .product-list').append(item_html);

            $.each(myCart, function(key, value) {
              if(attached_variants != "") {
                attached_variants += "," + value['variant_id'] + ":1"
              }
              else {
                attached_variants += value['variant_id'] + ":1"
              }
              attached_notes += '- ' + value['product_desc'] + "%0A" + value['note'] + "%0A%0A";
            });
            var attached_param = attached_variants + attached_notes;
            console.log(url + attached_param);
            window.location.href = url + attached_param;

            $('body .loading-overlay').hide();
          }
          else {
            $('body .loading-overlay').hide();
          }
        },
      });
    }
    else {
      $.each(myCart, function(key, value) {
        if(attached_variants != "") {
          attached_variants += "," + value['variant_id'] + ":1"
        }
        else {
          attached_variants += value['variant_id'] + ":1"
        }
        attached_notes += '- ' + value['product_desc'] + "%0A" + value['note'] + "%0A%0A";
      });
      var attached_param = attached_variants + attached_notes;
      console.log(url + attached_param);
      window.location.href = url + attached_param;
    }
  });
////////////// ----------------------------- /////////////////////

////////////// Action when user remove product from cart /////////////////////
  $('.cart-wrapper .product-list').delegate('.cancel', 'click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).parent().toggleClass('open');
    self = this;
    var index = parseInt($(self).data('index'));
    myCart.splice(index - 1, 1);
    $(self).parent('li.product-item').remove();
    console.log(myCart);
    refresh_cart();
    return false;
  });
////////////// ----------------------------- /////////////////////


function create_product_item(id, title, note) {
    var html = '<li class="product-item"> <div class="row"> <div class="item-no-wrapper text-center"> <span class="item-no">' + id + '</span></div><div class="item-detail-wrapper"><p class="title">' + title + '</p><p class="note">' + note + '</p></div></div><span class="cancel" data-index="' + id + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="nc-icon outline" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)"><circle data-color="color-2" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="7" cy="21" r="2" stroke-linejoin="miter"/><circle data-color="color-2" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="19" cy="21" r="2" stroke-linejoin="miter"/><polyline data-cap="butt" fill="none" stroke="#444444" stroke-width="2" stroke-miterlimit="10" points="21.238,9.81 20,16 6,16 4,1   1,1 " stroke-linejoin="miter" stroke-linecap="butt"/><line data-cap="butt" fill="none" stroke="#444444" stroke-width="2" stroke-miterlimit="10" x1="4.667" y1="6" x2="13" y2="6" stroke-linejoin="miter" stroke-linecap="butt"/><circle data-color="color-2" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="18" cy="6" r="5" stroke-linejoin="miter"/><line data-color="color-2" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="16" y1="6" x2="20" y2="6" stroke-linejoin="miter"/></g></svg></span></li>';

    return html;
}

function refresh_cart() {
  product_count = myCart.length;
  $('.cart-wrapper span.product-count').html(product_count);
  $product_list = $('.cart-wrapper .product-list .product-item');
  $.each($product_list, function(key, value) {
    $(this).find('.item-no').html(key + 1);
    $(this).find('.cancel').data('index', key + 1);
  });
}

});

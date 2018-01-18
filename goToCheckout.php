<?php
  //Modify these
  $API_KEY = '6cba64e1bf63ce0717519fa6837eab7f';
  $SECRET = 'e26216a876b2b56c65dce89926bfd0ec';
  $TOKEN = 'your-secret-here';
  $PASSWORD = '047998c9d50e36c0cdd004275242f27a';
  $STORE_URL = 'chancequick2.myshopify.com';
  $PRODUCT_ID = 'product-id-here';

// ////////////////////////// Get Shop ID //////////////////////////
// $url = 'https://' . $API_KEY . ':' . $PASSWORD . '@' . $STORE_URL . '/admin/shop.json';
// // $url = 'https://7bdc30c85c7e3f339d4853ad3ba267e9:a7f222f335d428d8b9c47766e6d41de9@illroots.myshopify.com/admin/shop.json';
// $session = curl_init();
//
// curl_setopt($session, CURLOPT_URL, $url);
// curl_setopt($session, CURLOPT_HTTPGET, 1);
// curl_setopt($session, CURLOPT_HEADER, false);
// curl_setopt($session, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
// curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
//
// if(ereg("^(https)",$url)) curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);
//
// $response = curl_exec($session);
//
// $shop = json_decode($response);
// $shop_id = $shop->shop->id;
// // echo "**********Shop ID is *******" . $shop_id;
// curl_close($session);
// ////////////////////// ----------------------- ////////////////////////////


  $result = array();
  $url = 'https://' . $API_KEY . ':' . $PASSWORD . '@' . $STORE_URL . '/admin/products.json?product_type';
  $session = curl_init();

  curl_setopt($session, CURLOPT_URL, $url);
  curl_setopt($session, CURLOPT_HTTPGET, 1);
  curl_setopt($session, CURLOPT_HEADER, false);
  curl_setopt($session, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

  if(ereg("^(https)",$url)) curl_setopt($session,CURLOPT_SSL_VERIFYPEER,false);

  $response = curl_exec($session);

  $products_all = json_decode($response);
  $products = $products_all->products;
  //
  $product_pair = [];
  foreach ($products as $key => $product) {
      // $array = get_object_vars($products_all[$key]);
      // print_r($product->product_type);
      $product_title = $product->title;
      $product_type = strtolower($product->product_type);
      $product_pair[$product_type] = [];
      $product_variants = $product->variants;
      $temp = [];
      foreach($product_variants as $variant) {
        $temp['product_title'] = $product_title;
        $temp['product_type'] = $product_type;
        $temp['option1'] =  $variant->option1;
        if($product_type != 'hat') {
          $temp['option2'] = $variant->option2;
        }
        $temp['variant_id'] = $variant->id;
        $product_pair[$product_type][] = $temp;
      }
      // $products[] = $product->product_type;
  }
  curl_close($session);

  $clothing_type = $_POST["clothing-type"];
  $clothing_color = $_POST["clothing-color"];
  $clothing_size = $_POST["clothing-size"];
  $front_graphic_type = $_POST["front-graphic-type"];
  $back_graphic_type = $_POST["back-graphic-type"];
  $graphic_color = $_POST["graphic-color"];

  $current_variant_id = '';
  if(!isset($product_pair[$clothing_type])) {
    $result['success'] = 0;
    print_r(json_encode($result));
    exit;
  }

  $current_prdouct_color = $current_product_size = $current_product_title = $current_product_type = "";

  foreach($product_pair[$clothing_type] as $item) {
    if($clothing_type != 'hat') {
      $option1 = str_replace(' ', '', $item['option1']);
      $option2 = str_replace(' ', '', $item['option2']);
      if (strtolower($option1) == strtolower($clothing_size) && strtolower($option2) == strtolower($clothing_color)) {
        $current_variant_id = $item['variant_id'];
        $current_product_title = $item['product_title'];
        $current_product_type = $item['product_type'];
        $current_product_size = $item['option1'];
        $current_product_color = " / " . $item['option2'];
        break;
      }
    }
    else {
      $option1 = str_replace(' ', '', $item['option1']);
      if (strtolower($option1) == strtolower($clothing_color)) {
        $current_variant_id = $item['variant_id'];
        $current_product_title = $item['product_title'];
        $current_product_type = $item['product_type'];
        $current_product_color = $item['option1'];
        break;
      }
    }
  }

  if($current_variant_id == '') {
    $result['success'] = 0;
    print_r(json_encode($result));
    exit;
  }

  ////////////////////////// Get Shop ID //////////////////////////
  $note = "Design Color: " . $graphic_color . ", Front Design: " . $front_graphic_type . ", Back Design: " . $back_graphic_type;
  if($front_graphic_type == "Blank" && $back_graphic_type == "Blank") {
    $note = "Front Design: " . $front_graphic_type . ", Back Design: " . $back_graphic_type;
  }
  if($clothing_type == 'hat') {
    $note = "Design Color: " . $graphic_color;
  }
  $product_desc = $current_product_title . " (" . $current_product_size . $current_product_color . ")";
  // $redirect_url = 'https://' . $STORE_URL . '/cart/' . $current_variant_id . ":1?" . $note;
  $result['success'] = 1;
  $result['product_desc'] = $product_desc;
  $result['variant_id'] = $current_variant_id;
  $result['note'] = $note;
  print_r(json_encode($result));
  ////////////////////// ----------------------- ////////////////////////////
?>

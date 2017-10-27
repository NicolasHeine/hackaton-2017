/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    var boissons = window.localStorage.getItem("boissons");
    if(!boissons){
      var that = this;
      this.loadDrink().then(function(boissons){
        that.boissons = JSON.stringify(boissons);
        that.displayDrink();
      });
    }else{
      this.boissons = boissons;
      this.displayDrink();
    }
    this.listEvent();
  },

  loadDrink: function(){
    return $.getJSON("data/boissons.json", function(json) {
      window.localStorage.setItem("boissons", JSON.stringify(json));
      return JSON.stringify(json);
    });
  },

  displayDrink: function(){
    var boissons = JSON.parse(""+this.boissons+"");
    var fav = window.localStorage.getItem('fav');
    var favs;
    if(fav){
      favs = JSON.parse(""+fav+"").fav;
    }
    var coffee = boissons.coffee;
    var chocolat = boissons.chocolat;
    var the = boissons.the;
    if(favs){
      $('#home').append('<div id="fav"><h2>Mes préférences</h2><div class="list"></div></div>');
      for(var h = 0; h < favs.length; h++) {
        $('#fav .list').append("<div class='item item-pref' data-price='"+favs[h].prix+"' data-sucre='"+favs[h].sucre+"' data-soja='"+favs[h].soja+"' data-amande='"+favs[h].amande+"' data-coco='"+favs[h].coco+"' data-nuage='"+favs[h].nuage+"' data-chantilly='"+favs[h].chantilly+"' data-cacao='"+favs[h].cacao+"' data-noisette='"+favs[h].noisette+"' data-choco='"+favs[h].choco+"'><img src='"+favs[h].img+"'></div>");
      }
    }
    if(coffee){
      $('#home').append('<div id="coffee"><h2>Les cafés</h2><div class="list"></div></div>');
      for(var i = 0; i < coffee.length; i++) {
        $('#coffee .list').append("<div class='item' data-price='"+coffee[i].prix+"' data-name='"+coffee[i].name+"'><img src='"+coffee[i].img+"'></div>");
      }
    }
    if(chocolat){
      $('#home').append('<div id="chocolat"><h2>Les chocolats</h2><div class="list"></div></div>');
      for(var j = 0; j < chocolat.length; j++) {
        $('#chocolat .list').append("<div class='item' data-price='"+chocolat[j].prix+"' data-name='"+chocolat[j].name+"'><img src='"+chocolat[j].img+"'></div>");
      }
    }
    if(the){
      $('#home').append('<div id="the"><h2>Les thés</h2><div class="list"></div></div>');
      for(var k = 0; k < the.length; k++) {
        $('#the .list').append("<div class='item' data-price='"+the[k].prix+"' data-name='"+the[k].name+"'><img src='"+the[k].img+"'></div>");
      }
    }
  },

  listEvent: function(){
    var body = $('body');
    body.on('click', 'a', function(e){
      e.preventDefault();
      id = $(this).attr('href');
      $('.block').removeClass('active');
      $(''+id+'').addClass('active');
      if(id === '#home'){
        $('.retour').addClass('hide');
      }else{
        $('.retour').removeClass('hide');
      }
    })

    body.on('click', '#home .item:not(.item-pref)', function(){
      $('.img-produit').attr("src", "img/fav.png");
      var img = $('img', $(this)).attr('src');
      var price = $(this).attr('data-price');
      $('.retour').removeClass('hide');
      $('.container-rond .rond').removeClass('active');
      $('input#sucre').val(0);
      $('#detail .prix').text(price);
      $('#detail .img .img-produit').attr('src', img);
      $('.block').removeClass('active');
      $('#detail').addClass('active');
      $('input[type="checkbox"]').prop('checked', false);
    })

    body.on('click', '#home .item-pref', function(){
      $('input[type="checkbox"]').prop('checked', false);
      $('.add-to-fav img').attr("src", "img/fav-marron.png");
      $('#sucre').val($(this).attr('data-sucre'));
      $('.prix').text($(this).attr('data-price'));
      if($(this).attr('data-soja') === '1'){
        $('#soja').prop('checked', true);
      }
      if($(this).attr('data-amande') === '1'){
        $('#amande').prop('checked', true);
      }
      if($(this).attr('data-coco') === '1'){
        $('#coco').prop('checked', true);
      }
      if($(this).attr('data-nuage') === '1'){
        $('#nuage').prop('checked', true);
      }
      if($(this).attr('data-chantilly') === '1'){
        $('#chantilly').prop('checked', true);
      }
      if($(this).attr('data-cacao') === '1'){
        $('#cacao').prop('checked', true);
      }
      if($(this).attr('data-noisette') === '1'){
        $('#noisette').prop('checked', true);
      }
      if($(this).attr('data-choco') === '1'){
        $('#choco').prop('checked', true);
      }

      $('#detail .img .img-produit').attr('src', $('img', $(this)).attr('src'));
      $('.retour').removeClass('hide');
      $('.container-rond .rond').removeClass('active');
      $('.block').removeClass('active');
      $('#detail').addClass('active');
      for(var i = 0; i <= $(this).attr('data-sucre'); i++){
        $('.rond:nth-child('+i+')').addClass('active');
      }
    })

    body.on('click', '.container-rond .moins', function(){
      var val = $('input#sucre').val();
      if(val !== 0){
        $('.container-rond .rond:nth-child('+val+')').removeClass('active');
        val--;
        $('input#sucre').val(val);
      }
    })

    body.on('click', '.container-rond .plus', function(){
      var val = $('input#sucre').val();
      if(val !== 7){
        val++;
        $('.container-rond .rond:nth-child('+val+')').addClass('active');
        $('input#sucre').val(val);
      }
    })

    var that = this;
    body.on('click', '.add-to-fav', function(){
      var info = {
        'img': $('.img-produit').attr('src')
      }
      info.sucre = $('#sucre').val();
      info.prix = $('.prix').text();
      if($('#soja').is(':checked')){
        info.soja = 1;
      }
      if($('#amande').is(':checked')){
        info.amande = 1;
      }
      if($('#coco').is(':checked')){
        info.coco = 1;
      }
      if($('#nuage').is(':checked')){
        info.nuage = 1;
      }
      if($('#chantilly').is(':checked')){
        info.chantilly = 1;
      }
      if($('#cacao').is(':checked')){
        info.cacao = 1;
      }
      if($('#noisette').is(':checked')){
        info.noisette = 1;
      }
      if($('#choco').is(':checked')){
        info.choco = 1;
      }
      var fav = window.localStorage.getItem('fav');
      if(fav){
        var favs = JSON.parse(""+fav+"");
        favs.fav.push(info);
        window.localStorage.setItem("fav", JSON.stringify(favs));
      }else{
        var all_fav = {
          'fav': [info]
        }
        window.localStorage.setItem("fav", JSON.stringify(all_fav));
      }
      $('#home').empty();
      that.displayDrink();
      $('.retour a').click();
    })
  }
};

app.initialize();
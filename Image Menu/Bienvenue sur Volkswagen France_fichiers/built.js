/**** Animations *********/
function Animation(element)
{
    this.element = element;
}

Animation.prototype = {
    constructor: Animation,
    appear : function()
    {
        this.element.each(function(index){
           var $el = $(this); 
           setTimeout(function(){
               $el.addClass('animated');
           }, index * 100);
        });
        
        this.focus();
    },
    
    focus : function()
    {
        this.element.hover(function(e){
            this.element.addClass('unfocus');
            $(e.currentTarget).removeClass('unfocus');
        }.bind(this), function(){
            this.element.removeClass('unfocus');
        }.bind(this));
    },
    
    fishEye : function()
    {
        this.element.hover(function(e){
            this.element.removeClass('prev');
            $(e.currentTarget).prev().addClass('prev');
        }.bind(this), function(){
            this.element.removeClass('prev');
        }.bind(this));
    }
};;/**** Gallery *********/
function Gallery(element, slider, closeButton)
{
    this.element = element;
    this.slider = slider;
    this.closeButton = closeButton;
}

Gallery.prototype = {
    constructor: Gallery,
    render: function()
    {
        var $items = this.element.find('.item');
        var index = 0;
        var $openedElement = null;
        var $zoom = $('#item-zoom');
        var remove = false;

        $items.click(function(e){
            var galleryHeight = this.element.parent().height();
            var galleryWidth = this.element.parent().width();
            if( ( galleryHeight * 1.8 ) < galleryWidth ){
                this.element.parent().stop().animate({height : galleryHeight * 1.8}, 300);
            } else {
                this.element.parent().height(galleryHeight);
            }
            
            var $target = $(e.currentTarget);
            //var targetImgSrc = this.getNewSizeImage($target.data('zoom-src'));
            var targetImgSrc = $target.find('img').attr('src');
            
            
            //launch zoom
            this.launchZoom($zoom, $target, targetImgSrc);
            

            if($target.hasClass('item-iframe')){
               
               this.element.after('<div id="iframe"><iframe src="' + $(e.currentTarget).data('src') + '"></iframe></div>');
               
               $openedElement = $('#iframe');
               $openedElement.delay(1200).fadeIn();
               
               remove = true;
                
            } else {
                $openedElement = this.slider;
                remove = false;
                index = parseInt($items.index(e.currentTarget));
                
                this.element.prev().find('.slider-params').delay(900).fadeIn(500);
                
                this.slider.slick('slickGoTo', index);
                this.slider.addClass('visible');
                setTimeout(function(){
                    this.slider.addClass('anim');
                }.bind(this), 1200);
                
                if(this.element.prev().find('.slider-params').length){
                    var $nb =  this.element.prev().find('.nb-imgs span');
                    $nb.text(index+1);
                    this.slider.on('afterChange', function(event, slick, currentSlide){
                        $nb.text(currentSlide+1);
                    });
                }
                
                
            }
            
            this.element.prev().find('.icon-cross').delay(300).fadeIn(500);
            
            this.element.fadeOut(500);

            // Tracking Google Analytics on the products pages
            VW.Trackers.sendGAEvent({'category': 'Galerie', 'action': 'Clique sur l\'image', 'label': $(e.currentTarget).data('product-shortname'), 'value': null});
            
            return false;
        }.bind(this));
        
        this.closeButton.click(function(){
            this.close(remove, $openedElement);
        }.bind(this));
        
        
    },
    close: function(remove, openedElement)
    {
        
        this.element.css({position : 'relative'});

        openedElement.fadeOut(500, function(){
            if(remove) openedElement.remove();
            
            this.element.prev().find('.slider-params, .icon-cross').fadeOut(300);
            this.element.fadeIn(300);
            
            this.slider.removeClass('anim visible').css({display: 'block'});
        }.bind(this));
        
    },
    getNewSizeImage: function(str)
    {
        if(str.indexOf('.jpg'))
            str = str.replace('.jpg', '-630x315.jpg');
        else if(str.indexOf('.png'))
            str = str.replace('.png', '-630x315.png');
        
        return str;
    },
    launchZoom: function($zoom, $target, targetImgSrc)
    {
        var scrollTo = this.element.offset().top - 90;
        
        $zoom
            .html('<img src="' + targetImgSrc + '" alt="" />')
            .css({
                top:    $target.position().top + 52,
                left:   $target.position().left,
                width:  $target.width()
            });
            
        setTimeout(function(){
            $zoom.addClass('anim');
            if($target.hasClass('item-iframe')){
                $zoom.addClass('opacity');
            }
        }, 200);
        
        setTimeout(function(){
           $zoom.empty().removeAttr('style').removeClass('anim opacity');
           this.element.css({position : 'absolute'});
           this.element.parent().height('auto');
           
           
           $('html, body').animate({
                scrollTop: scrollTo
            }, 300);
          
        }.bind(this), 1200);
        
        
    }
};;/** Sliders **/
function Slider(element)
{
    this.element = element;
}

Slider.prototype = {
    constructor: Slider,
    render: function()
    {
      this.element.slick({
          customPaging: function(slick, i) {
             if(slick.$slider.parent().hasClass('block-thumbnail-slider')){
                return slick.$slides.eq(i).find('.thumbnail').html();
             } else {
                return '<button type="button" data-role="none">' + (i + 1) + '</button>';
             }
          }
      }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
          if(slick.$slider.parents('.block-strength').length){
            setTimeout(function(){ slick.$slides.removeClass('slick-active'); }, 50);
          }
          if(slick.$slider.parents('.block-thumbnail-slider').length){
            var currentVideo = slick.$slides.eq(currentSlide).find('video');
            if(currentVideo.length) currentVideo.get(0).pause();
          }
      }).on('afterChange', function(event, slick, currentSlide){
          if(slick.$slider.parents('.block-strength').length){
            setTimeout(function(){ slick.$slides.eq(currentSlide).addClass('slick-active'); }, 250);
          }
          if(slick.$slider.parents('.block-thumbnail-slider').length){
            var currentVideo =  slick.$slides.eq(currentSlide).find('video');
            if(currentVideo.length)
                currentVideo.get(0).play();
          }
      });
      
      if(this.element.parent().hasClass('block-thumbnail-slider')){
          new Animation(this.element.find('.slick-dots li')).fishEye();
      }
      
    }
};;/**** Utils *********/
function Utils(element, options)
{
    this.element = element;
    this.defaultOptions = {followNav: false, offsetAffix: 0};
    this.options = $.extend({},  this.defaultOptions, options);
}

Utils.prototype = {
    constructor: Utils,
    smoothScroll: function()
    {
        this.element.click(function(){
            var hash = this.hash;
            var isGATrack = $(this).hasClass("gatrack");
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 30
            }, 300, function(){
                //window.location.hash = hash;
            });

            if (isGATrack) {
                VW.Trackers.sendGAEvent($(this).data('gatracking'));
            }
            
            return false;
        });
    },
    affix: function()
    {
        
        var $el = this.element;
        var options = this.options;
        
        $el.affix({
          offset: {
            top: function () {
              return (this.top = $el.offset().top - options.offsetAffix);
            }
          }
        });
        
        if(options.followNav){
            $('body').scrollspy({ target: '#'+ this.element.attr('id'), offset : 100 });
        }
    }
};;'use strict';

/**
 * This file handles the various tracking processes (i.e. Google Analytics)
 *
 * Some other GA tracking needed to be implemented inside their respective JS files
 * See Utils.js & Gallery.js for more informations (tracking for Product quick menu & Clic on the the product gallery)
 * (search "VW.Trackers" inside those)
 *
 */

if (typeof window.VW === 'undefined') {
  window.VW = window.VW || {};
}

VW.Trackers = {};
VW.Trackers.initialize = function () {

  $(document.body)
    .on('click', '[data-gatracking]', VW.Trackers.sendGAEvent)
    .on('beforeChange', '[data-gatracking-slideshow]', VW.Trackers.sendGAEventSlideshow)
    .on('click', '[data-gatracking-gamme-external]', VW.Trackers.trackGammeExternal)
    .on('click', '[data-gatracking-product-offers] a', VW.Trackers.trackProductOffersButton)
    .on('click', '[data-gatracking-product-focus]', VW.Trackers.trackProductFocus)
    .on('click', '[data-gatracking-slideshow]', VW.Trackers.trackHomeSlideShow)
}

/**
 * Google Analytics: Send Event
 */
VW.Trackers.sendGAEvent = function (event) {
  var $trackingData = {
    category: null,
    action: null,
    label: null,
    value: null
  };
  var $data;
  if (typeof event.category !== 'undefined') {
    $data = event;
  } else {
    $data = $(this).data('gatracking');
  }

  $.extend($trackingData, $data);
  ga('send', 'event', $trackingData.category, $trackingData.action, $trackingData.label, $trackingData.value);

};

/**
 * Google Analytics: Send Event (Slideshows)
 */
VW.Trackers.sendGAEventSlideshow = function (event, slick, currentSlide, nextSlide) {

  var $trackingData = {
    category: null,
    action: null,
    label: null,
    value: null
  };

  var $data;

  if (typeof event.category !== 'undefined') {
    $data = event;
  } else {
    $data = $(this).data('gatracking-slideshow');
  }

  // slide number of the carousel
  //(lenght - 2 because we need to substract cloned slides from the infinite slide functionality)
  $count = $(this).find('.slick-slide').length - 2;

  // right arrow when at the end
  if (currentSlide == parseInt($count-1) && nextSlide == 0) {
    $action = 'Flèche droite';
  }
  // left arrow when at the beginning
  else if (currentSlide == 0 && nextSlide == parseInt($count-1)) {
    $action = 'Flèche gauche';
  }
  // other cases
  else{
    if ( currentSlide < nextSlide) {
      $action = 'Flèche droite';
    }
    else {
      $action = 'Flèche gauche';
    }
  }

  // resetting the action label so that they don't concatenate on every event
  if ($data.category && $(this).data('tracking-category')) {
    $cat = $(this).data('tracking-category');
    $data.action = $cat + ' : ' + $action;
  }
  else {
    $data.action = $action;
  }

  $.extend($trackingData, $data);
  ga('send', 'event', $trackingData.category, $trackingData.action, $trackingData.label, $trackingData.value);

};

/**
 * Track Gamme External Url
 */
VW.Trackers.trackGammeExternal = function (event) {

  $category = 'Modèle';
  $action = 'Sortie ' + $(this).attr('href');
  $label = 'Gamme';

  var $trackingData = {
    category: $category,
    action: $action,
    label: $label,
    value: null
  };

  ga('send', 'event', $trackingData.category, $trackingData.action, $trackingData.label, $trackingData.value);

};

/**
* Track Product Offers Buttons
*/
VW.Trackers.trackProductOffersButton = function (event) {

  $productSn = $(this).data('product-shortname');
  $category = 'Offres';
  $action = $(this).data('offer-type');

  var $trackingData = {
    category: $category,
    action: 'Sortie ' + $action,
    label: $productSn,
    value: null
  };

  ga('send', 'event', $trackingData.category, $trackingData.action, $trackingData.label, $trackingData.value);

};

/**
* Track Product Focus
*/
VW.Trackers.trackProductFocus = function (event) {

  $productSn = $(this).data('product-shortname');
  $category = 'Focus sur...';
  $action = $(this).data('focus-title');

  var $trackingData = {
    category: $category,
    action: 'Sortie ' + $action,
    label: $productSn,
    value: null
  };

  ga('send', 'event', $trackingData.category, $trackingData.action, $trackingData.label, $trackingData.value);

};

/**
 * Track Home Slideshow Arrows
 */
VW.Trackers.trackHomeSlideShow = function (event) {

};

$(VW.Trackers.initialize);
;$(document).ready(function(){
  
  //Header
  $('.vwd4_m500 .vwd4_m51x').hover(function(){
     $(this).find('.vwd4_m51x_flyout').stop().slideToggle(200);
  });
  
  //Slider
  new Slider($('.block-slider .slider, .assets-carousel')).render();
  
  //Animations 
  new Animation($('.block-gamme.block-slider .slick-slide')).focus();
  new Animation($('.block-offer .offer-detail .category span')).focus();
  
  //Smoothscroll
  new Utils($('.navigation a[href^="#"]')).smoothScroll();
  
  //Gallery
  new Gallery($('.gallery'), $('#media .slider'), $('#media .icon-cross')).render();
  
  
});

$(window).load(function(){
  // Affix
  new Utils($('#product-navigation'), {followNav: true}).affix();
  $('.menu-affix').each(function(){
      new Utils($(this), {offsetAffix: 50}).affix();
  });

  // Apply the same height to the services blocks on the homepage
  var $slidesServices = $('.block-slides-services .inner-col-sav');
  var length = $slidesServices.length;
  setTimeout(function(){
    if(length > 0) {
      for ( var i = 0; i < length; ++i ) {
        $slide = $slidesServices[i];
        if (i%2 == 0) {
          // hauteur max de la ligne
          var maxhTemp = $($slide).height();
        }
        else {
          $slideInf = $slidesServices[i-1];
          if ($($slide).height() > maxhTemp) {
            $($slideInf).height($($slide).height());
          }
          else {
            $($slide).height(maxhTemp);
          }
        }
      }
    }
  }, 500);
  
});

$(window).scroll(function(){

    // Cache chaque menu de navigation encré dans la page s'il n'est pas le dernier menu encré
    // (pour éviter que le bandeau 'Point forts' pas au dessus de celui de la galerie par hasard)
    if ($('.menu-affix.navigation')) {
      $('.menu-affix.navigation.affix-top').css('visibility', 'visible');
      $('.menu-affix.navigation.affix').css('visibility', 'hidden');
      $('.menu-affix.navigation.affix').last().css('visibility', 'visible');
    }

    if ($('.block-gamme-all .row-inline > li').length > 0) {
      var rect = $('.block-gamme-all .row-inline > li')[0].getBoundingClientRect();
      if(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() && 
        rect.right <= $(window).width()
    
      ){
        $(document).trigger('appearInViewport');
      }
    }

    if($('#description').length > 0) {
      // Apparition et disparition du premier li de la barre de navigation des pages produits
      var scrolltop = $(this).scrollTop();
      var litokill = $('#product-navigation.navigation .nav li:first-child');
      var descofftop = $('#description').offset().top;
      var offset = 23;

      if(litokill) {
        if(scrolltop + offset <= descofftop) {
          litokill.css('display', 'none');
        }
        else {
          litokill.css('display', 'block');
        }
      }
    }

    //FEATURES : animations au scroll sur la position (pages produits)
    var $strengthBlocks = $('#features .block-strength');

    $.each($strengthBlocks, function(k, bloc) {
      $bloc = $(bloc);
      $blocOffset = $bloc.offset().top; // top position of the bloc
      $halfHeight = $bloc.height() / 2; // half height of the bloc
      $halfWindowHeight = $(window).height() / 2;
      $blocTitle = $bloc.find('h3'); // targets the inner h3 element
      $blocBck = $bloc.find('.row-inline'); // targets block with background picture
      $scrollTop = $(window).scrollTop() + $halfWindowHeight + 50 ; // position of the middle of the screen
      $blocImgBck = $bloc.find('div.row-inline'); // targets the bloc which manages the background-image
      $maxMargin = 200; // maximum margin (right or left) to apply
      $animationStart = $blocOffset - $halfWindowHeight/2; // position of the beginning of the animation range
      $animationEnd = $blocOffset + 2*$halfHeight + $halfWindowHeight/2; // position of the end of the animation range
      $animationRange = $animationEnd - $animationStart; // size of the animation range
      $middleAnimation = $animationEnd - ($animationRange / 2); // position of the center of the animation range
      $maxBckIncrease = 3; // max percent of bck size increase
      $bckSize = 100;

      // we enter in the animation range
      if ($scrollTop > $animationStart
        && $scrollTop < $animationEnd) {
        
        // superior part of the animation
        if ($scrollTop <= $middleAnimation) {
          // distance between the actual position an the middle of the animation range
          $startDist = $middleAnimation - $scrollTop;
          // percent to apply to the css properties
          $percent = ( $startDist / ($animationRange/2) );
          $bckIncrease = $bckSize + $maxBckIncrease*(1-$percent);
          $blocTitle.css('opacity', 1-$percent);
          $blocBck.css('background-size', 'auto '+ $bckIncrease +'%');
          /*if ($blocTitle.hasClass('text-left')) {
            $blocTitle.css('margin-right', $maxMargin*(1-$percent)+'px');
          }
          else {
            $blocTitle.css('margin-left', $maxMargin*(1-$percent)+'px');
          }*/
        }
        // inferior part of the animation
        else {
          //distance between the actual position and the end of the animation range
          $startDist = $animationEnd - $scrollTop;
          // percent to apply to the css properties
          $percent = ( $startDist / ($animationRange/2) );
          $bckIncrease = $bckSize + $maxBckIncrease*$percent;
          $blocBck.css('background-size', 'auto '+ $bckIncrease +'%');
          $blocTitle.css('opacity', $percent);
          /*if ($blocTitle.hasClass('text-left')) {
            $blocTitle.css('margin-right', $maxMargin*($percent)+'px');
          }
          else {
            $blocTitle.css('margin-left', $maxMargin*($percent)+'px');
          }*/
        }
      }
    });
});

$(document).one('appearInViewport', function(){
    //Animations
    var gamme = new Animation($('.block-gamme-all .row-inline > li')).appear();
});

$(document).ready(function(){

  // Apply colors to the services block of the homepage
  var $buttons = $('.block-slides-services .btn.btn-primary');

  $.each($buttons, function (k, button) {
    var $button = $(button);
    
    var styles = {
      background: $button.attr('bck'),
      color: $button.attr('font')
    };

    if (styles.color !== null && styles.background !== null) {
      $button.css({
        'color': '#' + styles.color,
        'border-color': '#' + styles.background,
        'background-color': '#' + styles.background
      });
      $button.find('.btn-triangle-before').css({'border-left-color': '#' + styles.color});

      $button.hover(
        function() {
          $button.css({
            'color': '#333',
            'background-color': '#fff',
            'border-color': '#333'
          });
          $button.find('.btn-triangle-before').css({'border-left-color': '#333'});
        },
        function() {
          $button.css({
            'color': '#' + styles.color,
            'border-color': '#' + styles.background,
            'background-color': '#' + styles.background
          });
          $button.find('.btn-triangle-before').css({'border-left-color': '#' + styles.color});
        }
      );
    }
  });

  // FOCUS : append iframe in gallery
  $('#focus .item-iframe').click(function(e){

    var $target = $(e.currentTarget);

    var $url = $target.attr('data-src');
    var $gallery = $('#focus .focus-gallery');

    $gallery.append('<iframe src="' + $url + '"></iframe>');

    $('#focus .slider').fadeOut(500);
    $gallery.fadeIn(100);

    return false;
  });

  // FOCUS : remove iframe and display the focus carousel
  $('#focus .focus-gallery .icon-cross').click(function(){

    var $gallery = $('#focus .focus-gallery');
    var $iframe = $('#focus .focus-gallery iframe');

    $gallery.fadeOut(500);
    $('#focus .slider').fadeIn(100);

    $iframe.remove();

  });

  // launch the animation (product > features)
  $(window).scroll();

  //click on the filters buttons
  $('.catbtn').on('click', function(e) {

    $catbtn = $(this);
    $filterType = $catbtn.data('filter-type');
    $img = $catbtn.find('img');
    $catname = $img.data('catname')
    $btn = $(this);

    // switching icone src
    if ($btn.hasClass('selected')) {
      $btn.removeClass('selected');
      $img.attr('src', '/assets/img/gamme/icones/' + $catname + '-normal.png');
    }
    else {
      $btn.addClass('selected');
      $img.attr('src', '/assets/img/gamme/icones/' + $catname + '-selected.png');
    }

    //we need to retrieve every piece of filter selected
    $filters = {
      'category' : [],
      'engine' : [],
      'doors' : []
    }

    //category filters
    $('#filters-category .catbtn.selected').each(function() {
      $block = $(this);
      $catname = $block.find('img').data('catname');
      $filters.category.push($catname);
    });

    //engine filters
    $('#filters-engine .catbtn.selected').each(function() {
      $block = $(this);
      $catname = $block.find('img').data('catname');
      $filters.engine.push($catname);
    });

    // doors filters
    $('#filters-doors .catbtn.selected').each(function() {
      $block = $(this);
      $catname = $block.find('img').data('catname');
      $filters.doors.push($catname);
    });

    // Async request
    $.ajax({
        method: 'post',
        url: '/gamme/filter',
        data: $filters,
        async: true,
        dataType: 'html',
        success: function(data) {
          // if some filter buttons are selected
          if ($filters.category.length > 0 || $filters.engine.length > 0 || $filters.doors.length > 0) {
            $action = '';
            $category = 'Filtre';
            $label = 'Gamme';
            $value = $(data).find('.vehicle').length;
            if ($filterType == 'category') {
              $action += 'Catégorie : ';
              for(var key in $filters.category) {
                if (key == 0) {
                  $action += $filters.category[key];
                }
                else {
                  $action += ' / ' + $filters.category[key];
                }
              }
            }
            else if ($filterType == 'engine') {
              $action += 'Motorisations : ';
              for(var key in $filters.engine) {
                if (key == 0) {
                  $action += $filters.engine[key];
                }
                else {
                  $action += ' / ' + $filters.engine[key];
                }
              }
            }
            else if ($filterType == 'doors') {
              $action += 'Portes : ';
              for(var key in $filters.doors) {
                if (key == 0) {
                  $action += $filters.doors[key];
                }
                else {
                  $action += ' / ' + $filters.doors[key];
                }
              }
            }

            VW.Trackers.sendGAEvent({
              category: $category,
              action: $action,
              label: $label,
              value: $value
            });

          }

          $list = $('#gamme-list');

          $dotsAnimation = $('.loading-circles');

          $dotsAnimation.stop().animate({
            opacity: 1,
            height: 45
          }, 400, function() {
            setTimeout(function() {
              $list.fadeOut(400);
              setTimeout(function() {
                $list.html(data);
                $list.fadeIn(200);
              }, 400);
              $dotsAnimation.stop().animate({
                opacity: 0,
                height: 0
              }, 400);
            }, 700);
          });

        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
        }
    });

  });

  // delete the border of the last feature block (product pages)
  $('.block-strength').last().css('border', 0);

});

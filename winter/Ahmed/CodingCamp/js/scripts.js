/*!
 * Bokeh Template (http://themeforest.net/users/imangm)
 * Copyright 2014 ImanGM
 */
 
var $ = jQuery.noConflict();
$(window).bind('resize', function($){
	build_header();
	init_popover();
	fit_ajaxloader();
});

$(window).load(function() {
	$('.loading-content').fadeOut();
	fit_ajaxloader();
	adjust_puzzle_size();
});

$(document).ready(function($) {
	"use strict";

	init_testimonials();
	init_clients_carousel();
	init_portfolio_isotope();
	init_portfolio_carousel();
	init_image_slider();
	init_magnific_popup();
	if( !/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) { init_animated_effects() }
	init_fitvids();
	init_popover();

	if ( $('#map_canvas').length ) {
		google.maps.event.addDomListener(window, 'load', init_googlemap);
	}
	init_postSlider();
	init_back2Top();
	init_tooltips();
	
	
	/*-------------------------------------------------*/
	/* =  Responsive Menu Init
	/*-------------------------------------------------*/	

	// var $wrapper = $('body #page-content'),
	var $wrapper = $('body > .container'),
	nav = $('.mobile-nav').length ? $('.mobile-nav').removeClass('hidden') : $('#main-menu > .menu-container').clone(true, true).attr('id', '').addClass('mobile-nav').removeClass('nav dropdown');
	
	$wrapper.wrap('<div class="mp-container" />');
	$wrapper.wrap('<div class="mp-pusher" id="mp-pusher" />');
	$wrapper.wrap('<div class="scroller" />');
	$wrapper.wrap('<div class="scroller-inner" />');

	$('#mp-pusher').prepend('<nav id="mp-menu" class="mp-menu" />');

	$('nav.mp-menu').append( nav );

	$('nav#mp-menu').find('.menu-container').each( function() {
		$(this).addClass('mp-level');
	}),
	$('nav#mp-menu').find('.mp-level').each( function() {
		$(this).removeClass('menu-container');
	});
	new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
	
	
	
	/*-------------------------------------------------*/
	/* =  Puzzle Square Size
	/*-------------------------------------------------*/
	
	var minumumHeight = $(window).height();
	$('#ajax-container').css({'min-height':minumumHeight});
	
	var itemWidth = $('.flip-item').width();
	var delay = 80;
	var counter = 0;
	$('.flip-item').each(function() {
	
		// Set Section and Items Height to Make Them Square
		counter++;
		var current_item = $(this);
		$(this).animate({'min-height':itemWidth*0.9}, 'slow', function() {
			var ajaxContainerHeight = $('#ajax-loader').height();
			$('#ajax-container').css({'min-height':ajaxContainerHeight});		
		});
		
		// Give a random color to each element
		// var randomColor = true; // randomColor and randomHue are defined in random[Color].js
		if ( randomColor ) {
			jQuery('.flip-content.iconned').each( function() {
				var randomX = Math.random();
				// Math.floor ( [Level of Change] x random ) Base Color
				
				if ( randomHue == 'red' ) {
					// Red
					var rhue = Math.floor( 45*randomX ) + 158; var ghue = Math.floor( 30*randomX ) + 0; var bhue = Math.floor( 40*randomX ) + 71; 
				} else if ( randomHue == 'green' ) {
					// Green
					var rhue = Math.floor( 75*randomX ) + 15; var ghue = Math.floor( 30*randomX ) + 177; var bhue = Math.floor( 40*randomX ) + 157; 
				} else if ( randomHue == 'multicolor' ) {
					// Multi Color
					var rhue = Math.floor( 57*Math.random() ) + 55; var ghue = Math.floor( 57*Math.random() ) + 55; var bhue = Math.floor( 57*Math.random() ) + 55; 
				} else {
					// Default Blue
					var rhue = Math.floor( 45*randomX ) + 15; var ghue = Math.floor( 30*randomX ) + 157; var bhue = Math.floor( 40*randomX ) + 177; 
				}
				
				var hue = 'rgb(' + rhue + ',' + ghue + ',' + bhue + ')';
				jQuery(this).css({'background-color': hue}, 500);
			});	
		}
		
		// Loading Effect
		setTimeout( function() {
			$(current_item).addClass('images-loaded');
		}, delay*counter);
	});
	
	  
	//Initialize All Scripts 
	try {
		init_headscroll();
	} catch(err) {
		//console.log(err);
	}
});


function init_portfolio_isotope() {

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.isotope');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.fadeIn();
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').on('click', function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


		var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});
}

function init_googlemap() {

	/*-------------------------------------------------*/
	/* =  Initialize Google Map
	/*-------------------------------------------------*/	
	
	// Set Lat & Long
	var myLatlng = new google.maps.LatLng(-37.817090, 144.955557);
	
	// Set Convas and Map Options
	var mapCanvas = document.getElementById('map_canvas');
	var mapOptions = {
		center: myLatlng,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROAD
	}
	
	// Set Map Object
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
	// Set Marker
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Envato pty is Here!'
	});
	
	// Set Info Box
	var contentString = '<div id="map-content"><h3>Envato pty is Here!</h3><p>We create awesome websites with WordPress Themes and Site HTMLs. This is awesome! We create awesome websites with WordPress Themes and Site HTMLs. This is awesome!</p></div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 400
	});		

	// Assign Info Box to Marker Click
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});	  

	// Customize Map Style
	map.set('styles', [
		{
			featureType: "all",
			stylers: [
			]
		},{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
			]
		}
	]);
}


function init_portfolio_carousel() {
	/*-------------------------------------------------*/
	/* =  portfolio OWL Carousel
	/*-------------------------------------------------*/	

	try {
		$("#owl-slider").owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: false,
			dots: false,
			nav: true,
			navText: ['', ''],
			items : 4,
			loop: true,
			responsive:{
				0:{
					items:1
				},
				787:{
					items:2
				},
				979:{
					items:3
				},
				1199:{
					items:4
				}
			}			
		});
	} catch(err) {

	}
}

function init_testimonials() {
	/*-------------------------------------------------*/
	/* =  Testimonials OWL Carousel
	/*-------------------------------------------------*/	

	try {
		$(".testimonials-slider").owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			nav:false,
			autoplayHoverPause: false,
			dots: true,
			items : 1,
			singleItem : true,
			autoHeight : true,
			animateOut: 'fadeOutDown',
			animateIn: 'fadeInUp',
			loop: true
		});
	} catch(err) {
	
	}
}

function init_clients_carousel() {

	/*-------------------------------------------------*/
	/* =  Clients OWL Carousel
	/*-------------------------------------------------*/	

	try {
		$(".clients-slider").owlCarousel({

			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: false,
			nav:false,
			dots: true,
			items : 6,
			loop: true,
			margin: 30,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
					nav:false
				},
				600:{
					items:3,
					nav:false
				},
				1000:{
					items:5,
					nav:false
				}
			}		
		});
	} catch(err) {

	}
}

function init_image_slider() {
	/*-------------------------------------------------*/
	/* =  Image Slider with OWL Slider
	/*-------------------------------------------------*/	

	try {
		$(".image-slider").on('initialize.owl.carousel', function(e) {
			// Fix first item is hidden bug in OWL Carousel
			setTimeout( function() {
				$(e.target).trigger('next.owl.carousel');
			} , 100 );
			
		}).owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			nav:true,
			navText: ['', ''],
			stopOnHover: true,
			loop: true,
			autoHeight: true,
			dots: true,
			animateOut: 'fadeOutDown',
			animateIn: 'fadeInUp',
			items : 1
		});
	} catch(err) {

	}
}

function init_magnific_popup() {
	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	} catch(err) {

	}

	try {
		// Example with multiple objects
		$('.zoom.video').magnificPopup({
			type: 'iframe',
			gallery: {
				enabled: true
			}
		});
	} catch(err) {

	}	
}

function init_animated_effects() {
	/*-------------------------------------------------*/
	/* =  Animated Effect
	/*-------------------------------------------------*/
	try {
		/* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            $('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);
        },
                {
                    offset: '88%',
                    triggerOnce: true
                }
        );
	} catch(err) {

	}		
}

function init_fitvids() {
	/*-------------------------------------------------*/
	/* =  Fit Embeded Videos in Pages (YouTube/Vimeo)
	/*-------------------------------------------------*/	
	try {
		// Init FitVids
		$('.blog-grid-item').fitVids();
		$('.videoplay').fitVids();
	 } catch(err) {
		
	 }
}

function adjust_puzzle_size() {
	/*-------------------------------------------------*/
	/* =  Set Image size of each item in flip menu base
	/*    Image Size
	/*-------------------------------------------------*/	
	
	$('.flip-item').each(function() {
		
		// Fit Images in Square
		$(this).find('img').each( function() {
			if ( $(this).width() > $(this).height() ) {
				// Landscape
				$(this).height('100%');
				$(this).css({width:'auto'});
			} else {
				// Portrait
				$(this).width('100%');
				$(this).css({height:'auto'});
			}
		});
	});
}


function build_header() {
	/*-------------------------------------------------*/
	/* =  Set Header Responsive Size in Small Screens
	/*-------------------------------------------------*/	

	try {
		//if ( jQuery('.navbar-right li#ajax-b1').hasClass('active') && jQuery(window).width() < 481 ) {
		if ( jQuery(window).width() < 481 ) {
			// It's in a ajax loaded page and screen is small
			jQuery('body.onepage-home').css({'padding-top':'190px'});
			jQuery('body.onepage-home header.active .navbar-inverse').css({'min-height':'150px'});	
		} else {
			// It's clicked on close or back to home
			jQuery('body.onepage-home').css({'padding-top':'120px'});
			jQuery('body.onepage-home header.active .navbar-inverse').css({'min-height':'70px'});
		}
	} catch(err) {
	
	}
}


function build_nav( $action, $nav_item, $link) {
	/*-------------------------------------------------*/
	/* =  Rebuild Ajax Navigation Buttons - OnePage V.
	/*-------------------------------------------------*/	

	try {

		// Define Navigation Buttons
		if ( $nav_item == 'prev' ) {
			$parent = jQuery('.navbar-right li#ajax-b3');
			$elem = jQuery('.navbar-right li a.link-prev');
			
		} else if ( $nav_item == 'next' ) {
			$parent = jQuery('.navbar-right li#ajax-b4');
			$elem = jQuery('.navbar-right li a.link-next');
			
		} else if ( $nav_item == 'index' ) {
			$parent = jQuery('.navbar-right li#ajax-b2');
			$elem = jQuery('.navbar-right li a.link-index');
		}	
		
		if ( $action == 'show' ) {
			// Show Button
			$elem.attr('href', $link);
			$elem.addClass('active');
			$parent.addClass('active');
		} else {
			// Hide button
			$elem.attr('href', '#');
			$elem.removeClass('active');
			$parent.removeClass('active');
		}

		
		// Read Current Situation
		var items_length = jQuery('.navbar-right li.active').length + 1;
		// Set Home Button Position
		jQuery('.navbar-right li').not('.active').not('#search').css({'right': 0, 'display': 'none'});
		jQuery('.navbar-right li#ajax-b1').css({'right': ( 60 * items_length ) + 'px'});

		jQuery('.navbar-right li.active').each( function() {
			// Shift buttons
			items_length--;
			jQuery(this).css({'right': ( 60 * items_length ) + 'px', 'display': 'inline-block'});
		});
		
	} catch(err) {

	}
}

function init_popover() {

	/*-------------------------------------------------*/
	/* =  Initialize Popover Used for Search Box
	/*-------------------------------------------------*/
	
	$('#search').popover('destroy');
	if ( jQuery(window).width() < 481 ) {
		var popover_position = 'bottom';
	} else {
		var popover_position = 'left';
	}
	$('#search').popover({
		html: true,
		placement: popover_position,
		container: 'body',
		content: function() {
			return $("#popover-content").html();
		}
	});
}


var homeURL = window.location.href;
var isbacked = 0;


function fit_ajaxloader() {

	/*-------------------------------------------------*/
	/* =  Fit Ajax Loader Height On Page Load
	/*-------------------------------------------------*/
	
	var $flip_menu_height = jQuery('#ajax-loader').outerHeight();
	jQuery('#ajax-container').css({'min-height':$flip_menu_height});
}


function randsort(c) {

	/*-------------------------------------------------*/
	/* = Generate a random order for these elements (actually for timeout)
	/*-------------------------------------------------*/
	var o = new Array();
	for (var i = 0; i < c; i++) {
		var n = Math.floor(Math.random()*c);
		if( jQuery.inArray(n, o) > 0 ) --i;
		else o.push(n);
	}
	return o;
}

jQuery('.flip-item a').on('click', function() {

	/*-------------------------------------------------*/
	/* = Click Event to Flip Out items and Show Content
	/*-------------------------------------------------*/

	// Show Loading in pageContent area
	jQuery('#page-content').html('<div class="loading-content inner"><div id="stage"><p id="spinner"><img src="upload/loading.png"><BR><BR>Loading...</p></div></div>');

	// Hide Remained Bootstrap Tooltips // Bootstrap Bug
	hideBootstrapToolTips();
	
	// Refresh homepage on back button
	isbacked = 1;
	
	// Delayed flip for all elements
	var $elem = jQuery('.flip-menu');
	var tmq_srvelem = $elem.find('.flip-item'); // The elements we're searching
	var tmq_srvcount = tmq_srvelem.size() // Total number of those elements
	var tmq_randorder = randsort(tmq_srvcount) // an array of the element indices in random order
	
	// Rotate all <i> elements
	$elem.find('.flip-item').each( function(i) {
		var $current_item = this;
		setTimeout( function() { 
			jQuery($current_item).addClass('active');
		} , 80*tmq_randorder[i] );
	});
	
	// Show Back to Home Button
	jQuery('.navbar-right li#ajax-b1').addClass('active');
	
	// Add active class to ajax loader after all of about
	jQuery('#page-content').fadeIn(1000);
	jQuery('#ajax-loader').css({'background-color':'transparent'});
	setTimeout( function() {
		jQuery('#ajax-loader').hide();
	}, 80*(tmq_srvcount-1));
	
});

jQuery('body.onepage-home').on('click', '.tmq_closeserv', function(e) {
	/*-------------------------------------------------*/
	/* = Click Event on Home Button
	/*-------------------------------------------------*/
	
	e.preventDefault();
	// Hide Remained Bootstrap Tooltips // Bootstrap Bug
	hideBootstrapToolTips();
	// Hide Back to Home Button
	// jQuery('.navbar-right li a.tmq_closeserv').animate({opacity:'0'}).css({display:'none'});
	isbacked = 0;
	build_nav( 'hide', 'prev', '' );
	build_nav( 'hide', 'next', '' );
	build_nav( 'hide', 'index', '' );
	jQuery('.navbar-right li#ajax-b1').css({'right': '0px', 'display': 'none'});
	jQuery('.navbar-right li#ajax-b1').removeClass('active');
	build_header();			

	jQuery('#ajax-loader').animate({backgroundColor:'rgba(0,0,0,0.7)'},'slow');
	jQuery('#ajax-loader').show();
	jQuery('#page-content').fadeOut(1000);
	
	// Push Home URL in history
	if (History && History.pushState){
		History.pushState(null, '', homeURL);
	}
	
	var $elem = jQuery('.flip-menu');
	var tmq_srvelem = $elem.find('.flip-item'); // The elements we're searching
	var tmq_srvcount = tmq_srvelem.size() // Total number of those elements
	var tmq_randorder = randsort(tmq_srvcount) // an array of the element indices in random order
	
	// Rotate all <i> elements
	$elem.find('.flip-item').each( function(i) {
		var $current_item = this;
		setTimeout( function() { 
			jQuery($current_item).removeClass('active');
		} , 80*tmq_randorder[i] );
	});
});

jQuery(window).on('popstate', function(event) {
	
	/*-------------------------------------------------*/
	/* = Reload page when user clicks on back button - 
	/* to let it show flip menu again
	/*-------------------------------------------------*/
	
	if ( homeURL == window.location.href && isbacked == 1) {
		location.reload();
	}
});	


function hideBootstrapToolTips() {
	/*-------------------------------------------------*/
	/* = Hide All ToolTips
	/*-------------------------------------------------*/
	jQuery('.tooltip').each( function() {
		jQuery(this).hide();
	});
}

function init_postSlider(act) {

	/*-------------------------------------------------*/
	/* = Post Slider with OWL Carousel
	/*-------------------------------------------------*/
	var sync1 = $(".slides");

	var slides = sync1.on('initialized.owl.carousel', function(e) {
		if ( act == 'ajax' ) {
			$('.post-slider .slides img').show();
			$(document).ready(function() {
				var caroMaxHeight = 470;
				var caroCounter = 0;
				$(e.target).find('.item img').each(function() {
					caroCounter++;
					if (parseInt($(this).height()) > caroMaxHeight) {
						caroMaxHeight = parseInt($(this).height());
					}
				});
				$(e.target).parents('.post-slider').find('.thumbs .item').each( function() {
					$(this).outerHeight(caroMaxHeight/caroCounter);
				});
				$(e.target).parents('.post-slider').css({'opacity':'1'});
			});
		} else {
			$('.post-slider .slides img').show();
			$(window).load(function() {
				var caroMaxHeight = 470;
				var caroCounter = 0;
				$(e.target).find('.item img').each(function() {
					caroCounter++;
					if (parseInt($(this).height()) > caroMaxHeight) {
						caroMaxHeight = parseInt($(this).height());
					}
				});
				$(e.target).parents('.post-slider').find('.thumbs .item').each( function() {
					$(this).outerHeight(caroMaxHeight/caroCounter);
				});
				$(e.target).parents('.post-slider').css({'opacity':'1'});
			});		
		}
	}).owlCarousel({
		autoplay: true,
		autoplayTimeOut: 9000,
		margin: 10,
		items: 1,
		nav:false,
		dots:false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn'
	}).on('changed.owl.carousel', function(e) {
		var current_slider = $(e.target).parents('.post-slider');
		setTimeout( function() {
			$(current_slider).find('.thumbs .active').removeClass('active');
			$(current_slider).find('.slides .owl-item').each(function(index) {
				if($(this).hasClass('active')) {
					$(current_slider).find('.thumbs .item:nth-child('+(index+1)+')').removeClass('active').addClass('active');
				}  
			});
		
		} , 100 );
	}).data('owl.carousel');
	
	$('.thumbs').on('click', '.item', function(e) {
		var goToSlide = $(e.target).parents('.item').index();
		if ( goToSlide == -1 ) {
			// User did not click on an element inside .item so get itself!
			goToSlide = $(e.target).index();
		}
		$(this).parents('.post-slider').find('.slides').trigger('to.owl.carousel', [goToSlide, 0, true]);
	});
}

	
function init_back2Top() {
/*-------------------------------------------------*/
/* = Back to Top Button
/*-------------------------------------------------*/

	try {
		$(window).scroll(function() {
			if ($(this).scrollTop() > 300) {
				$('#back-to-top').addClass('active');
			} else {
				$('#back-to-top').removeClass('active');
			}
		});
		
		$("#back-to-top").on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, 'slow');
		});
	} catch(err) {
	
	}
}

function init_tooltips() {
	/*-------------------------------------------------*/
	/* = ToolTip and Smooth Scroll
	/*-------------------------------------------------*/

	try {
		jQuery('.blog-grid-controls a').tooltip({placement: 'top', delay: 100, container: 'body'});
		jQuery('.footer-social a').tooltip({delay: 100});
		jQuery('.navbar-right a').tooltip({placement: 'bottom', delay: 50, container: 'body'});
		jQuery('.team-social a').tooltip({placement: 'top', delay: 50, container: 'body'});
		jQuery('.clients-slider a').tooltip({placement: 'top', delay: 50, container: 'body'});
	} catch(err) {
	
	}

	/* Smooth Scroll */
	
	try {
		jQuery.browserSelector();
		// Adds window smooth scroll on chrome.
		if(jQuery("html").hasClass("chrome")) {
			jQuery.smoothScroll();
		}
	} catch(err) {

	}
}


function init_headscroll() {
	/*-------------------------------------------------*/
	/* = Header animate after scroll
	/*-------------------------------------------------*/

	var docElem = document.documentElement,
	didScroll = false,
	changeHeaderOn = 40;
	document.querySelector( 'header' );
	
	function tmq_moveheader() {
		window.addEventListener( 'scroll', function() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 50 );
			}
		}, false );
	}
	
	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			jQuery( 'header' ).addClass('active');
		}
		else {
			jQuery( 'header' ).removeClass('active');
		}
		didScroll = false;
	}
	
	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
	
	tmq_moveheader();
}
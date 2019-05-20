// $('.toggle').click(function(e) {
//     e.preventDefault();

//   var $this = $(this);

//   if ($this.next().hasClass('show')) {
//       $this.next().removeClass('show');
//       $this.next().slideUp(350);
//   } else {
//       $this.parent().parent().find('li .inner').removeClass('show');
//       $this.parent().parent().find('li .inner').slideUp(350);
//       $this.next().toggleClass('show');
//       $this.next().slideToggle(350);
//   }
// });

jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
    
    //for mobile remove class on header, nav and content
    var $window = $(window),
        $menuOpen = $('nav'),
        $header = $('header'),
        $main = $('main');

    function resize() {
        if ($window.width() > 768) {
            return $menuOpen.addClass('lateral-menu-is-open') && $header.addClass('lateral-menu-is-open') && $main.addClass('lateral-menu-is-open');
        }

        $menuOpen.removeClass('lateral-menu-is-open');
        $header.removeClass('lateral-menu-is-open');
        $main.removeClass('lateral-menu-is-open');
        }

        $window
            .resize(resize)
            .trigger('resize');
});
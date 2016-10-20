/**
 * Oaxlider
 * jQuery plugin 
 * v. 0.2.0 
 * 2016-10-20
 * Options:
 *	— auto bool
 *	— controls bool
 *	— delay float, seconds
 *	— easing string, linear | swing
 *	— effect string, fade | slideUp
 *	— height int, px
 *	— speed float, seconds // 0.555 -> 555 milliseconds
 *	— width int, px|%
 */
(function($){
	var timeout_inst,
		defaults = {
			"auto" : true,
			"controls" : true,
			"delay" : 5,
			"easing" : "linear",
			"effect" : "fade",
			"height" : 400,
			"speed" : 1,
			"width" : "100%"
		},
		params = {};

	$.fn.oaxlider = function(options){

		/**	W, C, U, L, S */

		var options = options || {};

		var optkey, inttpl = /^[0-9]+$/gi;

		for(optkey in defaults){
			params[optkey] = options[optkey] || defaults[optkey];
		}

		if(inttpl.test(params.width)){
			params.width += 'px';
		}
		if(inttpl.test(params.height)){
			params.height += 'px';
		}

		$(this).css("width", params.width);
		
		var wrapper		= $("<div id=\"oaxlider-wrapper\"></div>");
		var controls	= params.controls ? $("<div id=\"oaxlider-controls\"></div>") : false;
		var list		= $(this).find("ul");
		var slides		= list.find("li");
		var i = 1;

		slides.each(function(){
			$(this).attr("id", "slide-"+i);
			if(params.controls){
				controls.append($("<a id=\"ctrl-"+i+"\" href=\"javascript:void(0)\">"+i+"</a>"));
			}
			i++
		});
		
		if(params.controls){
			controls.find('a:first-child').addClass('slide-active');
			wrapper.append(controls);
		}

		var slidebox = {
			count	: slides.length,
			// width	: $(this).width(),
			height	: params.height
		};
		
		wrapper.css({height:slidebox.height});
		wrapper.append(list);
		
		if(params.width)
			list.css("width", params.width);

		if(params.height)
			list.css("height", params.height + "px");

		slides.css({"width" : slidebox.width + "px", "height" : params.height + "px"});

		$(this).append(wrapper);

		var s = 1,
			zI = 1;

		$("li#slide-1").insertAfter("#oaxlider-wrapper ul li:last");

		var slideUp = function(id, onclick){
			var stop = false;
			list.find("li").each(function(){
				if(stop){
					return false;
				}
				if( $(this).attr("id") != "slide-"+id ){
					$(this).animate({"margin-top": '-'+$("li#slide-"+id).height()+"px"}, params.speed * 1000, 'linear', function(){
						// здесь могло бы что-нибудь произойти
						$(this).insertAfter( list.find("li:last") ).css("margin-top", "0");
					});
				} else {
					stop = true;
					if(!onclick){
						s+=1;
					}
					if(params.controls){
						if(controls.find("a").hasClass("slide-active")){
							controls.find("a").removeClass("slide-active");
						}
						$("#ctrl-"+id).addClass("slide-active");
					}
				}
			});
			
		}

		var change = function(p, fast, onclick){

			if( $("#oaxlider-wrapper").is(":hover") && !onclick ){
				return;
			}

			if( p > slidebox.count || p == 0){
				p = 1;
			}

			s = p;

			switch(params.effect){
				case "slide":
					slideUp(p, onclick);
				break;
				case "fade":
				default:
					$("li#slide-"+p).css("opacity", 0).insertAfter("#oaxlider-wrapper ul li:last");
					$("li#slide-"+p).animate({"opacity": 1}, fast ? 1 : params.speed * 1000, params.easing, function(){
						// здесь могло бы что-нибудь произойти
						s = parseInt(p) + 1;
					});
				break;
			}

			if(params.controls){
				controls.find("a").removeClass("slide-active");
				$("#ctrl-"+p).addClass("slide-active");
			}
		};
		if(params.controls){
			controls.find("a").each(function(){
				$(this).click(function(){
					return change($(this).text(), false, true);
				});
			});
		}

		if(params.auto){
			s += 1;
			var auto = function(){
				change ( s );
				timeout_inst = window.setTimeout(auto, params.delay * 1000);
			};
			timeout_inst = window.setTimeout(auto, params.delay * 1000);
		}
	};
})(jQuery);
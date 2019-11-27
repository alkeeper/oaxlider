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
"use strict";
(function($){


	let timeout_inst;

	const defaults = {
			"auto" : true,
			"controls" : true,
			"delay" : 5,
			"easing" : "linear",
			"effect" : "fade",
			"height" : 400,
			"speed" : 1,
			"width" : "100%"
		};

	$.fn.oaxlider = function(options = {}){

		/**	W, C, U, L, S */

		const inttpl = /^[0-9]+$/gi;
		const params = {...defaults, ...options};

		if(inttpl.test(params.width)){
			params.width += 'px';
		}

		if(inttpl.test(params.height)){
			params.height += 'px';
		}

		$(this).css("width", params.width);
		
		const wrapper	= $(`<div id="oaxlider-wrapper"></div>`);
		const list		= $(this).find("ul");
		const slides	= list.find("li");
		const controlsRequired = params.controls && slides.length > 1;
		const controls	= controlsRequired ? $(`<div id="oaxlider-controls"></div>`) : null;
		const slidebox = {
			// width	: $(this).width(),
			count	: slides.length,
			height	: params.height
		};

		let i = 1,
			s = 1,
			zI = 1;

		slides.each(function(){
			$(this).attr("id", "slide-" + i);
			if(controlsRequired){
				controls.append($("<a id=\"ctrl-" + i + "\" href=\"javascript:void(0)\">" + i + "</a>"));
			}
			i++;
		});

		if(controlsRequired){
			controls.find('a:first-child').addClass('slide-active');
			wrapper.append(controls);
		}

		wrapper.css({height:slidebox.height});
		wrapper.append(list);
		
		if(params.width)
			list.css("width", params.width);

		if(params.height)
			list.css("height", params.height + "px");

		slides.css({"width" : slidebox.width + "px", "height" : params.height + "px"});

		$(this).append(wrapper);


		$("li#slide-1").insertAfter("#oaxlider-wrapper ul li:last");

		const slideUp = function(id, onclick){

			let stop = false;

			const li = list.find("li:first");

			if( li.attr("id") != "slide-" + id ){

				li.animate({"margin-top": '-' + li.height() + "px"}, params.speed * 1000, 'linear', function(){
					// здесь могло бы что-нибудь произойти
					$(this).insertAfter( list.find("li:last") ).css("margin-top", "0");
				});

			} else {
				stop = true;
				if(!onclick){
					s+=1;
				}
				if(controlsRequired){
					if(controls.find("a").hasClass("slide-active")){
						controls.find("a").removeClass("slide-active");
					}
					$("#ctrl-"+id).addClass("slide-active");
				}
			}
		};

		const change = (p, fast, onclick) => {

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
					$(`li#slide-${p}`).css("opacity", 0).insertAfter("#oaxlider-wrapper ul li:last");
					$(`li#slide-${p}`).animate({"opacity": 1}, fast ? 1 : params.speed * 1000, params.easing, () => s = parseInt(p) + 1);
				break;
			}

			if(controlsRequired){
				controls.find("a").removeClass("slide-active");
				$(`#ctrl-${p}`).addClass("slide-active");
			}
		};

		if(controlsRequired){

			controls.find("a").each(function(){

				$(this).click(function(){

					return change($(this).text(), false, true);

				});

			});

		}

		const auto = () => {
			change ( s );
			timeout_inst = window.setTimeout(auto, params.delay * 1000);
		};

		if(params.auto){
			s += 1;
			timeout_inst = window.setTimeout(auto, params.delay * 1000);
		}
	};
})(jQuery);
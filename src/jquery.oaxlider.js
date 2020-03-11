/**
 * Oaxlider
 * jQuery plugin 
 * v1.0.3 
 * 2020-03-11
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
  var timeout_inst;
  var defaults = {
    "auto": true,
    "controls": true,
    "delay": 5,
    "easing": "linear",
    "effect": "fade",
    "height": 400,
    "speed": 1,
    "width": "100%"
  };

  $.fn.oaxlider = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var inttpl = /^[0-9]+$/gi;

    var params = _objectSpread({}, defaults, {}, options);

    if (inttpl.test(params.width)) {
      params.width += 'px';
    }

    if (inttpl.test(params.height)) {
      params.height += 'px';
    }

    $(this).css("width", params.width);
    var wrapper = $("<div id=\"oaxlider-wrapper\"></div>");
    var list = $(this).find("ul");
    var slides = list.find("li");
    var controlsRequired = params.controls && slides.length > 1;
    var controls = controlsRequired ? $("<div id=\"oaxlider-controls\"></div>") : null;
    var slidebox = {
      count: slides.length,
      height: params.height
    };
    var i = 1,
        s = 1,
        zI = 1;
    slides.each(function () {
      $(this).attr("id", "slide-" + i);

      if (controlsRequired) {
        controls.append($("<a id=\"ctrl-" + i + "\" href=\"javascript:void(0)\">" + i + "</a>"));
      }

      i++;
    });

    if (controlsRequired) {
      controls.find('a:first-child').addClass('slide-active');
      wrapper.append(controls);
    }

    wrapper.css({
      height: slidebox.height
    });
    wrapper.append(list);
    if (params.width) list.css("width", params.width);
    if (params.height) list.css("height", params.height + "px");
    slides.css({
      "width": slidebox.width + "px",
      "height": params.height + "px"
    });
    $(this).append(wrapper);
    $("li#slide-1").insertAfter("#oaxlider-wrapper ul li:last");

    var slideUp = function slideUp(id, onclick) {
      var stop = false;
      var li = list.find("li:first");

      if (li.attr("id") != "slide-" + id) {
        li.animate({
          "margin-top": '-' + li.height() + "px"
        }, params.speed * 1000, 'linear', function () {
          // здесь могло бы что-нибудь произойти
          $(this).insertAfter(list.find("li:last")).css("margin-top", "0");
        });
      } else {
        stop = true;

        if (!onclick) {
          s += 1;
        }

        if (controlsRequired) {
          if (controls.find("a").hasClass("slide-active")) {
            controls.find("a").removeClass("slide-active");
          }

          $("#ctrl-" + id).addClass("slide-active");
        }
      }
    };

    var change = function change(p, fast, onclick) {
      if ($("#oaxlider-wrapper").is(":hover") && !onclick) {
        return;
      }

      if (p > slidebox.count || p == 0) {
        p = 1;
      }

      s = p;

      switch (params.effect) {
        case "slide":
          slideUp(p, onclick);
          break;

        case "fade":
        default:
          $("li#slide-".concat(p)).css("opacity", 0).insertAfter("#oaxlider-wrapper ul li:last");
          $("li#slide-".concat(p)).animate({
            "opacity": 1
          }, fast ? 1 : params.speed * 1000, params.easing, function () {
            return s = parseInt(p) + 1;
          });
          break;
      }

      if (controlsRequired) {
        controls.find("a").removeClass("slide-active");
        $("#ctrl-".concat(p)).addClass("slide-active");
      }
    };

    if (controlsRequired) {
      controls.find("a").each(function () {
        $(this).click(function () {
          return change($(this).text(), false, true);
        });
      });
    }

    var auto = function auto() {
      change(s);
      timeout_inst = window.setTimeout(auto, params.delay * 1000);
    };

    if (params.auto && slides.length > 1) {
      s += 1;
      timeout_inst = window.setTimeout(auto, params.delay * 1000);
    }
  };
})(jQuery);
//# sourceMappingURL=jquery.oaxlider.js.map

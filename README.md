# oaxlider [![Travis Build Status](https://travis-ci.org/alkeeper/oaxlider.svg?branch=master)](https://travis-ci.org/alkeeper/oaxlider)
Oak slider js

### Basic usage

- HTML
```html
<div id="myslides">
	<ul>
		<li><img src="" alt=""></li>
		<li><img src="" alt=""></li>
		<li><img src="" alt=""></li>
		...
	</ul>
</div>
```

- Javascript

```javascript
$(function(){
	$("#myslides").oaxlider({
		// options
	});
});
```

### Advansed usage

```javascript
	$("#myslides").oaxlider({
		"auto" : true,			// sliding autostart
		"controls" : bool,		// show buttons
		"delay" : 5, 			// float, seconds
		"easing" : "linear",	// string, available values — linear, swing
		"height" : 300,			// int, px
		"speed" : 1,			// float, seconds // 0.555 -> 555 milliseconds
		"width" : "100%"		// int (400px) or string (100%)
	});
```
# oaxlider
<!-- [![Travis Build Status](https://travis-ci.org/alkeeper/oaxlider.svg?branch=master)](https://travis-ci.org/alkeeper/oaxlider) -->
Oak slider js

### Basic usage

- HTML
```html
<div id="myslides">
	<ul>
		<li><img src="path/to/img/1.jpg" alt=""></li>
		<li><img src="path/to/img/2.jpg" alt=""></li>
		<li><img src="path/to/img/3.jpg" alt=""></li>
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
		"auto" : true,			// boolean, sliding autostart
		"controls" : true,		// boolean, show buttons
		"delay" : 5, 			// float, seconds
		"easing" : "linear",	// string, available values — linear, swing
		"height" : 300,			// int, px
		"speed" : 1,			// float, seconds // 0.555 -> 555 milliseconds
		"width" : "100%"		// mixed, int (400px) or string (100%)
	});
```

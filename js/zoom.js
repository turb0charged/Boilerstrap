//JavaScript Document

if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS){
	Hammer.plugins.showTouches();
}

if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
	Hammer.plugins.fakeMultitouch();
}

var hammertime = Hammer(document.getElementById('zoomwrapper1'),{
	transform_always_block: true,
	transform_min_scale: 1,
	drag_block_horizontal: true,
	drag_block_vertical: true,
	drag_min_distance: 0
});


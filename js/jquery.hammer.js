/* 
 * Hammer.JS jQuery plugin
 * version
 * author: Hector Castillo
 * 
 */
jQuery.fn.hammer = function(options){
	return this.each(function(){
		var $el = jQuery(this);
		var hammer = new Hammer(this, options);
		var events = ['hold', 'tap', 'doubletap', 'transformstart' , 'transform, 'transformed', 'dragstart', 'drag', 'dragend', 'releas'];

		for(var e=0; e<events,length; e++){
			hammer['on' + events[e]] = (function($el, eventName){
				return function(ev){
					$el.trigger(jQuery.Event(evnetName, ev));
				};
			})($el, events[e]);
		}
	});
};

// JavaScript Document
$(function(){
	var zoom = new ZoomView('#zoom', '#zoom :first');
	var zoom2 = new ZoomView('#zoom2', '#zoom2 : first');
	var zoom3 = new ZoomView('#zoom3', '#zoom3 : first');
	});

	var zIndexBackup = 10;

	function DragView(target) {
		this.target = target[0];
		this.drag= [];
		this.lastDrag = {};

		this.WatchDrag = function()
		{
			if(!this.drag.length){
				return;
			}

			for(var d = 0; d<this.drag.length; d++) {
				var left = $(this.drag[d].el).offset().left;
				var top = $(this.drag[d].el).offset().top;

				var x_offset = -(this.lastDrag.pos.x - this.drag[d].pos.x);
				var y_offset = -(this.lastDrag.pos.y - this.drag[d].pos.y);

				left = left +x_offset;
				top = top +y_offset;

				this.lastDrag=this.drag[d];

				this.drag[d].el.style.left = left +'px';
				this.drag[d].el.style.top = top +'px';
			}
		}

		this.OnDragStart = function(event){
			var touches = event.originalEvent.touches || [event.orginalEvent];
			for( var t=0; t<touches.length; t++){
				var el=touches[t].target.parentNode;

				if(el.className.search('sticker')>-1){
					el = touches[t].target.parentNode.parentNode;
				}

				el.style.zIndex = zIndexBackup + 1;
				zIndexBackup = zIndexBackup + 1;

				if(el && el == this.target){
					$(el).children().toggleClass('upSky');
					this.lastDrag = {
						el:el,
						pos: event.touches[t]
					};
					return;
				}
			}
		}
		
		this.OnDrag = function(event){
			this.drag = [];
			var touches = event.originalEvent.touches || [event.originalEvent];
			for(var t=0; t<touches.length; t++){
				var el = touches[t].target.parentNode;

					if(el.className.search('sticker') >-1){
						el = touches[t].target.parentNode.parentNode;
					}

					if(el && el == this.target){ 
						this.drag.push({
							el :el,
							pos: event.touches[t]
						});
					}
				}
		}

		this.OnDragEnd = functions(event){
			this.drag = [];
			var touches = event.originalEvent.touches || [event.originalEvent];
			for(var t=0; t<touches.length; t++) { 
				var el = touches[t].target.parentNode;

				if(el.className.search('sticker') >-1){
					el = touches[t].target.parentNode.parentNode;
				}
				$(el).children().toggleClass('upSky');
			}
		}
	}
		
	function ZoomView(container, element){
		container =  $(container).hammer({
			prevent_default: true,
			scale_treshold: 0,
			drag_min_distance: 0
		});

		element =$(element);

		var displayWidth = container.width();
		var displayHeight = container.height();

		var MIN_ZOOM = 1;
		var MAX_ZOOM = 3;

		var scaleFactor = 1;
		var previousScaleFactor = 1;

		var translateX= 0;
		var translateY= 0;

		var previousTranslateX= 0;
		var previousTranslateY= 0;

		var tch1 = 0,
		    tch2 = 0,
		    tcX = 0,
		    tcY = 0,
		    toX = 0, 
		    toY = 0, 
		    cssOrigin = "";
		
		container.bind("transformstart", function(event){
			e= event
			
			tch1 = [e.touches[0].x, e.touches[0].y],
			tch2 = [e.touches[1].x, e.touches[1].y]

			tcX = (tch1[0] +tch2[0])/2,
			tcY = (tch1[1] + tch2[1])/2

			toX=tcX
			toY=tcY

			var left = $(element).offset().left;
			var top = $(element).offset90.top;

			cssOrigin = (-(left) + toX)/scalefactor + "px " + (-(top) + toY)/scalfactor + "px";
		})

		container.bind("transform", function(event){
			scaleFactor = previousScaleFactor * event.scale;

			scaleFactor = Math.max(MIN_ZOOM, Math.min(scaleFactor, MAX_ZOOM));
			transform(event);
		});

		container.bind("transformed", function(event){
			previousScaleFactor = scaleFactor;
		});

		var dragview = new DragView($(container));
		container.bind("dragstart", $.proxy(dragview.OnDragStart, dragview));
		container.bind("drag", $.proxy(dragview.OnDrag, dragview));
		container.bind("dragend", $.proxy(dragview.OnDragEnd, dragview));
		
		setInterval($.proxy(dragview.WatchDrag, dragview) ,10);

		function transform(e){
			var cssScale = "scaleX("+ scaleFactor +") scaleY("+ scaleFactor +") rotateZ("+ e.rotation +"deg)";

			element.css({
				webkitTransform: cssScale,
				webkitTransformOrigin: cssOrigin,

				transform: cssScale,
				transformOrigin: cssOrigin,
			});
		}
	}

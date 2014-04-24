;(function ( $, window, document, undefined ) {
	
    var pluginName = "inViewport",
        defaultcustomClassName = "in-view",
				defaultViewportPadding = {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				};

    S = {
	
			el: null,
			
			viewportPadding : null,
			
			init: function(element, viewportPadding, customClassName) {
				
				this.el = element;
				
				this.viewportPadding = $.extend(defaultViewportPadding, viewportPadding);
				
				this.customClassName = customClassName || defaultcustomClassName;
				
        this._name = pluginName;
				
				return this.updateClass();
			},
			
			updateClass: function() {
			
				$(this.el).removeClass(this.customClassName);
			
				if (this.elementInViewport(this.el, this.parsePadding(this.viewportPadding))) {
					
					$(this.el).addClass(this.customClassName);
					
					return true;
					
				} else return false;
			},
			
			parsePadding : function(padding) {
				
				var top = 0;
				var right = 0;
				var bottom = 0;
				var left = 0;
				
				if (typeof padding === 'object') {
					
					top = padding.top / 100;
					
					bottom = padding.bottom / 100;
					
					right = padding.right / 100;
					
					left = padding.right / 100;
				};
				//else if it's a number keep everything the same
				return {
					top: top,
					bottom: bottom,
					right: right,
					left: left
				}
			},
			
			subtractPaddingFromWindow: function(w, h, padding) {
				
				return  {
					top: h * padding.top,
					bottom: h * padding.bottom,
					left: w * padding.left,
					right: w * padding.right
				}
			},

			elementInViewport : function(el, padding) {
				
			  var top = el.offsetTop;
			  var left = el.offsetLeft;
			  var width = el.offsetWidth;
			  var height = el.offsetHeight;
				
				var p = this.subtractPaddingFromWindow(window.innerWidth, window.innerHeight, padding);
			
			  while(el.offsetParent) {
			    el = el.offsetParent;
			    top += el.offsetTop;
			    left += el.offsetLeft;
			  }

			  return (
			    top < (window.pageYOffset + window.innerHeight - p.bottom) &&
			    left < (window.pageXOffset + window.innerWidth - p.right) && 
			    (top + height) > (window.pageYOffset + p.top) &&
			    (left + width) > (window.pageXOffset + p.left)
			  );
			}
    };

    $.fn[pluginName] = function (viewportPadding, customClassName) {
	
			var isInView = false;
	
			this.each(function () {
				
				var thisInView = S.init(this, viewportPadding, customClassName);
				
				if (thisInView === true) isInView = true;
			});
			
			return isInView;
    };

})( jQuery, window, document );
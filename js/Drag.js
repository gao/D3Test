var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function Drag(){};
	smr.Drag = Drag; 
  
	Drag.prototype.build = function(data,config){
		var html = $("#tmpl-Drag").render({});
		return $(html);
	}
		
	Drag.prototype.postDisplay = function(pdata, config) {
		var $e = this.$element;
		var thisC = this;
		
		var width = 960,
	    	height = 500,
	    	radius = 120;
		
		var drag = d3.behavior.drag()
			.origin(Object)
			.on("drag", dragmove);
		
		//add the svg
		var svg = d3.select(".Drag").append("svg")
	    	.attr("width", width)
	    	.attr("height", height)
		
	    var circle = svg.append("circle")
	        .data([{x: width / 2, y: height / 2}])
	        .attr("r", radius)
	        .attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; })
	        .call(drag);
		
		
		function dragmove(d) {
			 circle
			 	.attr("cx", d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
			    .attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
		}
	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("Drag",{
		emptyParent: true,
		loadTmpl: true
	},
	function(){
		return new smr.Drag();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);

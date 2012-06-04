var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function Circle(){};
	smr.Circle = Circle; 
  
	Circle.prototype.build = function(data,config){
		var html = $("#tmpl-Circle").render({});
		return $(html);
	}
		
	Circle.prototype.postDisplay = function(pdata, config) {
		var $e = this.$element;
		var thisC = this;
		
		var sampleSVG = d3.select(".Circle")
    		.append("svg:svg")
    		.attr("width", 100)
    		.attr("height", 100);    

		sampleSVG.append("svg:circle")
    		.style("stroke", "gray")
    		.style("fill", "white")
    		.attr("r", 40)
    		.attr("cx", 50)
    		.attr("cy", 50)
    		.on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    		.on("mouseout", function(){d3.select(this).style("fill", "white");})
    		.on("mousedown", animate);

		function animate() {
	 		d3.select(this).transition()
	 		.duration(1000)
	 		.attr("r", 10)
	 		.transition()
	 		.delay(1000)
	 		.attr("r", 40);
	};
	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("Circle",{
		emptyParent: true,
		loadTmpl: true
	},
	function(){
		return new smr.Circle();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);

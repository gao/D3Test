var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function HelloWorld(){};
	smr.HelloWorld = HelloWorld; 
  
	HelloWorld.prototype.build = function(data,config){
		var html = $("#tmpl-HelloWorld").render({});
		return $(html);
	}
		
	HelloWorld.prototype.postDisplay = function(pdata, config) {
		var $e = this.$element;
		var thisC = this;
		
		 d3.select(".HelloWorld")
	      .style("width", "0%")
	      .style("background-color", "steelblue")
	      .text("hello world")
	    .transition()
	      .ease("bounce")
	      .duration(2000)
	      .style("width", "100%")
	      .style("background-color", "brown");
		 
	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("HelloWorld",{
		emptyParent: true,
		loadTmpl: true
	},
	function(){
		return new smr.HelloWorld();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);

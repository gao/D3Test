var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function AreaChart(){};
	smr.AreaChart = AreaChart; 
  
	AreaChart.prototype.build = function(data,config){
		var html = $("#tmpl-AreaChart").render({});
		return $(html);
	}
		
	AreaChart.prototype.postDisplay = function(data, config) {
		var $e = this.$element;
		var thisC = this;
		data = data || {};

		var w = 900,
		    h = 450;

		var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

		var maxDataPointsForDots = 50,
			transitionDuration = 1000;

		var svg = null,
			yAxisGroup = null,
			xAxisGroup = null,
			dataCirclesGroup = null,
			dataLinesGroup = null;

		var data = generateData();
		var margin = 40;
		var max = d3.max(data, function(d) { return d.value });
		var min = 0;
		var pointRadius = 4;
		var x = d3.time.scale().range([0, w - margin * 2]).domain([data[0].date, data[data.length - 1].date]);
		var y = d3.scale.linear().range([h - margin * 2, 0]).domain([min, max]);

		var xAxis = d3.svg.axis().scale(x).tickSize(h - margin * 2).tickPadding(10);
		var yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-w + margin * 2).tickPadding(10);
		var t = null;

		svg = d3.select('.AreaChart').select('svg').select('g');
		if (svg.empty()) {
			svg = d3.select('.AreaChart')
				.append('svg:svg')
					.attr('width', w)
					.attr('height', h)
					.attr('class', 'viz')
				.append('svg:g')
					.attr('transform', 'translate(' + margin + ',' + margin + ')');
		}

		t = svg.transition().duration(transitionDuration);

		// y ticks and labels
		if (!yAxisGroup) {
			yAxisGroup = svg.append('svg:g')
				.attr('class', 'yTick')
				.call(yAxis);
		}else {
			t.select('.yTick').call(yAxis);
		}

		// x ticks and labels
		if (!xAxisGroup) {
			xAxisGroup = svg.append('svg:g')
				.attr('class', 'xTick')
				.call(xAxis);
		}else {
			t.select('.xTick').call(xAxis);
		}

		// Draw the lines
		if (!dataLinesGroup) {
			dataLinesGroup = svg.append('svg:g');
		}

		var dataLines = dataLinesGroup.selectAll('.data-line').data([data]);

		var line = d3.svg.line()
			.x(function(d,i) { return x(d.date); })
			.y(function(d) { return y(d.value); })
			.interpolate("linear");

		var garea = d3.svg.area()
			.interpolate("linear")
			.x(function(d) { return x(d.date); })
		    .y0(h - margin * 2)
		    .y1(function(d) { return y(d.value); });

		dataLines
			.enter()
			.append('svg:path')
		            .attr("class", "area")
		            .attr("d", garea(data));

		dataLines.enter().append('path')
			.attr('class', 'data-line')
			.style('opacity', 0.3)
			.attr("d", line(data));

		dataLines.transition()
			.attr("d", line)
			.duration(transitionDuration)
				.style('opacity', 1)
		        .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.value) + ")"; });

		dataLines.exit()
			.transition()
			.attr("d", line)
			.duration(transitionDuration)
		    .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(0) + ")"; })
			.style('opacity', 1e-6)
			.remove();

		d3.selectAll(".area").transition()
			.duration(transitionDuration)
			.attr("d", garea(data));

		if (!dataCirclesGroup) {
			dataCirclesGroup = svg.append('svg:g');
		}

		var circles = dataCirclesGroup.selectAll('.data-point').data(data);

		circles
			.enter()
				.append('svg:circle')
					.attr('class', 'data-point')
					.style('opacity', 1e-6)
					.attr('cx', function(d) { return x(d.date) })
					.attr('cy', function() { return y(0) })
					.attr('r', function() { return (data.length <= maxDataPointsForDots) ? pointRadius : 0 })
				.transition()
				.duration(transitionDuration)
					.style('opacity', 1)
					.attr('cx', function(d) { return x(d.date) })
					.attr('cy', function(d) { return y(d.value) });

		circles
			.exit()
				.transition()
				.duration(transitionDuration)
					.attr('cy', function() { return y(0) })
					.style("opacity", 1e-6)
					.remove();

		$('svg circle').tipsy({ 
			gravity: 'w', 
		    html: true, 
		    title: function() {
		    	var d = this.__data__;
			    var pDate = d.date;
		        return 'Date: ' + pDate.getDate() + " " + monthNames[pDate.getMonth()] + " " + pDate.getFullYear() + '<br>Value: ' + d.value; 
		    }
		 });
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Helper Functions ---------- //
	function generateData() {
		var data = [];
		var i = 20;

		while (i--) {
			var date = new Date();
			date.setDate(date.getDate() - i);
			date.setHours(0, 0, 0, 0);
			data.push({'value' : Math.round(Math.random()*1200), 'date' : date});
		}
		return data;
	}
	// --------- /Helper Functions ---------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("AreaChart",{
		emptyParent: true,
		loadTmpl: true
	},
	function(){
		return new smr.AreaChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);

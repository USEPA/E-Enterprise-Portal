(function ($) {
  "use strict";

  $(document).ready(function () { draw(); });

  function insertLinebreaks(d, smallSubtitles) {
    var el = d3.select(d);
    // console.log(el)
    var words = el.text().split('/');
    el.text('');

    var anchor = el.attr('text-anchor');
    var x = el.attr('x') ? el.attr('x') : 0;


    for (var i = 0; i < words.length; i++) {
      var tspan = el.append('tspan').html(words[i]);
      tspan.attr('text-anchor', anchor);
      tspan.attr('x', x);
      if (i > 0) {
        tspan
          .attr('text-anchor', anchor)
          .attr('x', x)
          .attr('dy', '18');
        if (smallSubtitles)
          tspan.attr("class", "emissions-watch-donut-small-subtitle");
      }
    }
  }

  var drawDonut = function(data, svg, width, height, totalWidth) {

    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var emissionsNumberFormat = d3.format("0,000");

    var totalEmissions = 0;

    data.Facilities.forEach(function(facility) {
      totalEmissions += facility.TotEmissCO2E;
    });

    var arc = d3.svg.arc()
        .outerRadius(radius * .7)
        .innerRadius(radius * .5);

    var outerArc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.TotEmissCO2E; });

    var donut = svg.append("g")
      .attr("transform", "translate(" + totalWidth / 2 + "," + height / 2 + ")");

    var g = donut.selectAll(".arc")
        .data(pie(data.Facilities))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.TotEmissCO2E); });

    // donut labels
    // g.append("text")
    //     .attr("transform", function(d) { return "translate(" + outerArc.centroid(d) + ")"; })
    //     .attr("dy", ".35em")
    //     .style("text-anchor", "middle")
    //     .text(function(d) { return d.data.FacName + '/' + (emissionsNumberFormat(d.data.TotEmissCO2E) + ' metric tons CO2E') + '/' + (d.data.FacDistMi + ' miles away'); });

    g.append("text").attr({
      x: function (d, i) {
          var centroid = outerArc.centroid(d),
              midAngle = Math.atan2(centroid[1], centroid[0]),
              x = Math.cos(midAngle) * radius,
              sign = (x > 0) ? 1 : -1,
              labelX = x + (5 * sign);
          console.log(centroid, midAngle, x, sign, labelX)
          return labelX;
      },
      y: function (d, i) {
          var centroid = outerArc.centroid(d),
              midAngle = Math.atan2(centroid[1], centroid[0]),
              y = Math.sin(midAngle) * radius;
          return y;
      },
      'text-anchor': function (d, i) {
          var centroid = outerArc.centroid(d),
              midAngle = Math.atan2(centroid[1], centroid[0]),
              x = Math.cos(midAngle) * radius;
          return (x > 0) ? "start" : "end";
      }
    }).text(function(d) { 
      return d.data.FacName + '/' + (emissionsNumberFormat(d.data.TotEmissCO2E) + ' metric tons CO2E') + '/' + (d.data.FacDistMi + ' miles away'); 
    });

    var totalEmissionsText = donut.append("text")
      .attr("text-anchor", "middle")
      .text(emissionsNumberFormat(totalEmissions) + "/metric tons CO2E")

    g.selectAll('text').each(function(){
      insertLinebreaks(this, true)
    });

    insertLinebreaks(totalEmissionsText[0][0]);
  }

  var drawChart = function(data) {

    var maxDistance = 0;
    var maxCO2E = 0;

    data.Facilities.forEach(function(facility) {

      if (facility.FacDistMi > maxDistance)
        maxDistance = facility.FacDistMi;

      if (facility.TotEmissCO2E > maxCO2E)
        maxCO2E = facility.TotEmissCO2E;

      // TODO: handle missing pollutants case
      // if (facility.Pollutants.length == 0)
      //   facility.Pollutants.push({'PollutantName': 'All', AmtCO2E: facility.TotEmissCO2E});

      var y0 = 0;
      facility.sections = facility.Pollutants.map(function(pollutant) { return {name: pollutant.PollutantName, y0: y0, y1: y0 += +pollutant.AmtCO2E}; });
    });

    // console.log(data, maxDistance, maxCO2E);

    var colorMap = {
      'CO2': 'red',
      'N2O': 'blue',
      'CH4': 'green',
      'PFC': 'purple',
      'HFC': 'orange',
      'SF6': 'yellow',
      'NF3': 'indigo',
      'All': 'black'
    }

    // set chart sizes
    var margin = {top: 80, right: 60, bottom: 60, left: 60},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var donutMargin = {bottom: 20};
    var donutWidth = 200;
    var donutHeight = 200;

    var totalWidth = width + margin.left + margin.right;
    var totalHeight = height + margin.top + margin.bottom + donutHeight + donutMargin.bottom;

    // set x and y scales
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(data.Facilities.map(function(d) { return d.FacName }));;
    var y = d3.scale.linear().domain([0, maxCO2E]).range([height, 0]);

    // set colors
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // create x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // create y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width)
        .tickFormat(d3.format(".2s"));

    // append svg
    var svg = d3.select("#air-emissions-chart").append("svg")
        .attr("width", totalWidth)
        .attr("height", totalHeight);

    // append bar chart
    var graph = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + donutHeight + donutMargin.bottom) + ")");

    // x-axis
    graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // y-axis
    graph.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // bars
    var facility = graph.selectAll(".facility")
      .data(data.Facilities)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.FacName) + ",0)" });

    // bar sections
    facility.selectAll("rect")
      .data(function(d) { return d.sections})
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return colorMap[d.name]; });

    drawDonut(data, svg, donutWidth, donutHeight, totalWidth);
  }

  var draw = function() {
    var data = { "ZipCentLat83": 32.8, "ZipCentLong83": -96.8, "BuffRadiusMi": 10, "Facilities": [ { "FacID": 1001398, "FacName": "Atmos Energy Corporation - Texas", "FacLat83": 32.925488, "FacLong83": -96.816137, "FacDistMi": 8.72, "TotEmissCO2E": 544204, "Pollutants": [ { "PollutantName": "CH4", "AmtCO2E": 543549 }, { "PollutantName": "CO2", "AmtCO2E": 655 } ] }, { "FacID": 1003945, "FacName": "TEXAS INSTRUMENTS NORTH CAMPUS", "FacLat83": 32.93311, "FacLong83": -96.7537, "FacDistMi": 9.58, "TotEmissCO2E": 531866.507, "Pollutants": [ { "PollutantName": "PFC", "AmtCO2E": 399276.483 }, { "PollutantName": "HFC", "AmtCO2E": 8872.334 }, { "PollutantName": "NF3", "AmtCO2E": 31682.4 }, { "PollutantName": "SF6", "AmtCO2E": 29906.76 }, { "PollutantName": "N2O", "AmtCO2E": 12737.414 }, { "PollutantName": "N2O", "AmtCO2E": 27.416 }, { "PollutantName": "CH4", "AmtCO2E": 23 }, { "PollutantName": "CO2", "AmtCO2E": 49340.7 } ] }, { "FacID": 1006817, "FacName": "McCommas Bluff Landfill", "FacLat83": 32.67628, "FacLong83": -96.73391, "FacDistMi": 9.37, "TotEmissCO2E": 420239.25, "Pollutants": [ { "PollutantName": "CH4", "AmtCO2E": 420239.25 } ] } ] };
    drawChart(data);
  }

})(jQuery);
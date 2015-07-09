(function ($) {
  "use strict";

  $(document).ready(function () { draw(); });

    var baseDy = 18;

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y")?text.attr("y"):0,
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

  function insertLinebreaks(text) {

    text.each(function() {
      var el = d3.select(this);
      var words = el.text().split('/');
      el.text('');

      var anchor = el.attr('text-anchor');
      var x = el.attr('x') ? el.attr('x') : 0;
      var y = el.attr('y') ? el.attr('y') : 0;

      for (var i = 0; i < words.length; i++) {
        var tspan = el.append('tspan').html(words[i])
          .attr('text-anchor', anchor)
          .attr('x', x)
          .attr('y', y)
          .attr('dy', '0')
        if (i > 0) {
          tspan
            .attr('text-anchor', anchor)
            .attr('x', x)
            .attr('y', y)
            .attr('dy', baseDy * i);
        }
      }
    });
  }

  var emissionsNumberFormat = d3.format(",.0f");

  var drawDonut = function(data, svg, width, height, totalWidth) {

    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

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

    var svg = d3.select("#air-emissions-chart").append("svg")
        .attr("width", totalWidth)
        .attr("height", height);

    var donut = svg.append("g")
      .attr("transform", "translate(" + totalWidth / 2 + "," + height / 2 + ")");

    var g = donut.selectAll(".arc")
        .data(pie(data.Facilities))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.TotEmissCO2E); });

    var labels = g.append("text").attr({
      x: function (d, i) {
          var centroid = outerArc.centroid(d),
              midAngle = Math.atan2(centroid[1], centroid[0]),
              x = Math.cos(midAngle) * radius,
              sign = (x > 0) ? 1 : -1,
              labelX = x + (5 * sign);
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
      },
      dy: 0
    }).text(function(d) { 
      return d.data.FacName; 
    }).call(wrap, totalWidth / 2 - radius);

    labels.append("tspan")
      .text(function(d) {
        return emissionsNumberFormat(d.data.TotEmissCO2E) + ' metric tons CO2E';
      })
      .attr("x", function(){ return d3.select(this.parentNode).attr("x") })
      .attr("dy", baseDy)
      .attr("class", "emissions-watch-donut-small-subtitle");

    labels.append("tspan")
      .text(function(d) {
        return d.data.FacDistMi + ' miles away';
      })
      .attr("x", function(){ return d3.select(this.parentNode).attr("x") })
      .attr("dy", baseDy)
      .attr("class", "emissions-watch-donut-small-subtitle");

    var totalEmissionsText = donut.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 0)
      .attr("y", -9)
      .attr("x", 0)
      .text(emissionsNumberFormat(totalEmissions));

    totalEmissionsText.append("tspan")
      .attr("dy", baseDy)
      .attr("x", 0)
      .attr("class", "emissions-watch-donut-small-subtitle")
      .text("metric tons");

    totalEmissionsText.append("tspan")
      .attr("dy", baseDy)
      .attr("x", 0)
      .attr("class", "emissions-watch-donut-small-subtitle")
      .text("CO2E");

    var lowestLabel;

    labels.each(function() {
      if (!lowestLabel || this.getBoundingClientRect().bottom > lowestLabel.getBoundingClientRect().bottom)
        lowestLabel = this;
    })

    svg.attr("height", height + lowestLabel.clientHeight);
  }

  var drawChart = function(data) {

    var maxDistance = 0;
    var maxCO2E = 0;

    var facIDMap = {};

    data.Facilities.forEach(function(facility, i) {

      facIDMap[facility.FacID] = i;

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
    var margin = {top: 20, right: 60, bottom: 100, left: 60},
        width = 650 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var extraHeight = baseDy * 8//data.Facilities[facIDMap[d]].Pollutants.length;

    margin.top += extraHeight;

    var donutMargin = {bottom: 20};
    var donutWidth = 200;
    var donutHeight = 200;

    var totalWidth = width + margin.left + margin.right;
    var totalHeight = height + margin.top + margin.bottom;

    drawDonut(data, svg, donutWidth, donutHeight, totalWidth);

    // set x and y scales
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(data.Facilities.map(function(d) { return d.FacID }));;
    var y = d3.scale.linear().domain([0, maxCO2E]).range([height, 0]);

    // set colors
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // create x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(function(d) {
          return data.Facilities[facIDMap[d]].FacName;
        })
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
        .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");

    // y-axis
    graph.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // bars
    var facility = graph.selectAll(".facility")
      .data(data.Facilities)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.FacID) + ",0)" });

    // bar sections
    var bars = facility.selectAll("rect")
      .data(function(d) { return d.sections})
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return colorMap[d.name]; });

    // x-axis labels
    var xAxisLabels = graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate("+ -x.rangeBand() / 2 +"," + height + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .style("text-anchor", "start")
        .call(wrap, x.rangeBand());

    // x-axis sublabels
    xAxisLabels.append("tspan")
      .text(function(d) {
        return (emissionsNumberFormat(data.Facilities[facIDMap[d]].TotEmissCO2E)) + ' metric tons CO2E';
      })
      .attr("x", function(){ return d3.select(this.parentNode).attr("x") })
      .attr("dy", baseDy)
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-donut-small-subtitle");

    // x-axis sublabels
    xAxisLabels.append("tspan")
      .text(function(d) {
        return (data.Facilities[facIDMap[d]].FacDistMi) + ' miles away';
      })
      .attr("x", function(){ return d3.select(this.parentNode).attr("x") })
      .attr("dy", baseDy)
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-donut-small-subtitle");

    // component labels above bars
    xAxisLabels.append("tspan")
      .text(function(d) {
        return data.Facilities[facIDMap[d]].Pollutants.map(
          function(pollutant){ 
            return pollutant.PollutantName + ": ";
          }).join('/');
      }).attr("x", function(){ return 0})
      .attr("y", function(d) { return -y(maxCO2E - data.Facilities[facIDMap[d]].TotEmissCO2E) - baseDy * data.Facilities[facIDMap[d]].Pollutants.length })
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-bar-chart-small-subtitle")
      .call(insertLinebreaks);
    
    xAxisLabels.append("tspan")
      .text(function(d) {
        return data.Facilities[facIDMap[d]].Pollutants.map(
          function(pollutant){ 
            return emissionsNumberFormat(pollutant.AmtCO2E);
          }).join('/');
      }).attr("x", function(){ return x.rangeBand()})
      .attr("y", function(d) { return -y(maxCO2E - data.Facilities[facIDMap[d]].TotEmissCO2E) - baseDy * data.Facilities[facIDMap[d]].Pollutants.length })
      .attr("text-anchor", "end")
      .attr("class", "emissions-watch-bar-chart-small-subtitle")
      .call(insertLinebreaks);
  }

  var draw = function() {
    var data = { "ZipCentLat83": 32.8, "ZipCentLong83": -96.8, "BuffRadiusMi": 10, "Facilities": [ 
      { "FacID": 1001398, "FacName": "Atmos Energy Corporation - Texas", "FacLat83": 32.925488, "FacLong83": -96.816137, "FacDistMi": 8.72, "TotEmissCO2E": 544204, "Pollutants": [ { "PollutantName": "CH4", "AmtCO2E": 543549 }, { "PollutantName": "CO2", "AmtCO2E": 655 } ] }, 
      { "FacID": 1006817, "FacName": "McCommas Bluff Landfill", "FacLat83": 32.67628, "FacLong83": -96.73391, "FacDistMi": 9.37, "TotEmissCO2E": 420239.25, "Pollutants": [ { "PollutantName": "CH4", "AmtCO2E": 420239.25 } ] },
      { "FacID": 1003945, "FacName": "TEXAS INSTRUMENTS NORTH CAMPUS", "FacLat83": 32.93311, "FacLong83": -96.7537, "FacDistMi": 9.58, "TotEmissCO2E": 531866.507, "Pollutants": [ { "PollutantName": "PFC", "AmtCO2E": 399276.483 }, { "PollutantName": "HFC", "AmtCO2E": 8872.334 }, { "PollutantName": "NF3", "AmtCO2E": 31682.4 }, { "PollutantName": "SF6", "AmtCO2E": 29906.76 }, { "PollutantName": "N2O", "AmtCO2E": 12737.414 }, { "PollutantName": "N2O", "AmtCO2E": 27.416 }, { "PollutantName": "CH4", "AmtCO2E": 23 }, { "PollutantName": "CO2", "AmtCO2E": 49340.7 } ] }
    ] };
    
    drawChart(data);
  }

})(jQuery);
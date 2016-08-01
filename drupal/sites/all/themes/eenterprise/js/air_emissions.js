(function($) {
  "use strict";

  $(document).ready(function() {
    draw();
  });

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
        y = text.attr("y") ? text.attr("y") : 0,
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

  function insertSubscripts(text) {

    text.each(function() {
      var el = d3.select(this);

      var parts = el.text().match(/(.*)([0-9])(.*)/);

      if (parts) {
        el.text('');

        for (var i = 1; i < parts.length; i++) {
          var tspan = el.append('tspan').text(parts[i]);
          if (i == 2) { // subscript
            tspan.attr("baseline-shift", "sub");
            tspan.style("font-size", "80%")
          }
        }
      }
    });
  }

  var drawDonut = function(data, svg, width, height, totalWidth) {

    var emissionsNumberFormat = d3.format(",.0f");

    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
      .range(["#857e00", "#f69000", "#a55d8c"]);

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
      .value(function(d) {
        return d.TotEmissCO2E;
      });

    var svg = d3.select("#air-emissions-chart").append("svg")
      .attr("viewBox", "0 0 " + totalWidth + " " + height)
      .attr("preserveAspectRatio", "xMidYMid")
      .style("max-width", totalWidth + "px")
    // .attr("height", height);

    var donut = svg.append("g")
      .attr("transform", "translate(" + totalWidth / 2 + "," + height / 2 + ")");

    var g = donut.selectAll(".arc")
      .data(pie(data.Facilities))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        return color(d.data.TotEmissCO2E);
      });

    var labels = g.append("text").attr({
      x: function(d, i) {
        var centroid = outerArc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]),
          x = Math.cos(midAngle) * radius,
          sign = (x > 0) ? 1 : -1,
          labelX = x + (5 * sign);
        return labelX;
      },
      y: function(d, i) {
        var centroid = outerArc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]),
          y = Math.sin(midAngle) * radius;
        return y;
      },
      'text-anchor': function(d, i) {
        var centroid = outerArc.centroid(d),
          midAngle = Math.atan2(centroid[1], centroid[0]),
          x = Math.cos(midAngle) * radius;
        return (x > 0) ? "start" : "end";
      },
      dy: 0
    }).text(function(d) {
      return d.data.FacName;
    }).call(wrap, totalWidth / 2 - radius);

    var co2eLabel = labels.append("tspan")
      .attr("x", function() {
        return d3.select(this.parentNode).attr("x")
      })
      .attr("dy", baseDy)
      .attr("class", "emissions-watch-donut-small-subtitle");

    co2eLabel.append("tspan")
      .text(function(d) {
        return emissionsNumberFormat(d.data.TotEmissCO2E) + ' metric tons CO';
      });

    co2eLabel.append("tspan")
      .attr("baseline-shift", "sub")
      .style("font-size", "80%")
      .text("2");

    co2eLabel.append("tspan")
      .text("e");

    labels.append("tspan")
      .text(function(d) {
        return d.data.FacDistMi + ' miles away';
      })
      .attr("x", function() {
        return d3.select(this.parentNode).attr("x")
      })
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
      .text("CO");

    totalEmissionsText.append("tspan")
    // .attr("x", 0)
      .attr("baseline-shift", "sub")
      .style("font-size", "64%")
      .attr("class", "emissions-watch-donut-small-subtitle")
      .text("2");

    totalEmissionsText.append("tspan")
    // .attr("x", 0)
      .attr("class", "emissions-watch-donut-small-subtitle")
      .text("e");

    var lowestLabel;

    labels.each(function() {
      if (!lowestLabel || this.getBoundingClientRect().bottom > lowestLabel.getBoundingClientRect().bottom)
        lowestLabel = this;
    })

    // svg.attr("height", height + lowestLabel.clientHeight);
    svg.attr("viewBox", "0 0 " + totalWidth + " " + (height + lowestLabel.clientHeight))
  }

  var drawChart = function(data) {

    var emissionsNumberFormat = d3.format(",.0f");

    var maxDistance = 0;
    var maxCO2E = 0;

    var facIDMap = {};
    var uniqueGases = {};

    data.Facilities.forEach(function(facility, i) {

      facIDMap[facility.FacID] = i;

      if (facility.FacDistMi > maxDistance)
        maxDistance = facility.FacDistMi;

      if (facility.TotEmissCO2E > maxCO2E)
        maxCO2E = facility.TotEmissCO2E;

      if (facility.Pollutants) {
        facility.Pollutants.forEach(function(pollutant) {
          uniqueGases[pollutant.PollutantName] = 1;
        });
      }

      // TODO: handle missing pollutants case
      // if (facility.Pollutants.length == 0)
      //   facility.Pollutants.push({'PollutantName': 'All', AmtCO2E: facility.TotEmissCO2E});

      var y0 = 0;
      // prepare bar sections
      facility.sections = facility.Pollutants.map(function(pollutant) {
        return {name: pollutant.PollutantName, y0: y0, y1: y0 += +pollutant.AmtCO2E};
      });
    });

    var gasClassMap = {
      'PFC': 'gas-pfc',
      'HFC': 'gas-hfc',
      'NF3': 'gas-nf3',
      'SF6': 'gas-sf6',
      'N2O': 'gas-n2o',
      'CH4': 'gas-ch4',
      'CO2': 'gas-co2'
    }

    // set chart sizes
    var margin = {top: 0, right: 20, bottom: 100, left: 140},
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
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(data.Facilities.map(function(d) {
      return d.FacID
    }));
    ;
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
      .attr("viewBox", "0 0 " + totalWidth + " " + totalHeight)
      .attr("preserveAspectRatio", "xMidYMid")
      .style("max-width", totalWidth + "px")
    // .attr("height", totalHeight);

    // append bar chart
    var graph = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");

    // y-axis
    var yAxisGroup = graph.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // bars
    var facility = graph.selectAll(".facility")
      .data(data.Facilities)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x(d.FacID) + ",0)"
      });

    // bar sections
    var bars = facility.selectAll("rect")
      .data(function(d) {
        return d.sections
      })
      .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) {
        return y(d.y1);
      })
      .attr("height", function(d) {
        return y(d.y0) - y(d.y1);
      })
      .attr("class", function(d) {
        return gasClassMap[d.name];
      });

    // x-axis labels
    var xAxisLabels = graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + -x.rangeBand() / 2 + "," + height + ")")
      .call(xAxis)
      .selectAll(".tick text")
      .style("text-anchor", "start")
      .call(wrap, x.rangeBand());

    // x-axis sublabels
    var co2eLabel = xAxisLabels.append("tspan")
    // .text(function(d) {
    //   return (emissionsNumberFormat(data.Facilities[facIDMap[d]].TotEmissCO2E)) + ' metric tons CO2e';
    // })
      .attr("x", function() {
        return d3.select(this.parentNode).attr("x")
      })
      .attr("dy", baseDy)
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-donut-small-subtitle");

    co2eLabel.append("tspan")
      .text(function(d) {
        return emissionsNumberFormat(data.Facilities[facIDMap[d]].TotEmissCO2E) + ' metric tons CO';
      });

    co2eLabel.append("tspan")
      .attr("baseline-shift", "sub")
      .style("font-size", "80%")
      .text("2");

    co2eLabel.append("tspan")
      .text("e");

    // x-axis sublabels
    xAxisLabels.append("tspan")
      .text(function(d) {
        return (data.Facilities[facIDMap[d]].FacDistMi) + ' miles away';
      })
      .attr("x", function() {
        return d3.select(this.parentNode).attr("x")
      })
      .attr("dy", baseDy)
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-donut-small-subtitle");

    // component labels above bars
    var tspans = xAxisLabels.append("tspan")
      .text(function(d) {
        return data.Facilities[facIDMap[d]].Pollutants.reverse().map(
          function(pollutant) {
            return pollutant.PollutantName + ": ";
          }).join('/');
      }).attr("x", function() {
        return 0
      })
      .attr("y", function(d) {
        return -y(maxCO2E - data.Facilities[facIDMap[d]].TotEmissCO2E) - baseDy * data.Facilities[facIDMap[d]].Pollutants.length
      })
      .attr("text-anchor", "start")
      .attr("class", "emissions-watch-bar-chart-small-subtitle")
      .call(insertLinebreaks)
    // .call(insertSubscripts)

    tspans.selectAll("tspan").call(insertSubscripts);

    xAxisLabels.append("tspan")
      .text(function(d) {
        return data.Facilities[facIDMap[d]].Pollutants.map(
          function(pollutant) {
            return emissionsNumberFormat(pollutant.AmtCO2E);
          }).join('/');
      }).attr("x", function() {
      return x.rangeBand()
    })
      .attr("y", function(d) {
        return -y(maxCO2E - data.Facilities[facIDMap[d]].TotEmissCO2E) - baseDy * data.Facilities[facIDMap[d]].Pollutants.length
      })
      .attr("text-anchor", "end")
      .attr("class", "emissions-watch-bar-chart-small-subtitle")
      .call(insertLinebreaks);

    // y axis label
    yAxisGroup.append("text")
      .text("Emissions")
      .attr("transform", "translate(-140,0)")
      .style("font-size", "80%")
      .append("tspan")
      .text("(metric tons CO2e)")
      .attr("x", 0)
      .attr("dy", baseDy)
      .attr("class", "emissions-watch-bar-chart-small-subtitle")
      .call(insertSubscripts)


    // legend
    var legend = yAxisGroup.append("g")
      .attr("transform", "translate(-140, 50)")
      .attr("class", "legend");

    legend.append("text").text("Legend").attr("x", 0).attr("y", 0).style("fill", "black");

    var offset = baseDy / 2;

    var legendItem = legend.selectAll("g")
      .data(Object.keys(uniqueGases))
      .enter().append("g")

    legendItem.append("rect").attr("width", x.rangeBand() / 3)
      .attr("x", 0)
      .attr("y", function(d, i) {
        return offset + i * baseDy;
      })
      .attr("height", baseDy)
      .attr("class", function(d) {
        return gasClassMap[d];
      });

    legendItem.append("text").text(function(d) {
      return d;
    })
      .attr("x", 0)
      .attr("y", function(d, i) {
        return offset + (i + 1) * baseDy - baseDy / 3;
      })
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + x.rangeBand() / 6 + ",0)")
      .call(insertSubscripts);
  }

  var draw = function() {
    var data = {
      "ZipCentLat83": 32.8, "ZipCentLong83": -96.8, "BuffRadiusMi": 10, "Facilities": [
        {
          "FacID": 1001398,
          "FacName": "Atmos Energy Corporation - Texas",
          "FacLat83": 32.925488,
          "FacLong83": -96.816137,
          "FacDistMi": 8.72,
          "TotEmissCO2E": 544204,
          "Pollutants": [{"PollutantName": "CH4", "AmtCO2E": 543549}, {"PollutantName": "CO2", "AmtCO2E": 655}]
        },
        {
          "FacID": 1006817,
          "FacName": "McCommas Bluff Landfill",
          "FacLat83": 32.67628,
          "FacLong83": -96.73391,
          "FacDistMi": 9.37,
          "TotEmissCO2E": 420239.25,
          "Pollutants": [{"PollutantName": "CH4", "AmtCO2E": 420239.25}]
        },
        {
          "FacID": 1003945,
          "FacName": "TEXAS INSTRUMENTS NORTH CAMPUS",
          "FacLat83": 32.93311,
          "FacLong83": -96.7537,
          "FacDistMi": 9.58,
          "TotEmissCO2E": 531866.507,
          "Pollutants": [{"PollutantName": "PFC", "AmtCO2E": 399276.483}, {
            "PollutantName": "HFC",
            "AmtCO2E": 8872.334
          }, {"PollutantName": "NF3", "AmtCO2E": 31682.4}, {
            "PollutantName": "SF6",
            "AmtCO2E": 29906.76
          }, {"PollutantName": "N2O", "AmtCO2E": 12737.414}, {
            "PollutantName": "CH4",
            "AmtCO2E": 23
          }, {"PollutantName": "CO2", "AmtCO2E": 49340.7}]
        }
      ]
    };

    drawChart(data);
  }

})(jQuery);
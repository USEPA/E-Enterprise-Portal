(function ($) {
  "use strict";

  $(document).ready(function () { 
    var $select = $('select#location-select');

    $select.change(function() {
      var zip = $(this).val();
      var locationText = $(this).find('option:selected').text();
      draw(zip, locationText); 
    });

    $select.trigger('change');
  });

  function formatDate(date, delimiter) {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join(delimiter);
  }

  var drawChart = function(data, locationText) {

  drawMessage('');

  function drawPopulationsAtRisk() {
    
    if (todayData.AQI > 100) {

      var g = graph.append("g")
        .attr("transform", "translate(-"+(m[3] )+","+(h + m[0] + 65)+")")

      var text = g.append("text");
      text.append("tspan")
        .attr("x", 0)
        .text("Today's At Risk")
      text.append("tspan")
        .attr("x", 0)
        .attr("dy", 18)
        .text("Populations")

      if (todayData.AQI > 150) { // all populations at risk 

        var cellPosition = (w + m[1] + m[3]) / 2;

        g.append("text")
          .attr("transform", "translate("+cellPosition+",0)")
          .attr("class", "at-risk-item")
          .attr("text-anchor", "middle")
          .text("Everyone")
      } else { // [lungs, heart, over 55, under 12] at risk

        var cellWidth = (w + m[1] + m[3]) / 5;
        var cellPosition = 150;

        var lungsG = g.append("g")
          .attr("transform", "translate("+cellPosition+", 0)");
        lungsG.append("text")
          .attr("class", "at-risk-item")
          .attr("text-anchor", "middle")
          .text("Lungs");
        lungsG.append("image")
          .attr("class", "at-risk-icon")
          .attr("transform", "translate(-20, 0)")
          .attr("xlink:href", "sites/all/themes/oneepa/images/airnow-lungs.png");

          cellPosition += cellWidth;

        var heartG = g.append("g")
          .attr("transform", "translate("+cellPosition+", 0)")
        heartG.append("text")
          .attr("class", "at-risk-item")
          .attr("text-anchor", "middle")
          .text("Heart");
        heartG.append("image")
          .attr("class", "at-risk-icon")
          .attr("transform", "translate(-20, 0)")
          .attr("xlink:href", "sites/all/themes/oneepa/images/airnow-heart.png");

          cellPosition += cellWidth;

        var adultsText = g.append("text")
          .attr("transform", "translate("+cellPosition+", 0)")
          .attr("text-anchor", "middle");
        adultsText.append("tspan")
          .attr("class", "at-risk-item")
          .text("Adults")
        adultsText.append("tspan")
          .attr("class", "at-risk-item at-risk-item-large")
          .attr("x", 0)
          .attr("dy", 40)
          .text("55")
        adultsText.append("tspan")
          .attr("class", "at-risk-item")
          .attr("x", 0)
          .attr("dy", 18)
          .text("and Over");

        cellPosition += cellWidth;

        var childrenText = g.append("text")
          .attr("transform", "translate("+cellPosition+", 0)")
          .attr("text-anchor", "middle");
        childrenText.append("tspan")
          .attr("class", "at-risk-item")
          .text("Children")
        childrenText.append("tspan")
          .attr("class", "at-risk-item at-risk-item-large")
          .attr("x", 0)
          .attr("dy", 40)
          .text("12")
        childrenText.append("tspan")
          .attr("class", "at-risk-item")
          .attr("x", 0)
          .attr("dy", 18)
          .text("and Under")
        
      }
    }
  }

    var getMap = function(date) {
      var mapUrl  = ['http://files.airnowtech.org/airnow/today/forecast_aqi_', date, '_usa.jpg'].join('');

      return mapUrl;
    }

    // dateStr: yyyy-mm-dd
    function getDate(dateStr) {

      dateStr = dateStr.split('-');

      return new Date(dateStr[0], parseInt(dateStr[1])-1, dateStr[2]) 
    }

    function dateDiffInDays(a, b) {

      var _MS_PER_DAY = 1000 * 60 * 60 * 24;

      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    function getCategoryInfoIndex(aqi) {
      for (var i = 0; i < categoryBounds.length - 1; i++) {
        if (aqi >= categoryBounds[i] && aqi < categoryBounds[i+1]) {
          return i;
        }
      }

      return categoryBounds.length - 2;
    }

    function showPopover(obj, aqi) {
      showPopoverFromCategoryIndex(obj, getCategoryInfoIndex(aqi));
    }

    function showPopoverFromCategoryIndex(obj, categoryInfoIndex) {
      var popover = d3.select(".popover");
      var $popover = $(popover.node());
      
      var bound = obj.getBoundingClientRect();

      var info = categoryInfo[categoryInfoIndex];

      popover.html('<div class="arrow"></div><h3 class="popover-title">'
        +info.header
        +'</h3><div class="popover-content">'+info.body+'</div>'
      );

      popover.style({
        "left": bound.left + window.pageXOffset + obj.clientWidth + 40 + "px",
        "top": bound.top + window.pageYOffset - $popover.height()/2 + "px"
      });

      $popover.show();
    }

    function hidePopover() {
      $(".popover").hide();
    }

    function insertLinebreaks(d) {
      var el = d3.select(this);
      var words = el.text().split('/');
      el.text('');

      for (var i = 0, j = 0; i < words.length; i++) {
        if (words[i]) {
          var tspan = el.append('tspan').text(words[i]);
          if (j > 0) {
            tspan.attr('x', 0).attr('dy', '18');
          }
          j++;
        } else {
          el.attr('y', 27);
        }
      }
    }

    var categoryInfo = [
    {
      header: 'Good', 
      body: 'Air quality is considered satisfactory, and air pollution poses little or no risk. ', 
      cssClass: 'section-good'
    }, {
      header: 'Moderate', 
      body: 'Air quality is acceptable; however, for some pollutants there may be a moderate health '
             +'concern for a very small number of people who are unusually sensitive to air pollution. ', 
      cssClass: 'section-moderate'
    }, {
      header: 'Unhealthy for sensitive groups', 
      body: 'Members of sensitive groups may experience health effects. The general public is not '
             +'likely to be affected. ', 
      cssClass: 'section-unhealthy-for-sensitive'
    }, {
      header: 'Unhealthy', 
      body: 'Everyone may begin to experience health effects; members of sensitive groups may '
            +'experience more serious health effects. ', 
      cssClass: 'section-unhealthy'
    }, {
      header: 'Very unhealthy', 
      body: 'Health warnings of emergency conditions. The entire population is more likely to be affected. ', 
      cssClass: 'section-very-unhealthy'
    }, {
      header: 'Hazardous', 
      body: 'Health alert: everyone may experience more serious health effects. ', 
      cssClass: 'section-hazardous'
    }
    ];

    // define dimensions of graph
    var m = [35, 40, 80, 175]; // margins: top, right, bottom, left
    // var w = 550 - m[1] - m[3]; // width

    var chartTitle = 'My Air Quality';

    var todayData; // store the data point  which contains today's data; not necessarily defined

    var distanceFromToday = {'-1': 'Yesterday', '0': 'Today', '1': 'Tomorrow'};

    var categoryBounds = [0, 51, 101, 151, 201, 301, 500];

    // get max and min dates - this assumes data is sorted
    var minDate = getDate(data[0].DateForecast),
    maxDate = getDate(data[data.length-1].DateForecast);

    // find the maxAQI in the data
    var maxAQI = 0; 
    for(var i in data) {
      if (maxAQI < data[i].AQI)
        maxAQI = data[i].AQI;
    }

    // Find data point corresponding to today
    for (var i in data) {
      if (dateDiffInDays(new Date(), getDate(data[i].DateForecast)) == 0) {
        todayData = data[i];
        break;
      }
    }

    // Only show the categories for which data is present
    var reducedCategoryBounds = categoryBounds.slice(0, Math.max(getCategoryInfoIndex(maxAQI) + 2, 5));
    var maxCategoryBound = reducedCategoryBounds[reducedCategoryBounds.length-1];

    var baseHeight = maxCategoryBound + 125;
    var baseWidth = data.length * 50 + m[1] + m[3];

    // reduced width and height based on data
    var w = baseWidth - m[1] - m[3];
    var h = baseHeight - m[0] - m[2];

    // if 'Unhealthy for sensitive groups' category text is visible
    if (reducedCategoryBounds.length > 3) {
      m[3] += 150; // add to the left margin to make room for the long category text
    }

    if (todayData.AQI > 100) {
      m[2] += 100; // add to the bottom margin to make room for the populations at risk section
    }

    // set x and y scales
    var x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
    var y = d3.scale.linear().domain([0, maxCategoryBound]).range([h, 0]);

    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d, i) {
    // return the X coordinate where we want to plot this datapoint
    return x(getDate(d.DateForecast)); //x(i);
    })
    .y(function(d) {
    // return the Y coordinate where we want to plot this datapoint
    return y(d.AQI);
    });

    function xx(e) { return x(getDate(e.DateForecast)); };
    function yy(e) { return y(e.AQI); };

    var container = d3.select("#my-air-quality-chart").append('div').attr('class', 'my-air-quality-chart-container');
    
    container.style("padding-bottom", (100 * (h + m[0] + m[2]) / (w + m[1] + m[3])) + "%"); 

    // Add an SVG element with the desired dimensions and margin.
    var graph = container.append("svg:svg")
    // .attr("width", w + m[1] + m[3])
    // .attr("height", h + m[0] + m[2])
    .style({
      "width": "100%",
      "height": "100%",
      // "overflow": "visible",
      // "padding-bottom": "99.99%",
      "position": "absolute",
      "left": 0,
      "top": 0
    }).style("max-width", (w + m[1] + m[3]) + "px")
    // .style("max-height", (h + m[0] + m[2]) + "px")
    .attr("viewBox", "0 0 " + (w + m[1] + m[3]) + " " + (h + m[0] + m[2]))
    // .attr("preserveAspectRatio", "xMidYMin slice")
    .attr("aria-labelledby", "my-air-quality-chart-title")
    .attr("version", "1.1")
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    graph.append("title")
    .attr("id", "my-air-quality-chart-title") 
    .text(chartTitle);

    var area = d3.svg.area()
    .interpolate("basis")
    .y(function(d) { return y(d); })
    .x0(-m[3] + m[1])
    .x1(w + m[1]);

    if (todayData) {
      // Fill category background color based on AQI index for today
      var activeCategoryIndex = getCategoryInfoIndex(todayData.AQI);
      var activeCategory = categoryInfo[activeCategoryIndex];

      graph.append("path")
      .datum([categoryBounds[activeCategoryIndex], categoryBounds[activeCategoryIndex+1]])
      .attr("class", activeCategory.cssClass)
      .attr("d", area);

      // Draw populations at risk if needed
      drawPopulationsAtRisk(todayData, graph);
    }

    // Create xAxis
    var xAxis = d3.svg.axis().scale(x).ticks(d3.time.days, 1).tickFormat(function(date){
      var distanceFromTodayLabel = distanceFromToday[dateDiffInDays(new Date(), date)];
      return ((distanceFromTodayLabel ? distanceFromTodayLabel : '') 
             + '/' + d3.time.format("%a/%b %d")(date));
    });
    // Add the x-axis.
    graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

    // Add line breaks to x-axis labels
    graph.selectAll('g.x.axis g text').each(insertLinebreaks);

    // Add CSS class to highlight today's date label in x-axis
    graph.selectAll('g.x.axis g text').attr("class", function(d, i) { 
      return (!todayData || dateDiffInDays(d, getDate(todayData.DateForecast)) != 0) ? '' : ' active-date-text';
    });

    // Create yAxis
    var yAxis = d3.svg.axis().scale(y).tickValues(reducedCategoryBounds).orient("left").tickSize(-w - m[3]);
    // Add the y-axis to the left
    graph.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(-"+(m[3]-m[1]+10)+",0)")
    .call(yAxis);

    // Translate y-axis ticks to the right
    graph.selectAll('.y.axis line.tick')
    .attr("transform", "translate(10,0)")

    // Add category text for the y-axis
    graph.selectAll(".y.axis g").append('text')
    .text(function(cat, i) { return i < reducedCategoryBounds.length - 1 ? categoryInfo[i].header : ''; })
    .attr("transform", function(cat, i) { 
      // vertical centering
      var scale = reducedCategoryBounds[reducedCategoryBounds.length - 1] / h;
      return i + 1 >= categoryBounds.length ? "" 
             : "translate(25, -"+((categoryBounds[i+1] - categoryBounds[i]) / 2 * scale) +")"
    }).attr("alignment-baseline", "middle")
    .attr("class", function(cat, i) { 
      return 'category-label' + ( !todayData || i !=  getCategoryInfoIndex(todayData.AQI) ? '' 
             : ' active-category-text') 
    })
    .on("mouseover", function(d, i) { showPopoverFromCategoryIndex(this, i);})
    .on("mouseout", function(){ hidePopover();});

    // Add the line by appending an svg:path element with the data line we created above
    graph.append("svg:path").attr("d", line(data));

    // Add a group consisting of the data point and a text element labeling the point
    var gnodes = graph.selectAll('g.gnode')
    .data(data)
    .enter()
    .append('g')
    .classed('gnode', true)

    gnodes.append("text")
    .attr("x", function(d) { return x(getDate(d.DateForecast)); })
    .attr("y", function(d) { return y(d.AQI) - 20})
    // .attr("dy", ".35em")
    .attr("class", function(d) { 
      return !todayData || d.DateForecast != todayData.DateForecast ? '' : 'active-category-text' })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.AQI; });

    gnodes.append("circle")
    .attr("fill", "#454545")
    .attr("r", 5)
    .attr("stroke", "white")
    .attr("stroke-width", 40)
    .attr("stroke-opacity", 0)
    .attr("cx", xx)
    .attr("cy", yy)
    .on("mouseover", function(d) { showPopover(this, d.AQI);})
    .on("mouseout", function(){ hidePopover();});

    // Append reporting area
    graph.append("text")
    .attr("x", (w) / 2)
    .attr("y", -m[0]/2)
    .attr("text-anchor", "middle") 
    .attr("class", "aqi-location") 
    .text(locationText);

    // Append popover
    var tooltip = d3.select('#my-air-quality-chart')
    .append("div")
    .attr("class", "popover right");
  }

  var drawMessage = function(msg) {
    d3.select("#my-air-quality-chart").html(msg);
  }

  var draw = function(zipCode, locationText) {

    function parseData(responseData) {
      var data = [];

      var maxAQI = 0;

      // for each date, find the max component AQI and add it
      for (var i = 0; i < responseData.length; i ++) {
        
        if (responseData[i].AQI > maxAQI)
          maxAQI = responseData[i].AQI;

        // insert new entry 
        if (i + 1 == responseData.length || responseData[i].DateForecast != responseData[i+1].DateForecast) { 
          var entry = {
            DateForecast: responseData[i].DateForecast, 
            AQI: maxAQI,
            ReportingArea: responseData[i].ReportingArea,
            StateCode: responseData[i].StateCode
          };
          data.push(entry);
          maxAQI = 0;
        }
      }

      // return [
      //   {'DateForecast': "2015-06-21", 'AQI': 248},
      //   {'DateForecast': "2015-06-22", 'AQI': 200},
      //   {'DateForecast': "2015-06-23", 'AQI': 332},
      //   {'DateForecast': "2015-06-24", 'AQI': 401}
      // ];

      return data;
    }

    drawMessage('Loading...');

    var endpoint = Drupal.settings.basePath + 'my_air_quality_chart_view/api/forecast/zipCode/';

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var params = {
      format: 'application/json',
      zipCode: zipCode,
      date: formatDate(yesterday, '-'),
      distance: 100
    };

    $.getJSON(endpoint, params, function(responseData) {
      var data = parseData(responseData);

      if (data.length > 0)
        drawChart(data, locationText);
      else { // no data; show message
        drawMessage('Air quality information is not available for '+locationText+'.');
      }
    });
  }
})(jQuery);

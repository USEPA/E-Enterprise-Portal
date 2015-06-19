jQuery(document).ready(function () { draw(); });

var drawChart = function(data) {

  console.log(Drupal.settings)

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

  function showPopover(obj, d) {
    var coord = d3.mouse(obj);
    var popover = d3.select(".popover");

    var info = categoryInfo[getCategoryInfoIndex(d)];

    $popover = $('.popover');

    $popover.html('<div class="arrow"></div><h3 class="popover-title">'+info.header+'</h3><div class="popover-content">'+info.body+'</div>');

    popover.style("left", (d3.event.pageX + 25) + "px" );
    popover.style("top", d3.event.pageY - $popover.height() / 2  + "px");

    $popover.show();
  }

  function hidePopover() {
    $(".popover").hide();
  }

  function insertLinebreaks(d) {
    var el = d3.select(this);
    var words = el.text().split('/');
    el.text('');

    for (var i = 0; i < words.length; i++) {
      var tspan = el.append('tspan').html(words[i]);
      if (i > 0)
        tspan.attr('x', 0).attr('dy', '20');
    }
  }

  var categoryInfo = [
  {
    header: 'Good', 
    body: 'Air quality is considered satisfactory, and air pollution poses little or no risk. ', 
    cssClass: 'section-good'
  }, {
    header: 'Moderate', 
    body: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people. For example, people who are unusually sensitive to ozone may experience respiratory symptoms. ', 
    cssClass: 'section-moderate'
  }, {
    header: 'Unhealthy for sensitive groups', 
    body: 'Although general public is not likely to be affected at this AQI range, people with lung disease, older adults and children are at a greater risk from exposure to ozone, whereas persons with heart and lung disease, older adults and children are at greater risk from the presence of particles in the air. ', 
    cssClass: 'section-unhealthy-for-sensitive'
  }, {
    header: 'Unhealthy', 
    body: 'Everyone may begin to experience some adverse health effects, and members of the sensitive groups may experience more serious effects. ', 
    cssClass: 'section-unhealthy'
  }, {
    header: 'Very unhealthy', 
    body: 'This would trigger a health alert signifying that everyone may experience more serious health effects. ', 
    cssClass: 'section-very-unhealthy'
  }, {
    header: 'Hazardous', 
    body: 'This would trigger a health warnings of emergency conditions. The entire population is more likely to be affected. ', 
    cssClass: 'section-hazardous'
  }
  ];

  // define dimensions of graph
  var m = [80, 40, 80, 350]; // margins
  var w = 550 - m[1] - m[3]; // width
  var h = 600 - m[0] - m[2]; // height

  var chartTitle = 'My Air Quality';

  var todayData; // store the data point  which contains today's data; not necessarily defined

  var distanceFromToday = {'-1': 'Yesterday', '0': 'Today', '1': 'Tomorrow'};

  var categoryBounds = [0, 51, 101, 151, 201, 301, 500];


  // get max and min dates - this assumes data is sorted
  var minDate = getDate(data[0].date),
  maxDate = getDate(data[data.length-1].date);

  // find the maxAQI in the data
  var maxAQI = 0; 
  for(var i in data) {
    if (maxAQI < data[i].aqi)
      maxAQI = data[i].aqi;
  }

  // Only show the categories for which data is present
  var reducedCategoryBounds = categoryBounds.slice(0, getCategoryInfoIndex(maxAQI) + 2);
  var maxCategoryBound = reducedCategoryBounds[reducedCategoryBounds.length-1];

  var baseHeight = maxCategoryBound + 125;

  // reduce height based on data
  h = baseHeight - m[0] - m[2];

  // set x and y scales
  var x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
  var y = d3.scale.linear().domain([0, maxCategoryBound]).range([h, 0]);

  // create a line function that can convert data[] into x and y points
  var line = d3.svg.line()
  // assign the X function to plot our line as we wish
  .x(function(d, i) {
  // return the X coordinate where we want to plot this datapoint
  return x(getDate(d.date)); //x(i);
  })
  .y(function(d) {
  // return the Y coordinate where we want to plot this datapoint
  return y(d.aqi);
  });

  function xx(e) { return x(getDate(e.date)); };
  function yy(e) { return y(e.aqi); };

  // Add an SVG element with the desired dimensions and margin.
  var graph = d3.select("#chart").append("svg:svg")
  .attr("width", w + m[1] + m[3])
  .attr("height", h + m[0] + m[2])
  .append("svg:g")
  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  // Add chart title
  graph.append("text")
  .attr("x", -m[3])             
  .attr("y", -m[0]/2)
  .attr("text-anchor", "left") 
  .attr("class", "chart-title") 
  .text(chartTitle);

  var area = d3.svg.area()
  .interpolate("basis")
  .y(function(d) { return y(d); })
  .x0(-m[3] + m[1])
  .x1(w + m[1]);

  // Find data point corresponding to today
  for (var i in data) {
    if (dateDiffInDays(new Date(), getDate(data[i].date)) == 0) {
      todayData = data[i];
      break;
    }
  }

  if (todayData) {
  // Fill category background color based on AQI index for today
  var activeCategoryIndex = getCategoryInfoIndex(todayData.aqi);
  var activeCategory = categoryInfo[activeCategoryIndex];

  graph.append("path")
  .datum([categoryBounds[activeCategoryIndex], categoryBounds[activeCategoryIndex+1]])
  .attr("class", activeCategory.cssClass)
  .attr("d", area);
  }

  // Create xAxis
  var xAxis = d3.svg.axis().scale(x).ticks(d3.time.days, 1).tickFormat(function(date){
    var distanceFromTodayLabel = distanceFromToday[dateDiffInDays(new Date(), date)];
    return ((distanceFromTodayLabel ? distanceFromTodayLabel : '&nbsp;') + '/' + d3.time.format("%a/%b %d")(date));
  });;
  // Add the x-axis.
  graph.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);

  // Add line breaks to x-axis labels
  graph.selectAll('g.x.axis g text').each(insertLinebreaks);

  // Add CSS class to highlight today's date label in x-axis
  graph.selectAll('g.x.axis g text').attr("class", function(d, i) { 
    return (!todayData || dateDiffInDays(d, getDate(todayData.date)) != 0) ? '' : ' active-date-text';
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
  .attr("transform", "translate(25, -" + ((h + m[0] + m[2] - 125) / 20) + ")")
  .attr("class", function(cat, i) { return 'category-label' + ( !todayData || i !=  getCategoryInfoIndex(todayData.aqi) ? '' : ' active-category-text') });

  // Add the line by appending an svg:path element with the data line we created above
  graph.append("svg:path").attr("d", line(data));

  // Add a group consisting of the data point and a text element labeling the point
  var gnodes = graph.selectAll('g.gnode')
  .data(data)
  .enter()
  .append('g')
  .classed('gnode', true)

  gnodes.append("text")
  .attr("x", function(d) { return x(getDate(d.date)); })
  .attr("y", function(d) { return y(d.aqi) - 20})
  // .attr("dy", ".35em")
  .attr("class", function(d) { return !todayData || d.date != todayData.date ? '' : 'active-category-text' })
  .attr("text-anchor", "middle")
  .text(function(d) { return d.aqi; });

  gnodes.append("circle")
  .attr("fill", "#454545")
  .attr("r", 5)
  .attr("stroke", "white")
  .attr("stroke-width", 40)
  .attr("stroke-opacity", 0)
  .attr("cx", xx)
  .attr("cy", yy)
  .on("mouseover", function(d) { console.log('over'); showPopover(graph[0][0].parentElement, d.aqi);})
  .on("mouseout", function(){ hidePopover();});

  // Append popover
  var tooltip = d3.select('#chart')
  .append('div')
  .attr('class', 'popover right');   
  }

  var draw = function() {
    var endpoint = 'http://www.airnowapi.org/aq/forecast/zipCode/';

    var params = {
      format: 'application/json',
      zipCode: 20002, // pull from Drupal profile
      date: '2015-06-11', // new Date()
      distance: 100,
      API_KEY: 'C79940FE-7DE3-4388-9A75-F2CAF2940FCD' // pull from Drupal settings
  };

  // won't work since endpoint doesn't include 'Access-Control-Allow-Origin'
  // need to set up a Drupal endpoint to perform this REST request
  /*$.getJSON(endpoint, params, function(data) {
  console.log('data', data);
  });*/
  var data = [{'date': "2015-06-18", 'aqi': 288}, {'date': "2015-06-19", 'aqi': 55}, {'date': "2015-06-20", 'aqi': 93}];
  drawChart(data);
}
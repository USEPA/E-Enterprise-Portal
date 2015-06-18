<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
//drupal_add_js("http://code.jquery.com/jquery-1.10.0.min.js", "file");
drupal_add_js("http://d3js.org/d3.v2.js", "file");
//drupal_add_js(drupal_get_path('theme', 'oneepa') ."/js/air_now_js.js", "file");
drupal_add_css(drupal_get_path('theme', 'oneepa') ."/css/air_now_styles.css", "file");
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <div class="view-content">
    	<div id="chart">    		
		</div>
      <?php //print $rows; ?>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>
<script type="text/javascript">
    var drawChart = function(data) {

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

            //popover.style("left", (coord[0]) + 50 + "px" );
            popover.style("left", (coord[0]) + "px" );
            //popover.style("top", (coord[1]) - $popover.height() / 2 + "px");
            popover.style("top", (coord[1])  + 300 + "px");

            $popover.fadeIn(200);
        }

        function hidePopover() {
            $(".popover").fadeOut(200);
        }

        function insertLinebreaks(d) {
            // console.log(d)
            var el = d3.select(this);
            var words = el.text().split('/');
            el.text('');

            for (var i = 0; i < words.length; i++) {
                var tspan = el.append('tspan').html(words[i]);
                if (i > 0)
                    tspan.attr('x', 0).attr('dy', '20');
            }
        };

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
        var m = [60, 40, 80, 400]; // margins
        var w = 700 - m[1] - m[3]; // width
        var h = 600 - m[0] - m[2]; // height

        var chartTitle = 'My Air Quality';

        var todayData; // store the data point  which contains today's data; not necessarily defined

        var distanceFromToday = {'-1': 'Yesterday', '0': 'Today', '1': 'Tomorrow'};

        var categoryBounds = [0, 51, 101, 151, 201, 301, 500];


// get max and min dates - this assumes data is sorted
        var minDate = getDate(data[0].date),
            maxDate = getDate(data[data.length-1].date);

// set x and y scales
        var x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
        var y = d3.scale.linear().domain([0, 500]).range([h, 0]);

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
        var yAxis = d3.svg.axis().scale(y).tickValues(categoryBounds).orient("left").tickSize(-w - m[3]);
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
            .text(function(cat, i) { return i < categoryInfo.length ? categoryInfo[i].header : ''; })
            .attr("transform", "translate(25, -" + ((h - m[0] - m[2]) / 20 - 5) + ")")
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
            .on("mouseover", function(d) { showPopover(graph[0][0].parentElement, d.aqi);})
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
        var data = [{'date': "2015-06-11", 'aqi': 38}, {'date': "2015-06-12", 'aqi': 55}, {'date': "2015-06-13", 'aqi': 93}];
        drawChart(data);
    }
</script>
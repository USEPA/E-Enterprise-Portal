var map;
var facilityGraphics = [];
define.amd.jQuery = true;
require([
  "esri/map",
	"esri/graphic",
	"esri/SpatialReference",
	"esri/graphicsUtils",
	"esri/InfoTemplate",
	"esri/Color",
	"esri/domUtils",

	"esri/tasks/locator",
	"esri/tasks/query",
	"esri/tasks/GeometryService",
	"esri/tasks/IdentifyTask",
  "esri/tasks/IdentifyParameters",

	"esri/toolbars/draw",
	"esri/toolbars/edit",

	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/symbols/TextSymbol",
	"esri/symbols/Font",
	"esri/symbols/PictureMarkerSymbol",

	"esri/layers/GraphicsLayer",
	"esri/layers/ArcGISDynamicMapServiceLayer",
	"esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/ImageParameters",
	"esri/layers/FeatureLayer",
	"esri/layers/LayerDrawingOptions",
	"esri/renderers/SimpleRenderer",

	"esri/geometry/webMercatorUtils",
	"esri/geometry/Polygon",
	"esri/geometry/Point",
	"esri/geometry/Extent",

	"esri/dijit/Basemap",
	"esri/dijit/BasemapLayer",
	"esri/dijit/BasemapGallery",
	"esri/dijit/Popup",
	"esri/dijit/PopupTemplate",

	"dojo/number",
	"dojo/dom-construct",
	"dojo/parser",
	"dojo/_base/array",
	"dojo/_base/event",
  "dojo/dom",
  "dojo/dom-style",
  "dojo/_base/connect",
  "dijit/registry",
  "dijit/Menu",
  "dojo/dom-class",

	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/Tooltip",
	"dijit/form/Button",
	"dijit/form/Textarea",
	"dijit/form/ToggleButton",

	"dojo/on",
	"dojo/domReady!"

  ], function (
	Map, Graphic, SpatialReference, graphicsUtils, InfoTemplate, Color, domUtils,
	Locator, Query, GeometryService, IdentifyTask, IdentifyParameters,
	Draw, Edit,
	SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, TextSymbol, Font, PictureMarkerSymbol,
	GraphicsLayer, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, ImageParameters, FeatureLayer, LayerDrawingOptions, SimpleRenderer,
	webMercatorUtils, Polygon, Point, Extent,
	Basemap, BasemapLayer, BasemapGallery, Popup, PopupTemplate,
	number, domConstruct, parser, arrayUtils, event, dom, domStyle, connect, registry, Menu, domClass,
	BorderContainer, ContentPane, Tooltip, Button, Textarea, ToggleButton,
	on) {

    parser.parse();
    dojo.ready(init);

    var facilities = [];
    var locator;
    var loading;
    var customLods = [];
    var loadCount = 0;
    var esriImageryLayer, esriStreetLayer, graphicLayer, labelLayer, featureLayer, dynamicMapServiceLayer, subFeatureLayer, subServiceLayer;
    var addMode = false;
    var addSubMode = false;
    var tb;
    var toolbar = false;
    var gg = [];
    var offset = 0;
    var displayingSubLayers = false;
    var showLabels = false;
    var selectedFeatures = [];
    var newSubGraphics = [];
    var first = true;
    var single = true;
    var sym;
    var mileNum = 0;

    function addLods(evt) {
      customLods = customLods.concat(evt.layer.tileInfo.lods);
      loadCount++;
      if (loadCount === 2) {
        setTimeout(
			function () {
			  initMap();
			}, 2000);
      }
    }

    function init() {
      graphicLayer = new GraphicsLayer();
      labelLayer = new GraphicsLayer();

      esriImageryLayer = new ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", {
        displayLevels: [15, 16, 17, 18, 19],
        opacity: 0.6
      });
      esriImageryLayer.on("load", addLods);

      esriStreetLayer = new ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer", {
        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
      });
      esriStreetLayer.on("load", addLods);
    }

    function initMap() {
      //loading = dojo.byId("loadingImg");
      var popup = new Popup({
        anchor: "right",
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
					 new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
      }, dojo.create("div"));

      map = new Map("map", {
        center: [-87.8, 33.8],
        zoom: 5,
        lods: customLods,
        infoWindow: popup,
        logo: false,
        showAttribution: false
      });
      map.on("load", mapItAll);
      map.addLayer(esriStreetLayer);
      map.addLayer(esriImageryLayer);
      //dojo.connect(map, "onUpdateStart", showLoading);
      //dojo.connect(map, "onUpdateEnd", hideLoading);
      dojo.addClass(map.infoWindow.domNode, "myTheme");

      locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
      locator.outSpatialReference = map.spatialReference;
      dojo.connect(locator, "onAddressToLocationsComplete", showResults);

      map.addLayer(labelLayer);
      sym = new SimpleFillSymbol().setColor(new Color([80, 0, 110, 0.1]));
      var name = 'Sub-Facility Data';
      var subFacContent = '<b>Name:</b> ${PRIMARY_NA}<br/><b>Address:</b> ${LOCATION_A}<BR/><b>City:</b> ${CITY_NAME}<BR/><b>County:</b> ${COUNTY_NAM}<br/><b>State:</b> ${STATE_CODE}<BR/>' +
'<b>Zip Code:</b> ${POSTAL_COD}<br/><b>Program:</b> ${PGM_SYS_AC}<br/><b>Interest Type:</b> ${INTEREST_T}<br/><b>Subfacility ID:</b> ${SUB_ID}<br/>' +
"<b>Substance(s):</b> <a target='_blank' href='http://iaspub.epa.gov/sor_internet/registry/substreg/searchandretrieve/advancedsearch/externalSearch.do?p_type=SRSITN&p_value=${OnsiteSubstance1_ID}'>${OnsiteSubstance1}</a>" +
 ", " + "<a target='_blank' href='http://iaspub.epa.gov/sor_internet/registry/substreg/searchandretrieve/advancedsearch/externalSearch.do?p_type=SRSITN&p_value=${OnsiteSubstance2_ID}'>${OnsiteSubstance2}</a>";
      //"<input type='button' onclick='javascript:showErrorReport(\"${PRIMARY_NA}\",${REGISTRY_I},\"${LOCATION_A}\",\"${CITY_NAME}\",\"${STATE_CODE}\",\"${POSTAL_COD}\",\"${LATITUDE}\",\"${LONGITUDE}\");' class='errorButton' value='Report Error'/>";
      var template = new InfoTemplate(name, subFacContent);
      subServiceLayer = new ArcGISDynamicMapServiceLayer("http://arcgis.cgiclouddemo.com/arcgis/rest/services/EEPortal/FRS_Subfac_Examples/MapServer");
      map.addLayer(subServiceLayer);
      subServiceLayer.setVisibleLayers([0]);
      subFeatureLayer = new FeatureLayer("http://arcgis.cgiclouddemo.com/arcgis/rest/services/EEPortal/FRS_Subfac_Examples/MapServer/0", {
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: template
      });

      map.addLayer(subFeatureLayer);
      subFeatureLayer.hide();
      subServiceLayer.hide();

      dojo.connect(popup, "onSetFeatures", function () {
        var graphic = popup.getSelectedFeature();
        setTimeout(
      			function () {
      			  map.centerAt(graphic.geometry);
      			}, 100);
      });

      dojo.connect(map, "onClick", function (evt) {
        mapMoved();
        var query = new Query();
        query.geometry = pointToExtent(map, evt.mapPoint, 10);
        var deferred = subFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);

        if (!addMode) {
          if (deferred !== null && deferred.length > 0) {
            map.infoWindow.setFeatures([deferred]);
            map.infoWindow.show(evt.mapPoint);
          }
        }
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        addPoint(evt);
        addSubFacility(evt);
        deferred.addCallback(function (features) {
        });
      });
    }


    function mapItAll() {
      mapMoved();
      var symbol = new SimpleMarkerSymbol();
      var templateString = "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>Programs:</b> ${Programs}<br />" +
	"<b>Facility Report:</b> <a target='_blank' href='http://iaspub.epa.gov/enviro/fii_query_detail.disp_program_facility?p_registry_id=110005712096'>Open</a><br/>" + "<b>Compliance History:</b> <a target='_blank' href='http://www.epa-echo.gov/cgi-bin/get1cReport.cgi?tool=echo&IDNumber=110005712096'>Open</a><br/>" + "<b>Currently In Compliance:</b> Yes<br/>" +
	"<input type='button' onclick='javascript:showSubLayers(${ID});' class='detailsButton' value='Display Sub-Facilities'/>&nbsp;&nbsp;";
      //+ "<input type='button' onclick='javascript:showErrorReport(\"${Name}\",${RegistryID},\"${Street}\",\"${City}\",\"${State}\",\"${Zip}\",\"${Lat}\",\"${Long}\");' class='errorButton' value='Report Error'/>";

      var templateStringNotCompliant = "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>Programs:</b> ${Programs}<br />" +
		"<b>Facility Report:</b> <a target='_blank' href='http://iaspub.epa.gov/enviro/fii_query_detail.disp_program_facility?p_registry_id=110005712096'>Open</a><br/>" + "<b>Compliance History:</b> <a target='_blank' href='http://www.epa-echo.gov/cgi-bin/get1cReport.cgi?tool=echo&IDNumber=110005712096'>Open</a><br/>" + "<b>Currently In Compliance:</b> No<br/>" +
		"<input type='button' onclick='javascript:showSubLayers(${ID});' class='detailsButton' value='Display Sub-Facilities'/>&nbsp;&nbsp;";
      //"<input type='button' onclick='javascript:showErrorReport(\"${Name}\",${RegistryID},\"${Street}\",\"${City}\",\"${State}\",\"${Zip}\",\"${Lat}\",\"${Long}\");' class='errorButton' value='Report Error'/>";


      var infoTemplate = new InfoTemplate('${Name}', templateString);
      var infoTemplateNotCompliant = new InfoTemplate('${Name}', templateStringNotCompliant);

      var currUrlArr = location.pathname.split("/");
      urlFolder = currUrlArr[1];
      symbol = PictureMarkerSymbol('/' + urlFolder + '/content/map/img/facility.png', 22, 22);
      symbolLightPurple = PictureMarkerSymbol('/' + urlFolder + '/content/map/img/facility_lightpurple.png', 22, 22);


      var f1 = {
        ID: 0,
        Name: 'ABC Corp. Facility 2',
        Street: '5000 RICHMOND ST',
        City: 'PHILADELPHIA',
        State: 'PA',
        Zip: '19137',
        TRIFID: '19137RHMND5000R',
        Lat: 40.002765,
        Long: -75.064065,
        RegistryID: 110000492413,
        Programs: 'CAA, ICIS, NPDES, RCRA, TRI, TSCA',
        Type_of_Facility: 'http://epa.versiform.net/Forms/Edit/185010/764'
      };
      var f1Point = new Point([f1.Long, f1.Lat], new SpatialReference({
        wkid: 4326
      }));

      var f2 = {
        ID: 1,
        Name: 'ABC Corp. Facility 8',
        Street: '2800 CHRISTIAN STREET',
        City: 'PHILADELPHIA',
        State: 'PA',
        Zip: '19146',
        TRIFID: '19146SCHYL2800C',
        Lat: 39.942639,
        Long: -75.187189,
        RegistryID: 110000337029,
        Programs: 'CAA, CAMDBS, E-GGRT, EGRID, EIS, ICIS, OIL, NPDES, RCRA, TRI',
        Type_of_Facility: 'http://epa.versiform.net/Forms/Edit/185010/764'
      };
      var f2Point = new Point([f2.Long, f2.Lat], new SpatialReference({
        wkid: 4326
      }));

      var f3 = {
        ID: 2,
        Name: 'ABC Corp. Facility 4',
        Street: '1001 S. 4TH AVE.',
        City: 'LAUREL',
        State: 'MS',
        Zip: '39440',
        TRIFID: '39440MSNTCSOUTH',
        Lat: 31.678996,
        Long: -89.130307,
        RegistryID: 110000377164,
        Programs: 'CAA, RCRA, EIS, ICIS, OIL, NPDES, TRI'
      };
      var f3Point = new Point([f3.Long, f3.Lat], new SpatialReference({
        wkid: 4326
      }));

      var f4 = {
        ID: 3,
        Name: 'ABC Corp. Facility 11',
        Street: '13050 TEXAS HIGHWAY 185',
        City: 'PORT LAVACA',
        State: 'TX',
        Zip: '77414',
        TRIFID: '77979BPCHMTEXAS',
        Lat: 28.565803,
        Long: -96.836644,
        RegistryID: 110000502867,
        Programs: 'CAA, NPDES, RCRA, TSCA, TRI'
      };
      var f4Point = new Point([f4.Long, f4.Lat], new SpatialReference({
        wkid: 4326
      }));

      var newGraphic = new Graphic(f1Point, symbol, f1, infoTemplate);
      graphicLayer.add(newGraphic);
      facilityGraphics.push(newGraphic);
      newGraphic = new Graphic(f2Point, symbol, f2, infoTemplate);
      graphicLayer.add(newGraphic);
      facilityGraphics.push(newGraphic);
      newGraphic = new Graphic(f3Point, symbolLightPurple, f3, infoTemplateNotCompliant);
      graphicLayer.add(newGraphic);
      facilityGraphics.push(newGraphic);
      newGraphic = new Graphic(f4Point, symbol, f4, infoTemplate);
      graphicLayer.add(newGraphic);
      facilityGraphics.push(newGraphic);
      facilityArray = [f1, f2, f3, f4];
      map.addLayer(graphicLayer);

      map.setExtent(graphicsUtils.graphicsExtent(facilityGraphics));

    }


    function clearStuff() {
      // map.graphics.clear();
    }

    function beginLocate() {
      hideSubLayers();
      map.setExtent(graphicsUtils.graphicsExtent(facilityGraphics).expand(1.4));
    }

    function setMile(n) {
      mileNum = n;
      map.graphics.clear();
    }

    function addCircle(e) {
      map.graphics.clear();
      var pt, radius, circle, ring, pts, angle;
      radius = 1609.34 * mileNum;
      pt = e.mapPoint;
      var polygon = new Polygon(map.spatialReference);
      var points = [];
      for (var i = 0; i <= 360; i += 10) {
        var radian = i * (Math.PI / 180.0);
        var x = pt.x + radius * Math.cos(radian);
        var y = pt.y + radius * Math.sin(radian);
        points.push(new Point(x, y));
      }

      polygon.addRing(points);
      map.graphics.add(new Graphic(polygon, sym));

    }

    function showSubLayers(num) {
      map.graphics.clear();
      if (displayingSubLayers) {
        hideSubLayers();
      } else {
        $('#targetFacility').val(num);
        subFeatureLayer.show();
        subServiceLayer.show();
        $('#selectButton').show();
        $('#filterSubs').show();
        $('#addButton').show();
        //map.addLayer(subFeatureLayer);
        //map.addLayer(subServiceLayer);
        displayingSubLayers = true;
      }
    }

    function hideSubLayers() {
      map.graphics.clear();
      subFeatureLayer.hide();
      subServiceLayer.hide();
      $('#selectButton').hide();
      $('#filterSubs').hide();
      $('#addButton').hide();
      $('.toolbarButtonError').hide();
      //map.removeLayer(subFeatureLayer);
      //map.removeLayer(subServiceLayer);
      displayingSubLayers = false;
    }

    function filterSubLayer(type) {
      var defs = [];
      map.graphics.clear();
      if (type.length > 1) {
        defs[0] = "INTEREST_T = '" + type + "'";
        subFeatureLayer.setDefinitionExpression(defs[0]);
      } else {
        defs[0] = "";
        subFeatureLayer.setDefinitionExpression(defs[0]);
      }
      subServiceLayer.setLayerDefinitions(defs);
      //subFeatureLayer.hide();
    }

    function openForm(url, id) {
      if (id.length > 0) {
        if (id == '110000492413') {
          url = 'http://epa.versiform.net/Forms/Edit/190502/1946?access_token=cf256b79-883c-40ea-b808-7f666150f1f0';
        } else if (id == '110000502867') {
          url = 'http://epa.versiform.net/Forms/Edit/190505/1946?access_token=8e0af9ae-a35c-4721-9e8d-4ff3e53e0bf5';
        } else if (id == '110000377164') {
          url = 'http://epa.versiform.net/Forms/Edit/190504/1946?access_token=557fc956-9bdf-4bc9-8f4a-67e6c7b67ef9';
        } else {
          url = 'http://epa.versiform.net/Forms/Edit/190503/1946?access_token=6f2cbd23-295c-452e-9c7b-06e923563c75';
        }
      }

      var fbwidth = Math.ceil(($(document).width() * 70) / 100);
      var fbheight = Math.ceil(($(document).height() * 65) / 100);
      formWindow = window.open(url, 'form', 'menubar=0,toolbar=0,scrollbars=1,left=100,top=30,height=' + fbheight + ',width=' + fbwidth);
    }

    var facilityArray = [];

    function editAddress(num) {
      var fac = facilityArray[num];
      $('#fname').val(fac.Name);
      $('#fstreet').val(fac.Street);
      $('#fcity').val(fac.City);
      $('#fstate').val(fac.State);
      $('#fzip').val(fac.Zip);
      $('#flat').val(fac.Lat.toFixed(6));
      $('#flong').val(fac.Long.toFixed(6));
      $('#fid').val(fac.RegistryID);
      $('.changeAddress').show();
      $('.toolbarButtonFlip').show();
      map.infoWindow.setFeatures([facilityGraphics[num]]);
      map.infoWindow.show(facilityGraphics[num].geometry);
    }



    function processOthers(featureSet) {
      var lat = featureSet.features[0].attributes.LATITUDE83;
      offset = 0;
      if (featureSet.features.length > 1) {
        dojo.forEach(featureSet.features, function (entry, i) {
          //alert(''+entry.attributes['PGM_SYS_ACRNM']);
          addPoint(lat, entry.attributes.LONGITUDE83, entry.attributes.PGM_SYS_ACRNM);
          //lat=lat-.0005;
          offset = offset + 30;
        });
      }
    }

    function createSymbol(color) {
      var markerSymbol = new SimpleMarkerSymbol();
      markerSymbol.setOffset(0, offset);
      //var graphic = new esri.Graphic(point, symbol);
      //markerSymbol.setPath(path);
      markerSymbol.setColor(new dojo.Color(color));
      markerSymbol.setOutline(null);
      markerSymbol.setSize(9);
      return markerSymbol;
    }

    function createPictureMarker(interestType) {
      var img = 'images/' + interestType.replace('\/', '_') + '.png';
      //img = img;
      var pictureSymbol = new PictureMarkerSymbol(img, 15, 15);
      pictureSymbol.setOffset(0, offset);
      return pictureSymbol;
    }

    function clearOthers() {
      while (gg.length !== 0) {
        map.graphics.remove(gg.pop());
      }
    }

    function setStorage(name, regID, street, city, state, zip, lat, long) {
      sessionStorage.name = name;
      // sessionStorage.address = street;
      sessionStorage.address = street + ' ' + city + ', ' + state + ' ' + zip;
      sessionStorage.city = city;
      sessionStorage.state = state;
      sessionStorage.zip = zip;
      sessionStorage.lat = lat;
      sessionStorage.long = long;
      sessionStorage.regId = regID;

      sessionStorage.firstName = $('#firstName').val();
      sessionStorage.lastName = $('#lastName').val();
      sessionStorage.phoneNumber = $('#phoneNumber').val();
      sessionStorage.areaCode = $('#areaCode').val();
      sessionStorage.email = $('#email').val();
      sessionStorage.userOrg = $('#userOrg').val();
    }

    function stateChange(newState) {
      setTimeout(function () {
        if (newState == -1) {
          locate();
        }
      }, 100);
    }

    function showLoading() {
      //$( ".content-loading" ).show();
      //domUtils.show(loading);
      //map.disableMapNavigation();
      map.hideZoomSlider();
    }

    function hideLoading(error) {
      $(".content-loading").hide();
      //domUtils.hide(loading);
      //map.enableMapNavigation();
      map.showZoomSlider();
    }

    function formatDate(value) {
      var inputDate = new Date(value);
      return dojo.date.locale.format(inputDate, {
        selector: 'date',
        datePattern: 'MMMM d, y'
      });
    }

    function pointToExtent(map, point, toleranceInPixel) {
      var pixelWidth = map.extent.getWidth() / map.width;
      var toleraceInMapCoords = toleranceInPixel * pixelWidth;
      return new Extent(point.x - toleraceInMapCoords, point.y - toleraceInMapCoords, point.x + toleraceInMapCoords, point.y + toleraceInMapCoords, new SpatialReference({
        wkid: 4326
      }));
    }

    function showErrorReport(name, regID, street, city, state, zip, lat, long) {
      sessionStorage.clear();
      setStorage(name, regID, street, city, state, zip, lat, long);
      var fbwidth = Math.ceil(($(document).width() * 75) / 100);
      var fbheight = Math.ceil(($(document).height() * 75) / 100);
      parent.$.fancybox({
        'hideOnContentClick': false,
        'width': fbwidth,
        'height': fbheight,
        'type': 'iframe',
        'scrolling': 'yes',
        'showCloseButton': 'true',
        'beforeClose': function () {
          //alert('close');
          sessionStorage.clear();
        },
        'afterClose': function () {
          //alert('close1');
          sessionStorage.clear();
        },
        'closeClick': true,
        'href': '../eEnterprisePortalDemo/Content/map/error/error_report.html'
      });
    }

    //initialize drawing toolbar
    function initToolbar(map) {
      tb = new Draw(map);
      //find points in Extent when user completes drawing extent
      dojo.connect(tb, "onDrawEnd", findPointsInExtent);
      //set drawing mode to extent
      //tb.activate(esri.toolbars.Draw.EXTENT);
    }

    function activateToolbar() {
      if (!toolbar) {
        tb.activate(Draw.EXTENT);
        toolbar = true;
        map.graphics.clear();
        $('#selectButton').addClass('addMode');
      } else {
        tb.deactivate();
        toolbar = false;
        $('#selectButton').removeClass('addMode');
      }
    }

    //find all points within argument extent
    function findPointsInExtent(extent) {
      var results = [];
      selectedFeatures = [];
      //labelLayer.clear();
      map.graphics.clear();
      $('.toolbarButtonError').show();
      var highlightSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 22, new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL, new Color([247, 34, 101, 0.9]), 2), new Color([207, 34, 171, 0.4]));

      dojo.forEach(subFeatureLayer.graphics, function (graphic) {
        if (extent.contains(graphic.geometry)) {
          //graphic.setSymbol(highlightSymbol);

          var newGraphic = new Graphic(graphic.geometry, highlightSymbol);
          //labelLayer.add(newGraphic);
          map.graphics.add(newGraphic);

          results.push(graphic.getContent());
          var f = {};
          f.name = graphic.attributes.PRIMARY_NA + ' - ' + graphic.attributes.INTEREST_T;
          f.address = graphic.attributes.LOCATION_A + ' ' + graphic.attributes.CITY_NAME + ', ' + graphic.attributes.STATE_CODE + ' ' + graphic.attributes.POSTAL_COD;
          f.lat = graphic.attributes.LATITUDE;
          f.long = graphic.attributes.LONGITUDE;
          f.regID = graphic.attributes.REGISTRY_I + ', SubID: ' + graphic.attributes.SUB_ID;
          selectedFeatures.push(JSON.stringify(f));
        }
        // else if point was previously highlighted, reset its symbology
        else {
          //graphic.setSymbol(defaultSymbol);
        }
      });
      activateToolbar();
      //display number of points in extent
      //dojo.byId("inextent").innerHTML = results.length;
      //var zz = results.join("");
    }

    function multiErrors() {
      if (selectedFeatures.length > 0) {
        setMultiStorage();
        var fbwidth = Math.ceil(($(document).width() * 40) / 100);
        var fbheight = Math.ceil(($(document).height() * 75) / 100);
        parent.$.fancybox({
          'hideOnContentClick': false,
          'width': fbwidth,
          'height': fbheight,
          'type': 'iframe',
          'scrolling': 'yes',
          'showCloseButton': 'true',
          'beforeClose': function () {
            alert('close');
            sessionStorage.clear();
          },
          'afterClose': function () {
            alert('close1');
            sessionStorage.clear();
          },
          'closeClick': true,
          'href': '../eEnterprisePortalDemo/Content/map/error/error_report_custom.html'
        });
      } else {
        alert('Please select sub-facility features.');
      }
    }

    function setMultiStorage() {
      sessionStorage.firstName = $('#firstName').val();
      sessionStorage.lastName = $('#lastName').val();
      sessionStorage.phoneNumber = $('#phoneNumber').val();
      sessionStorage.areaCode = $('#areaCode').val();
      sessionStorage.email = $('#email').val();
      sessionStorage.userOrg = $('#userOrg').val();
      sessionStorage.features = JSON.stringify(selectedFeatures);
    }

    function zoomToFacility(num) {
      if (map.infoWindow.isShowing === true) {
        map.infoWindow.clearFeatures();
        map.infoWindow.hide();
      }
      map.centerAndZoom(facilityGraphics[num].geometry, 16);
      hideSubLayers();
      map.infoWindow.setFeatures([facilityGraphics[num]]);
      map.infoWindow.show(facilityGraphics[num].geometry);
    }

    function engageAddMode() {
      if (addMode) {
        addMode = false;
        $('#newLocButton').removeClass('addMode');
        //map.enableMapNavigation();
        //map.showZoomSlider();
      } else {
        addMode = true;
        map.infoWindow.hide();
        $('#newLocButton').addClass('addMode');
        //map.disableMapNavigation();
        //map.hideZoomSlider();
      }
    }

    function addPoint(evt) {
      if (addMode) {
        $('#collectionMethod').val('Selected from map');
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        updateLatLong(mp.y, mp.x);
        locateCoords();
      }
    }

    function locateCoords() {
      map.graphics.clear();
      var vlong = $('#flong').val();
      var vlat = $('#flat').val();
      var symbol = new SimpleMarkerSymbol();
      symbol.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
      symbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([222, 0, 0]), 2));
      symbol.setColor(new Color('#70B3AA'));
      symbol.setSize(12);

      var f1Point = new Point([vlong, vlat], new SpatialReference({
        wkid: 4326
      }));

      var newGraphic = new Graphic(f1Point, symbol);
      //, f1, infoTemplate);
      map.graphics.add(newGraphic);
      map.centerAndZoom(f1Point, 17);
    }

    function updateLatLong(lat, lon) {
      $('.valueChanged').removeClass('valueChanged');
      $('#flong').val(lon.toFixed(6)).addClass('valueChanged');
      $('#flat').val(lat.toFixed(6)).addClass('valueChanged');
      setTimeout(function () {
        removeValueChangedClass();
      }, 1100);
    }

    function removeValueChangedClass() {
      $('.valueChanged').removeClass('valueChanged');
    }

    function getHTML5Location() {
      if (navigator.geolocation) {
        var html5TimeStamp = null;
        var html5Accuracy = null;

        navigator.geolocation.getCurrentPosition(function (position, html5Error) {
          processGeolocationResult(position);
        });
      } else {
        alert("Sorry, your browser does not support geolocation");
      }
    }

    function html5Error(error) {
      alert('There was a problem retrieving your location: ' + error);
    }

    function processGeolocationResult(position) {
      $('#collectionMethod').val('HTML5 derived current location');
      html5Lat = position.coords.latitude;
      //Get latitude
      html5Lon = position.coords.longitude;
      //Get longitude
      html5TimeStamp = position.timestamp;
      //Get timestamp
      html5Accuracy = position.coords.accuracy;
      //Get accuracy in meters

      map.graphics.clear();
      var symbol = new SimpleMarkerSymbol();
      symbol.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
      symbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([222, 0, 0]), 2));
      symbol.setColor(new Color('#70B3AA'));
      symbol.setSize(12);

      var f1Point = new Point([html5Lon, html5Lat], new SpatialReference({
        wkid: 4326
      }));

      var newGraphic = new Graphic(f1Point, symbol);
      map.graphics.add(newGraphic);
      map.centerAndZoom(f1Point, 17);

      updateLatLong(html5Lat, html5Lon);
    }

    function engageAddSubMode() {
      if (addSubMode) {
        addSubMode = false;
        $('#addButton').removeClass('addMode');
      } else {
        addSubMode = true;
        $('#addButton').addClass('addMode');
      }
    }

    function addSubFacility(evt) {
      if (addSubMode) {
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        var symbol = new SimpleMarkerSymbol();
        symbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
        symbol.setColor(new Color('#70B3AA'));
        symbol.setSize(12);
        var targetFacilityNum = $('#targetFacility').val();
        var targetFacility = facilityArray[targetFacilityNum];
        var newGraphicIndex = newSubGraphics.length;

        var templateString = "<b>Name:</b> <input type='text' style='width:170px;' value='${Name}'/><br />" + "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>Sub Facility ID:</b> <input type='text' style='width:40px;' value=''/><br />" + "<b>Interest Type:</b> <select onchange='changeType(" + newGraphicIndex + ",this.value)'>" + "<option></option>" + "<option value='1'>AIR MAJOR</option>" + "<option value='2'>LQG</option>" + "<option value='3'>NPDES MAJOR</option>" + "<option value='4'>RMP REPORTER</option>" + "<option value='5'>TRI REPORTER</option>" + "</select><br />" + "<input type='button' class='detailsButton' value='Save'/>&nbsp;&nbsp;";
        //"<input type='button' class='errorButton' onclick='removeGraphic(" + newGraphicIndex + ")' value='Delete'/>";

        var infoTemplate = new InfoTemplate('${Name}', templateString);

        var newGraphic = new Graphic(evt.mapPoint, symbol, targetFacility, infoTemplate);
        map.graphics.add(newGraphic);
        newSubGraphics.push(newGraphic);

        addSubMode = false;
        $('#addButton').removeClass('addMode');
      }
    }

    function changeType(i, type) {
      var graphic = newSubGraphics[i];
      switch (type) {
        case '1':
          graphic.setSymbol(new PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/fad822fdc0176a9ef2fb6e3a07b3fc4e', 12, 15));
          break;
        case '2':
          graphic.setSymbol(new PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/7d7fe1f241b35d089c0661f550d75610', 16, 15));
          break;
        case '3':
          graphic.setSymbol(new PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/28196d5eefbdffa3c216adffbe06c36d', 18, 17));
          break;
        case '4':
          graphic.setSymbol(new PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/5f2ddfbf2177b288a0074a5248969244', 11, 19));
          break;
        case '5':
          graphic.setSymbol(new PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/e63dd3742ee2bbb8f880ce99df5bfea6', 17, 16));
          break;
      }
    }

    function removeGraphic(i) {
      map.infoWindow.hide();
      map.graphics.remove(newSubGraphics[i]);
    }

    function locate() {
      map.graphics.clear();
      $('.valueChanged').removeClass('valueChanged');

      var addressStr = $('#fstreet').val() + ' ' + $('#fcity').val() + ' ' + $('#fstate').val() + ', ' + $('#fzip').val();
      var address = {
        "SingleLine": addressStr
      };
      //var address = {"SingleLine":dojo.byId("address").value};
      locator.outSpatialReference = map.spatialReference;
      var options = {
        address: address,
        outFields: ["Loc_name"]
      };
      locator.addressToLocations(options);
    }

    function showResults(candidates) {
      var candidate;
      var symbol = new SimpleMarkerSymbol();
      var infoTemplate = new InfoTemplate("Location", "Address: $" + "{address}<br />Score: $" + "{score}<br />Source locator: $" + "{locatorName}");

      symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
      symbol.setColor(new Color([153, 0, 51, 0.75]));

      var geom;

      dojo.every(candidates, function (candidate) {
        if (candidate.score > 80) {
          var attributes = {
            address: candidate.address,
            score: candidate.score,
            locatorName: candidate.attributes.Loc_name
          };
          geom = candidate.location;
          var graphic = new Graphic(geom, symbol, attributes, infoTemplate);
          //add a graphic to the map at the geocoded location
          map.graphics.add(graphic);
          //add a text symbol to the map listing the location of the matched address.
          var displayText = candidate.address;
          var font = new Font("13pt", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Helvetica");

          var textSymbol = new TextSymbol(displayText, font, new dojo.Color("#666633"));
          textSymbol.setOffset(0, 8);
          map.graphics.add(new Graphic(geom, textSymbol));
          var mp = webMercatorUtils.webMercatorToGeographic(geom);
          updateLatLong(mp.y, mp.x);
          $('#collectionMethod').val('Geocoded address');

          return false;
          //break out of loop after one candidate with score greater  than 80 is found.
        }
      });
      if (geom !== undefined) {
        map.centerAndZoom(geom, 16);
      }
    }

    function mapCenterAndZoomGlobal(geom, lvl) {
      map.centerAndZoom(geom, lvl);
    }


    function mapMoved() {
      map.resize();
      map.reposition();
    }

    window.zoomToFacility = zoomToFacility;
    window.editAddress = editAddress;
    window.showSubLayers = showSubLayers;
    window.hideSubLayers = hideSubLayers;
    window.beginLocate = beginLocate;
    window.engageAddSubMode = engageAddSubMode;
    window.activateToolbar = activateToolbar;
    window.multiErrors = multiErrors;
    window.getHTML5Location = getHTML5Location;
    window.locate = locate;
    window.showErrorReport = showErrorReport;
    window.engageAddMode = engageAddMode;
    window.removeValueChangedClass = removeValueChangedClass;
    window.locateCoords = locateCoords;
    window.mapCenterAndZoomGlobal = mapCenterAndZoomGlobal;
    window.filterSubLayer = filterSubLayer;
  });

dojo.require("esri.map");
dojo.require("esri.tasks.locator");
dojo.require("dojo.number");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.Textarea");
dojo.require("esri.dijit.Popup");
dojo.require("esri.dijit.PopupTemplate");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.layers.agstiled");
dojo.require("esri.toolbars.draw");



var facilities = new Array;
var map, locator;
var loading;
var customLods = [];
var loadCount = 0;
var esriImageryLayer, esriStreetLayer, graphicLayer, labelLayer, featureLayer, dynamicMapServiceLayer, subFeatureLayer, subServiceLayer;
var addMode = false;
var addSubMode = false;
var tb;
var toolbar = false;
var gg = new Array;
var offset = 0;
var facilityGraphics = new Array;
var displayingSubLayers = false;
var showLabels = false;
var selectedFeatures = new Array;
var newSubGraphics = new Array();
var first = true;
var single = true;
var sym;
var mileNum = 0;

//Fill array with levels of detail
function addLods(lyr) {
	customLods = customLods.concat(lyr.tileInfo.lods);
	loadCount++;

	if (loadCount === 1) {
		initMap();
	}
}

function init() {

	graphicLayer = new esri.layers.GraphicsLayer();
	labelLayer = new esri.layers.GraphicsLayer();
	esriImageryLayer = new esri.layers.ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", {
		displayLevels : [15, 16, 17, 18, 19],
		opacity : .6
	});
	if (esriImageryLayer.loaded) {
		addLods(esriImageryLayer);
	} else {
		dojo.connect(esriImageryLayer, "onLoad", addLods);
	}

	// ESRI Street Map service, only levels 11 - 15 used here
	esriStreetLayer = new esri.layers.ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer", {
		displayLevels : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
	});

	// Levels at which this layer will be visible
	if (esriStreetLayer.loaded) {
		addLods(esriStreetLayer);
	} else {
		dojo.connect(esriStreetLayer, "onLoad", addLods);
	}

}

function initMap() {
	loading = dojo.byId("loadingImg");
	//loading image. id

	var popup = new esri.dijit.Popup({
		anchor: "right",
		fillSymbol : new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
	}, dojo.create("div"));

	map = new esri.Map("map", {
		//basemap: "streets",
		center : [-77.46, 38.95],
		zoom : 9,
		lods : customLods,
		infoWindow : popup
	});
	map.addLayer(esriStreetLayer);
	map.addLayer(esriImageryLayer);
	dojo.connect(map, "onUpdateStart", showLoading);
	dojo.connect(map, "onUpdateEnd", hideLoading);
	dojo.addClass(map.infoWindow.domNode, "myTheme");


	sym = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([80, 0, 110, 0.1]));

	dojo.connect(map, "onLoad", initToolbar);

	//Locator stuff:
	locator = new esri.tasks.Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
	locator.outSpatialReference = map.spatialReference;
	dojo.connect(locator, "onAddressToLocationsComplete", showResults);

	//This next line adds everything to the map by default:
	mapItAll();

	map.addLayer(labelLayer);

	var name = 'Sub-Facility Data';

	var content = '<b>Name:</b> ${PRIMARY_NA}<br/><b>Address:</b> ${LOCATION_A}<BR/><b>City:</b> ${CITY_NAME}<BR/><b>County:</b> ${COUNTY_NAM}<br/><b>State:</b> ${STATE_CODE}<BR/>' + '<b>Zip Code:</b> ${POSTAL_COD}<br/><b>Program:</b> ${PGM_SYS_AC}<br/><b>Interest Type:</b> ${INTEREST_T}<br/><b>Subfacility ID:</b> ${SUB_ID}<br/>' + "<b>Substance:</b> <a target='_blank' href='http://iaspub.epa.gov/sor_internet/registry/substreg/searchandretrieve/advancedsearch/externalSearch.do?p_type=SRSITN&p_value=${OnsiteSubstance1_ID}'>${OnsiteSubstance1}</a>" + "<input type='button' onclick='javascript:showErrorReport(\"${PRIMARY_NA}\",${REGISTRY_I},\"${LOCATION_A}\",\"${CITY_NAME}\",\"${STATE_CODE}\",\"${POSTAL_COD}\",\"${LATITUDE}\",\"${LONGITUDE}\");' class='errorButton' value='Report Error'/>";

	var template = new esri.InfoTemplate(name, content);

	subServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("https://arcgis.cgiclouddemo.com/arcgis/rest/services/EEPortal/FRS_Subfac_Examples/MapServer");
	map.addLayer(subServiceLayer);
	subServiceLayer.setVisibleLayers([0]);
	//subServiceLayer.enableMouseEvents();

	subFeatureLayer = new esri.layers.FeatureLayer("https://arcgis.cgiclouddemo.com/arcgis/rest/services/EEPortal/FRS_Subfac_Examples/MapServer/0", {
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		outFields : ["*"],
		infoTemplate : template
	});

	//subFeatureLayer.enableMouseEvents();
	map.addLayer(subFeatureLayer);

	map.addLayer(graphicLayer);

	subFeatureLayer.hide();
	subServiceLayer.hide();

	dojo.connect(popup,"onSetFeatures",function(){
    		//console.log("popup features set");
    		var graphic = popup.getSelectedFeature();
			console.log(graphic);
			setTimeout(
				function (){
					map.centerAt(graphic.geometry);
				}, 100);
			//current zoom level = map.data-zoom
  	});
  		
	dojo.connect(map, "onClick", function(evt) {
		var query = new esri.tasks.Query();
		query.geometry = pointToExtent(map, evt.mapPoint, 10);
		//alert(evt.mapPoint);
		var deferred = subFeatureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW);
		/*
		 subFeatureLayer.queryFeatures(query, function (featureSet) {
		 console.log('size: '+featureSet.features.length);
		 console.log('type: '+featureSet[0].attributes['INTEREST_T']);
		 });
		 */

		if (!addMode) {
			/*
			if(displayingSubLayers){
			deferred = subFeatureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW);
			} else {
			deferred = featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW);
			} */
			//console.log('subdef: '+subDeferred);
			//if(!addMode){
			if (deferred != null && deferred.length > 0) {
				map.infoWindow.setFeatures([deferred]);
				map.infoWindow.show(evt.mapPoint);
			}
			//if(subDeferred){
			//	map.infoWindow.setFeatures([subDeferred]);
			//}
		}
		var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		//var xy = esri.geometry.lngLatToXY(evt.mapPoint.x,evt.mapPoint.y);
		console.log('Point: ' + JSON.stringify(mp));
		// console.log('X: '+mp.x);
		addPoint(evt);
		addSubFacility(evt);
		//console.log('our stuff: '+deferred);
		//map.infoWindow.setFeatures([deferred]);
		//map.infoWindow.show(evt.mapPoint);
		deferred.addCallback(function(features) {
			//console.log('Feature Name: ' + features[0].attributes['PRIMARY_NA']);
		});
	});

}//--End of init map

function clearStuff() {
	// map.graphics.clear();
}

function locate(ad, bool) {
	console.log('Locating: ' + ad);
	labelLayer.clear();
	single = bool;
	showLabels = bool;
	//map.graphics.clear();
	//var address = {"SingleLine":dojo.byId("address").value};
	//locator = new esri.tasks.Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
	var address = {
		"SingleLine" : ad
	};
	//locator.outSpatialReference= map.spatialReference;
	var options = {
		address : address,
		outFields : ["Loc_name"]
	};
	locator.addressToLocations(options);
}

function beginLocate() {
	hideSubLayers();
	var t = setTimeout("getGraphicsExtent(facilityGraphics)", 500);
}

function setMile(n) {
	mileNum = n;
	map.graphics.clear();
}

function addCircle(e) {
	map.graphics.clear();
	console.log("clicked the map: ", e);
	var pt, radius, circle, ring, pts, angle;
	var radius = 1609.34 * mileNum;
	pt = e.mapPoint;

	console.log('x point evt: ' + pt.x);
	var polygon = new esri.geometry.Polygon(map.spatialReference);
	var points = [];
	for (var i = 0; i <= 360; i += 10) {
		var radian = i * (Math.PI / 180.0);
		var x = pt.x + radius * Math.cos(radian);
		var y = pt.y + radius * Math.sin(radian);
		//console.log(x);
		//console.log(y);
		points.push(new esri.geometry.Point(x, y));
	}

	polygon.addRing(points);
	map.graphics.add(new esri.Graphic(polygon, sym));
	//map.graphics.add(new esri.Graphic(circle, sym));
	console.log("added a graphic");

}

function showResults(candidates) {
	console.log("Show results---");
	var candidate;
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	var templateString = "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>TRIFID:</b> ${TRIFID}<br />" + "<a href='http://iaspub.epa.gov/enviro/fii_query_detail.disp_program_facility?p_registry_id=${RegistryID}'>FRS Link</a><br/>" + "<a href='http://www.epa-echo.gov/cgi-bin/get1cReport.cgi?tool=echo&IDNumber=${RegistryID}'>Compliance Link</a><br/>" + "<input type='button' onclick='javascript:showErrorReport();' class='errorButton' value='Report Error'/>";

	var infoTemplate = new esri.InfoTemplate('${Name}', templateString);

	symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);

	/* //This sets the first one to a square, we don't need this.
	 if(first){
	 symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
	 first = false;
	 }
	 */
	symbol.setColor(new dojo.Color('#70B3AA'));
	symbol.setSize(10);

	var geom;

	dojo.every(candidates, function(candidate) {
		console.log(candidate.score);
		if (candidate.score > 80) {
			console.log(candidate.location);
			var attributes = {
				address : candidate.address,
				x : candidate.location.x,
				y : candidate.location.y,
				score : candidate.score,
				locatorName : candidate.attributes.Loc_name
			};
			geom = candidate.location;
			//console.log('geom: '+geom);
			var screenpoint = map.toScreen(geom);
			//console.log(screenpoint);
			var mapPoint = map.toMap(geom);
			//console.log(mapPoint);
			//console.log('map Point: '+geom.toMapGeometry(map.extent, map.width, map.height, mapGeometry));
			var graphic = new esri.Graphic(geom, symbol, attributes, infoTemplate);
			//add a graphic to the map at the geocoded location
			//map.graphics.add(graphic);
			graphicLayer.add(graphic);
			facilityGraphics.push(graphic);

			var f1 = {
		ID : 0,
		Name : 'EXELON CORP PRODUCTION FACILITY',
		Street : '5000 RICHMOND ST',
		City : 'PHILADELPHIA',
		State : 'PA',
		Zip : '19137',
		TRIFID : '19137RHMND5000R',
		Lat : 40.002765,
		Long : -75.064065,
		RegistryID : 110000492413,
		Programs : 'AIRS/AFS, EIS, ICIS, NPDES, RCRA, TRI, TSCA',
		Type_of_Facility : 'http://epa.versiform.net/Forms/Edit/185010/764'
	};
	var f1Point = new esri.geometry.Point([f1.Long, f1.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f2 = {
		ID : 1,
		Name : 'EXELON CORP SCHUYLKILL GENERATING STATION',
		Street : '2800 CHRISTIAN STREET',
		City : 'PHILADELPHIA',
		State : 'PA',
		Zip : '19146',
		TRIFID : '19146SCHYL2800C',
		Lat : 39.942639,
		Long : -75.187189,
		RegistryID : 110000337029,
		Programs : 'CAA, CAMDBS, E-GGRT, EGRID, EIS, ICIS, OIL, NPDES, RCRA, TRI',
		Type_of_Facility : 'http://epa.versiform.net/Forms/Edit/185010/764'
	};
	var f2Point = new esri.geometry.Point([f2.Long, f2.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f3 = {
		ID : 2,
		Name : 'EXELON CORPORATION LAUREL SITE',
		Street : '1001 S. 4TH AVE.',
		City : 'LAUREL',
		State : 'MS',
		Zip : '39440',
		TRIFID : '39440MSNTCSOUTH',
		Lat : 31.678996,
		Long : -89.130307,
		RegistryID : 110000377164,
		Programs : 'CAA, RCRA, EIS, ICIS, OIL, NPDES, TRI'
	};
	var f3Point = new esri.geometry.Point([f3.Long, f3.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f4 = {
		ID : 3,
		Name : 'EXELON USA LLC GREEN LAKE PLANT',
		Street : '13050 TEXAS HIGHWAY 185',
		City : 'PORT LAVACA',
		State : 'TX',
		Zip : '77414',
		TRIFID : '77979BPCHMTEXAS',
		Lat : 28.565803,
		Long : -96.836644,
		RegistryID : 110000502867,
		Programs : 'CAA, NPDES, RCRA, TSCA, TRI'
	};
			var f4Point = new esri.geometry.Point([f4.Long, f4.Lat], new esri.SpatialReference({
				wkid : 4326
			}));

			var newGraphic = new esri.Graphic(f1Point, symbol, f1, infoTemplate);
			graphicLayer.add(newGraphic);
			newGraphic = new esri.Graphic(f2Point, symbol, f2, infoTemplate);
			graphicLayer.add(newGraphic);
			newGraphic = new esri.Graphic(f3Point, symbol, f3, infoTemplate);
			graphicLayer.add(newGraphic);
			newGraphic = new esri.Graphic(f4Point, symbol, f4, infoTemplate);
			graphicLayer.add(newGraphic);
			map.centerAndZoom(f1Point, 12);

			//add a text symbol to the map listing the location of the matched address.
			if (showLabels) {
				var displayText = candidate.address;
				var font = new esri.symbol.Font("10pt", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, "Helvetica");

				var textSymbol = new esri.symbol.TextSymbol(displayText, font, new dojo.Color("#FE1F20"));
				textSymbol.setOffset(0, 8);
				var newGraphic = new esri.Graphic(geom, textSymbol);
				labelLayer.add(newGraphic);
				return false;
				//break out of loop after one candidate with score greater  than 80 is found.
			}
		}
	});
	if (geom !== undefined && single) {
		//map.centerAndZoom(geom,12);
	}

}

function showSubLayers(num) {
	//zoom to the facility
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
		console.log('change filter: ' + type);
	} else {
		defs[0] = "";
		subFeatureLayer.setDefinitionExpression(defs[0]);
		console.log('set to none.');
	}
	subServiceLayer.setLayerDefinitions(defs);
	//subFeatureLayer.hide();
}

function openForm(url, id) {
	//console.log(url);
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

function mapItAll() {
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	var templateString = "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>Programs:</b> ${Programs}<br />" +
	//"<b>TRIFID:</b> ${TRIFID}<br />"+
	"<b>Facility Report:</b> <a target='_blank' href='http://iaspub.epa.gov/enviro/fii_query_detail.disp_program_facility?p_registry_id=110000337029'>Open</a><br/>" + "<b>Compliance History:</b> <a target='_blank' href='http://www.epa-echo.gov/cgi-bin/get1cReport.cgi?tool=echo&IDNumber=110000337029'>Open</a><br/>" +
	//"<input type='button' class='detailsButton' style='margin-bottom:4px;' onclick='openForm(\"http://epa.versiform.net/Forms/Edit/190502/1946?access_token=\",\"${RegistryID}\");' value='Inspect' /></br>"+
	"<input type='button' class='detailsButton' style='margin-bottom:4px;' onclick='openForm(\"http://epa.versiform.net/Forms/Edit/190502/1946?access_token=\",\"110000337029\");' value='Inspect' /></br>" + "<input type='button' onclick='javascript:showSubLayers(${ID});' class='detailsButton' value='Display Sub-Facilities'/>&nbsp;&nbsp;" + "<input type='button' onclick='javascript:showErrorReport(\"${Name}\",${RegistryID},\"${Street}\",\"${City}\",\"${State}\",\"${Zip}\",\"${Lat}\",\"${Long}\");' class='errorButton' value='Report Error'/>";

	var infoTemplate = new esri.InfoTemplate('${Name}', templateString);
	//symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);
	//symbol.setColor(new dojo.Color('#70B3AA'));
	//symbol.setSize(8);
	symbol = esri.symbol.PictureMarkerSymbol('map/img/facility.png', 22, 22);

	var f1 = {
		ID : 0,
		Name : 'EXELON CORP PRODUCTION FACILITY',
		Street : '5000 RICHMOND ST',
		City : 'PHILADELPHIA',
		State : 'PA',
		Zip : '19137',
		TRIFID : '19137RHMND5000R',
		Lat : 40.002765,
		Long : -75.064065,
		RegistryID : 110000492413,
		Programs : 'AIRS/AFS, EIS, ICIS, NPDES, RCRA, TRI, TSCA',
		Type_of_Facility : 'http://epa.versiform.net/Forms/Edit/185010/764'
	};
	var f1Point = new esri.geometry.Point([f1.Long, f1.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f2 = {
		ID : 1,
		Name : 'EXELON CORP SCHUYLKILL GENERATING STATION',
		Street : '2800 CHRISTIAN STREET',
		City : 'PHILADELPHIA',
		State : 'PA',
		Zip : '19146',
		TRIFID : '19146SCHYL2800C',
		Lat : 39.942639,
		Long : -75.187189,
		RegistryID : 110000337029,
		Programs : 'CAA, CAMDBS, E-GGRT, EGRID, EIS, ICIS, OIL, NPDES, RCRA, TRI',
		Type_of_Facility : 'http://epa.versiform.net/Forms/Edit/185010/764'
	};
	var f2Point = new esri.geometry.Point([f2.Long, f2.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f3 = {
		ID : 2,
		Name : 'EXELON CORPORATION LAUREL SITE',
		Street : '1001 S. 4TH AVE.',
		City : 'LAUREL',
		State : 'MS',
		Zip : '39440',
		TRIFID : '39440MSNTCSOUTH',
		Lat : 31.678996,
		Long : -89.130307,
		RegistryID : 110000377164,
		Programs : 'CAA, RCRA, EIS, ICIS, OIL, NPDES, TRI'
	};
	var f3Point = new esri.geometry.Point([f3.Long, f3.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var f4 = {
		ID : 3,
		Name : 'EXELON USA LLC GREEN LAKE PLANT',
		Street : '13050 TEXAS HIGHWAY 185',
		City : 'PORT LAVACA',
		State : 'TX',
		Zip : '77414',
		TRIFID : '77979BPCHMTEXAS',
		Lat : 28.565803,
		Long : -96.836644,
		RegistryID : 110000502867,
		Programs : 'CAA, NPDES, RCRA, TSCA, TRI'
	};
	var f4Point = new esri.geometry.Point([f4.Long, f4.Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var newGraphic = new esri.Graphic(f1Point, symbol, f1, infoTemplate);
	graphicLayer.add(newGraphic);
	facilityGraphics.push(newGraphic);
	newGraphic = new esri.Graphic(f2Point, symbol, f2, infoTemplate);
	graphicLayer.add(newGraphic);
	facilityGraphics.push(newGraphic);
	newGraphic = new esri.Graphic(f3Point, symbol, f3, infoTemplate);
	graphicLayer.add(newGraphic);
	facilityGraphics.push(newGraphic);
	newGraphic = new esri.Graphic(f4Point, symbol, f4, infoTemplate);
	graphicLayer.add(newGraphic);
	facilityGraphics.push(newGraphic);
	//map.centerAndZoom(f1Point,12);
	facilityArray = [f1, f2, f3, f4];

	var t = setTimeout("getGraphicsExtent(facilityGraphics)", 700);

}

var facilityArray = new Array();

function editAddress(num) {
	//console.log(num);
	var fac = facilityArray[num];
	//console.log(fac.Name);
	$('#fname').val(fac.Name);
	$('#fstreet').val(fac.Street);
	$('#fcity').val(fac.City);
	$('#fstate').val(fac.State);
	$('#fzip').val(fac.Zip);
	$('#flat').val(fac.Lat);
	$('#flong').val(fac.Long);
	$('#fid').val(fac.RegistryID);
	$('.changeAddress').show();
	$('.toolbarButtonFlip').show();
	map.infoWindow.setFeatures([facilityGraphics[num]]);
	map.infoWindow.show(facilityGraphics[num].geometry);
}

function getGraphicsExtent(graphics) {
	var geometry, extent, ext;
	dojo.forEach(graphics, function(graphic, i) {
		geometry = graphic.geometry;
		console.log(geometry);

		if ( geometry instanceof esri.geometry.Point) {
			ext = new esri.geometry.Extent(geometry.x - 1, geometry.y - 1, geometry.x + 1, geometry.y + 1, geometry.spatialReference);
		} else if ( geometry instanceof esri.geometry.Extent) {
			ext = geometry;
		} else {
			ext = geometry.getExtent();
		}

		if (extent) {
			extent = extent.union(ext);
		} else {
			extent = new esri.geometry.Extent(ext);
		}
	});
	console.log('EX' + extent);
	map.setExtent(extent);
	return extent;
}

function processOthers(featureSet) {
	var lat = featureSet.features[0].attributes['LATITUDE83'];
	offset = 0;
	if (featureSet.features.length > 1) {
		dojo.forEach(featureSet.features, function(entry, i) {
			//alert(''+entry.attributes['PGM_SYS_ACRNM']);
			addPoint(lat, entry.attributes['LONGITUDE83'], entry.attributes['PGM_SYS_ACRNM']);
			//lat=lat-.0005;
			offset = offset + 30;
		});
	}
}

function addPoint(lat, long, interest) {
	//dojo.forEach(points, function(point) {
	var newPoint = new esri.geometry.Point(long, lat, new esri.SpatialReference({
		wkid : 4326
	}));
	var randomColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
	//var graphic = new esri.Graphic(newPoint, createSymbol(randomColor));
	var graphic = new esri.Graphic(newPoint, createPictureMarker(interest));

	var displayText = interest;
	var font = new esri.symbol.Font("9pt", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, "Helvetica");

	var textSymbol = new esri.symbol.TextSymbol(displayText, font, new dojo.Color("#FFFFFF"));
	textSymbol.setOffset(-12, 8 + offset);
	var gText = new esri.Graphic(newPoint, textSymbol);
	map.graphics.add(gText);

	gg.push(gText);
	gg.push(graphic);
	map.graphics.add(graphic);
	//var t = setTimeout("change()", 700);
	//});
}

function createSymbol(color) {
	var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
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
	var pictureSymbol = new esri.symbol.PictureMarkerSymbol(img, 15, 15);
	pictureSymbol.setOffset(0, offset);
	return pictureSymbol;
}

function clearOthers() {
	while (gg.length != 0) {
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
	setTimeout(function() {
		if (newState == -1) {
			locate();
		}
	}, 100);
}

function showLoading() {
	esri.show(loading);
	//map.disableMapNavigation();
	map.hideZoomSlider();
}

function hideLoading(error) {
	esri.hide(loading);
	//map.enableMapNavigation();
	map.showZoomSlider();
}

function formatDate(value) {
	var inputDate = new Date(value);
	return dojo.date.locale.format(inputDate, {
		selector : 'date',
		datePattern : 'MMMM d, y'
	});
}

function pointToExtent(map, point, toleranceInPixel) {
	var pixelWidth = map.extent.getWidth() / map.width;
	var toleraceInMapCoords = toleranceInPixel * pixelWidth;
	return new esri.geometry.Extent(point.x - toleraceInMapCoords, point.y - toleraceInMapCoords, point.x + toleraceInMapCoords, point.y + toleraceInMapCoords, new esri.SpatialReference({
		wkid : 4326
	}));
	//map.spatialReference );
}

function showErrorReport(name, regID, street, city, state, zip, lat, long) {
	sessionStorage.clear();
	setStorage(name, regID, street, city, state, zip, lat, long);
	var fbwidth = Math.ceil(($(document).width() * 75) / 100);
	var fbheight = Math.ceil(($(document).height() * 75) / 100);
	parent.$.fancybox({
		'hideOnContentClick' : false,
		'width' : fbwidth,
		'height' : fbheight,
		'type' : 'iframe',
		'scrolling' : 'yes',
		'showCloseButton' : 'true',
		'beforeClose' : function() {
			alert('close');
			sessionStorage.clear();
		},
		'afterClose' : function() {
			alert('close1');
			sessionStorage.clear();
		},
		'closeClick' : true,
		'href' : 'error/error_report.html'
	});
}

//initialize drawing toolbar
function initToolbar(map) {
	tb = new esri.toolbars.Draw(map);

	//find points in Extent when user completes drawing extent
	dojo.connect(tb, "onDrawEnd", findPointsInExtent);

	//set drawing mode to extent
	//tb.activate(esri.toolbars.Draw.EXTENT);
}

function activateToolbar() {
	console.log("activate toolbar");
	if (!toolbar) {
		tb.activate(esri.toolbars.Draw.EXTENT);
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
	selectedFeatures = new Array;
	//labelLayer.clear();
	map.graphics.clear();
	$('.toolbarButtonError').show();
	var highlightSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 22, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([247, 34, 101, 0.9]), 2), new dojo.Color([207, 34, 171, 0.4]));

	dojo.forEach(subFeatureLayer.graphics, function(graphic) {
		if (extent.contains(graphic.geometry)) {
			//graphic.setSymbol(highlightSymbol);

			var newGraphic = new esri.Graphic(graphic.geometry, highlightSymbol);
			//labelLayer.add(newGraphic);
			map.graphics.add(newGraphic);

			results.push(graphic.getContent());
			//console.log('G: '+graphic.attributes['INTEREST_T']);
			var f = new Object;
			f.name = graphic.attributes['PRIMARY_NA'] + ' - ' + graphic.attributes['INTEREST_T'];
			f.address = graphic.attributes['LOCATION_A'] + ' ' + graphic.attributes['CITY_NAME'] + ', ' + graphic.attributes['STATE_CODE'] + ' ' + graphic.attributes['POSTAL_COD'];
			f.lat = graphic.attributes['LATITUDE'];
			f.long = graphic.attributes['LONGITUDE'];
			f.regID = graphic.attributes['REGISTRY_I'] + ', SubID: ' + graphic.attributes['SUB_ID'];
			console.log(JSON.stringify(f));
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
	// console.log('zults: '+ zz);
}

function multiErrors() {
	if (selectedFeatures.length > 0) {
		setMultiStorage();
		var fbwidth = Math.ceil(($(document).width() * 40) / 100);
		var fbheight = Math.ceil(($(document).height() * 75) / 100);
		parent.$.fancybox({
			'hideOnContentClick' : false,
			'width' : fbwidth,
			'height' : fbheight,
			'type' : 'iframe',
			'scrolling' : 'yes',
			'showCloseButton' : 'true',
			'beforeClose' : function() {
				alert('close');
				sessionStorage.clear();
			},
			'afterClose' : function() {
				alert('close1');
				sessionStorage.clear();
			},
			'closeClick' : true,
			'href' : 'error/error_report_custom.html'
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
	console.log(sessionStorage.features);
}

function zoomToFacility(num) {
	if (map.infoWindow.isShowing == true) {
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
		var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		console.log('Adding point: ' + JSON.stringify(mp));
		updateLatLong(mp.y, mp.x);
		locateCoords();
	}
}

function locateCoords() {
	map.graphics.clear();
	var vlong = $('#flong').val();
	var vlat = $('#flat').val();
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CROSS);
	symbol.setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([222, 0, 0]), 2));
	symbol.setColor(new dojo.Color('#70B3AA'));
	symbol.setSize(12);

	var f1Point = new esri.geometry.Point([vlong, vlat], new esri.SpatialReference({
		wkid : 4326
	}));

	var newGraphic = new esri.Graphic(f1Point, symbol);
	//, f1, infoTemplate);
	map.graphics.add(newGraphic);
	map.centerAndZoom(f1Point, 17);
}

function updateLatLong(lat, lon) {
	$('.valueChanged').removeClass('valueChanged');
	$('#flong').val(lon).addClass('valueChanged');
	$('#flat').val(lat).addClass('valueChanged');
	var t = setTimeout("removeValueChangedClass()", 1100);
}

function removeValueChangedClass() {
	$('.valueChanged').removeClass('valueChanged');
}

function getHTML5Location() {
	if (navigator.geolocation) {
		var html5TimeStamp = null;
		var html5Accuracy = null;

		navigator.geolocation.getCurrentPosition(function(position, html5Error) {
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
	$('#collectionMethod').val('HTML5 derrived current location');
	html5Lat = position.coords.latitude;
	//Get latitude
	html5Lon = position.coords.longitude;
	//Get longitude
	html5TimeStamp = position.timestamp;
	//Get timestamp
	html5Accuracy = position.coords.accuracy;
	//Get accuracy in meters

	map.graphics.clear();
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CROSS);
	symbol.setOutline(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([222, 0, 0]), 2));
	symbol.setColor(new dojo.Color('#70B3AA'));
	symbol.setSize(12);

	var f1Point = new esri.geometry.Point([html5Lon, html5Lat], new esri.SpatialReference({
		wkid : 4326
	}));

	var newGraphic = new esri.Graphic(f1Point, symbol);
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
	console.log('adding sub facility');
	if (addSubMode) {
		var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		console.log('Adding point: ' + JSON.stringify(mp));
		var symbol = new esri.symbol.SimpleMarkerSymbol();
		symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE);
		symbol.setColor(new dojo.Color('#70B3AA'));
		symbol.setSize(12);
		var targetFacilityNum = $('#targetFacility').val();
		var targetFacility = facilityArray[targetFacilityNum];
		var newGraphicIndex = newSubGraphics.length;

		//var f1Point = new esri.geometry.Point([vlong,vlat],new esri.SpatialReference({ wkid:4326 }));
		var templateString = "<b>Name:</b> <input type='text' style='width:170px;' value='${Name}'/><br />" + "<b>Street:</b> ${Street}<br />" + "<b>City:</b> ${City}<br />" + "<b>State:</b> ${State}<br />" + "<b>Zip:</b> ${Zip}<br />" + "<b>Facility ID:</b> ${RegistryID}<br />" + "<b>Sub Facility ID:</b> <input type='text' style='width:40px;' value=''/><br />" + "<b>Interest Type:</b> <select onchange='changeType(" + newGraphicIndex + ",this.value)'>" + "<option></option>" + "<option value='1'>AIR MAJOR</option>" + "<option value='2'>LQG</option>" + "<option value='3'>NPDES MAJOR</option>" + "<option value='4'>RMP REPORTER</option>" + "<option value='5'>TRI REPORTER</option>" + "</select><br />" + "<input type='button' class='detailsButton' value='Save'/>&nbsp;&nbsp;" + "<input type='button' class='errorButton' onclick='removeGraphic(" + newGraphicIndex + ")' value='Delete'/>";

		var infoTemplate = new esri.InfoTemplate('${Name}', templateString);

		var newGraphic = new esri.Graphic(evt.mapPoint, symbol, targetFacility, infoTemplate);
		map.graphics.add(newGraphic);
		newSubGraphics.push(newGraphic);

		addSubMode = false;
		$('#addButton').removeClass('addMode');
	}
}

function changeType(i, type) {
	console.log('change graphic: ' + i + ' to type: ' + type);
	var graphic = newSubGraphics[i];
	switch(type) {
	case '1':
		graphic.setSymbol(new esri.symbol.PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/fad822fdc0176a9ef2fb6e3a07b3fc4e', 12, 15));
		break;
	case '2':
		graphic.setSymbol(new esri.symbol.PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/7d7fe1f241b35d089c0661f550d75610', 16, 15));
		break;
	case '3':
		graphic.setSymbol(new esri.symbol.PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/28196d5eefbdffa3c216adffbe06c36d', 18, 17));
		break;
	case '4':
		graphic.setSymbol(new esri.symbol.PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/5f2ddfbf2177b288a0074a5248969244', 11, 19));
		break;
	case '5':
		graphic.setSymbol(new esri.symbol.PictureMarkerSymbol('http://arcgis.cgiclouddemo.com/arcgis/rest/services/Test/FRS_Subfac_Examples/MapServer/0/images/e63dd3742ee2bbb8f880ce99df5bfea6', 17, 16));
		break;
	}
}

function removeGraphic(i) {
	//console.log('removing graphic: '+i);
	map.infoWindow.hide();
	map.graphics.remove(newSubGraphics[i]);
}

function locate() {
	map.graphics.clear();
	$('.valueChanged').removeClass('valueChanged');

	var addressStr = $('#fstreet').val() + ' ' + $('#fcity').val() + ' ' + $('#fstate').val() + ', ' + $('#fzip').val();
	//alert('Address: '+ addressStr);
	var address = {
		"SingleLine" : addressStr
	};
	//var address = {"SingleLine":dojo.byId("address").value};
	locator.outSpatialReference = map.spatialReference;
	var options = {
		address : address,
		outFields : ["Loc_name"]
	};
	locator.addressToLocations(options);
}

function showResults(candidates) {
	var candidate;
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	var infoTemplate = new esri.InfoTemplate("Location", "Address: $" + "{address}<br />Score: $" + "{score}<br />Source locator: $" + "{locatorName}");

	symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
	symbol.setColor(new dojo.Color([153, 0, 51, 0.75]));

	var geom;

	dojo.every(candidates, function(candidate) {
		console.log(candidate.score);
		if (candidate.score > 80) {
			console.log(candidate.location);
			var attributes = {
				address : candidate.address,
				score : candidate.score,
				locatorName : candidate.attributes.Loc_name
			};
			geom = candidate.location;
			console.log('Locator X: ' + geom.x);
			var graphic = new esri.Graphic(geom, symbol, attributes, infoTemplate);
			//add a graphic to the map at the geocoded location
			map.graphics.add(graphic);
			//add a text symbol to the map listing the location of the matched address.
			var displayText = candidate.address;
			var font = new esri.symbol.Font("13pt", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, "Helvetica");

			var textSymbol = new esri.symbol.TextSymbol(displayText, font, new dojo.Color("#666633"));
			textSymbol.setOffset(0, 8);
			map.graphics.add(new esri.Graphic(geom, textSymbol));

			var mp = esri.geometry.webMercatorToGeographic(geom);
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
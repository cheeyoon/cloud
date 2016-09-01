google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
  var mapOptions = {
    center: new google.maps.LatLng(17.957832,-27.667675),
    zoom: 2,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
    },
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    panControl: false,
    streetViewControl: false,
    draggable : true,
    overviewMapControl: false,
    overviewMapControlOptions: {
      opened: false,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
      { "color": "#d3d3d3" }
      ]
    },{
      "featureType": "transit",
      "stylers": [
      { "color": "#808080" },
      { "visibility": "off" }
      ]
    },{
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
      { "visibility": "on" },
      { "color": "#b3b3b3" }
      ]
    },{
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
      { "color": "#ffffff" }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
      { "visibility": "on" },
      { "color": "#ffffff" },
      { "weight": 1.8 }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
      { "color": "#d7d7d7" }
      ]
    },{
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
      { "visibility": "on" },
      { "color": "#ebebeb" }
      ]
    },{
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
      { "color": "#a7a7a7" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
      { "color": "#ffffff" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
      { "color": "#ffffff" }
      ]
    },{
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
      { "visibility": "on" },
      { "color": "#efefef" }
      ]
    },{
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
      { "color": "#696969" }
      ]
    },{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
      { "visibility": "on" },
      { "color": "#737373" }
      ]
    },{
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
      { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
      { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
      { "color": "#d6d6d6" }
      ]
    },{
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
      { "visibility": "off" }
      ]
    },{
    },{
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
      { "color": "#dadada" }
      ]
    }
    ],
  }
  var mapElement = document.getElementById('gmap');
  var map = new google.maps.Map(mapElement, mapOptions);
  var locations = [
  ['SIMPLE SMOKES AND VAPORS', '2760 S Harbor Blvd<br>Santa Ana, CA 92704<br>United States', '+1 657-205-8141', 'simplesmokes@gmail.com<br>', 'www.simplesmokes.com', 33.710061, -117.920310, 'https://mapbuildr.com/assets/img/markers/ellipse-black.png'],
  ['SIMPLE SMOKES AND VAPORS', '7835 Westminster Blvd<br>Westminster, CA 92683<br>United States', '+1 949-357-0633', 'simplesmokes@gmail.com<br>', 'www.simplesmokes.com', 33.759462, -117.992396, 'https://mapbuildr.com/assets/img/markers/ellipse-black.png'],
  ['VAPESTORE 蒸汽士多', '#406 18 Long Dong Shan Zhuang Da Jie Tianhe Qu<br>Guangzhou Shi, Guangdong Sheng<br>China', '', 'service@vapestore.cn<br>', 'www.vapestore.cn', 23.202667, 113.363409, 'https://mapbuildr.com/assets/img/markers/ellipse-black.png'],
  ['VAPE HARDWARE 蒸氣五金行', 'Taipei, Taiwan', '', 'service@vape-hardware.com<br>', 'www.vape-hardware.com', 25.032969, 121.565418, 'https://mapbuildr.com/assets/img/markers/ellipse-black.png']
  ];
  for (i = 0; i < locations.length; i++) {
    if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
    if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
    if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
    if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
    if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
    marker = new google.maps.Marker({
      icon: markericon,
      position: new google.maps.LatLng(locations[i][5], locations[i][6]),
      map: map,
      title: locations[i][0],
      desc: description,
      tel: telephone,
      email: email,
      web: web
    });
    if (web.substring(0, 7) != "http://") {
      link = "http://" + web;
    } else {
      link = web;
    }
    bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
  }
  function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
    var infoWindowVisible = (function () {
      var currentlyVisible = false;
      return function (visible) {
        if (visible !== undefined) {
          currentlyVisible = visible;
        }
        return currentlyVisible;
      };
    }());
    iw = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
     if (infoWindowVisible()) {
       iw.close();
       infoWindowVisible(false);
     } else {
       var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;font-size:12px;'><b>"+title+"</b><p>"+desc+"<p><a href='mailto:"+email+"' >"+email+"<a><a href='"+link+"'' >"+web+"<a></div>";
       iw = new google.maps.InfoWindow({content:html});
       iw.open(map,marker);
       infoWindowVisible(true);
     }
   });
    google.maps.event.addListener(iw, 'closeclick', function () {
      infoWindowVisible(false);
    });
  }
}
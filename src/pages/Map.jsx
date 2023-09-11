import { useEffect } from 'react';

function Map() {
  // map과 locPosition을 상위 스코프에 선언
  let map;
  let locPosition;

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const script = document.createElement('script');
    script.src =
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=f96d44b4551fd9c5ecb3902dd62f3199&libraries=services&autoload=false`;
    script.onload = () => kakao.maps.load(initMap);
    document.head.appendChild(script);
};

const initMap = () => {
  let container = document.getElementById('map');
  let options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };

// 이 부분에서는 이미 선언된 변수에 값을 할당하므로 let 키워드를 제거합니다.
map=new kakao.maps.Map(container,options);

if (navigator.geolocation) { 
 navigator.geolocation.getCurrentPosition(function(position) { 
   var lat=position.coords.latitude,
       lon=position.coords.longitude;
   locPosition=new kakao.maps.LatLng(lat,lon);
   var message='<div style="padding:5px;">여기에 계신가요?!</div>';
   displayMarker(locPosition,message); 

   //장소검색 객체 생성
   var ps=new kakao.maps.services.Places(map);

   //키워드로 장소를 검색합니다.
   ps.keywordSearch('동물보호',placesSearchCB);
 });

 // eslint-disable-next-line no-inner-declarations
 function placesSearchCB(data,status,pagination){
     if(status===kakao.maps.services.Status.OK){
         for(var i=0;i<data.length;i++){
             displayPlaceMarker(data[i]);
         }
         
         // 다시 사용자의 현재 위치로 중심 이동 및 확대 레벨 조정
         map.setCenter(locPosition);
         map.setLevel(2); // 원하는 확대 레벨로 설정
     }
 }

} else { 
 locPosition=new kakao.maps.LatLng(33.450701,126.570667);
 var message='geolocation을 사용할수 없어요..';
 displayMarker(locPosition,message);  
}

function displayMarker(locPosition,message) {  
 var marker=new kakao.maps.Marker({  
     map: map,
     position: locPosition
 });

 var iwContent=message,
     iwRemoveable=true;

 var infowindow=new kakao.maps.InfoWindow({
     content : iwContent,
     removable : iwRemoveable
 });

 infowindow.open(map,marker); 

 map.setCenter(locPosition);      
}

function displayPlaceMarker(place){
var marker=new kakao.maps.Marker({
map: map,
position: new kakao.maps.LatLng(place.y, place.x)
});

var infowindow=new kakao.maps.InfoWindow({
content : '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
removable : true
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'click', function() {
if (infowindow.getMap()) {
    infowindow.close();
} else {
    infowindow.open(map, marker);
}
});
}

};

return (
<div id="map" style={{ height:'100vh', width:'100%' }}></div>
);
}

export default Map;

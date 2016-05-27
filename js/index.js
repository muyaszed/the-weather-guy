$(document).ready(function(){
  var city;
  var region;
  var lat;
  var lon;
  $.get("http://ipinfo.io", function(response) {
    
    city = response.city;
    region = response.region;
    var loc = response.loc;
    var coord = loc.split(',');
    lat = coord[0];
    lon = coord[1];
     console.log(lat);
}, "jsonp");
  
  setTimeout(function(){
    var myCity = city.replace(/\s/g,"%20");
    var myRegion = region.replace(/\s/g,"%20");
    
    var myCityUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=8bf243facaf5b65ab6bb22c52d1d1ef8&q="+myCity+","+myRegion;
    
    var myCityUrl2 = "http://api.openweathermap.org/data/2.5/weather?APPID=8bf243facaf5b65ab6bb22c52d1d1ef8&lat="+lat+"&"+"lon="+lon;
    
    var id;
    var myCelcius;
    var realCelcius;
    var myFar;
    var realFar;
    var realCityUrl
    
    if (myCity=="" || myRegion=="") {
      realCityUrl = myCityUrl2;
    }else {
      realCityUrl = myCityUrl;
    }
    
   console.log(myCityUrl2);
    $.get(realCityUrl, function(weather) {
    
    
      console.log(realCityUrl);
      myCelcius = weather.main.temp - 273.15;
      realCelcius = myCelcius.toFixed(1);
      myFar = (weather.main.temp*(9/5)) - 459.67;
      realFar = myFar.toFixed(1);
      id = weather.weather[0].id;
      console.log(id);
      var myIconUrl = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
      
     
      $(".temp").html(realCelcius);
      $(".location").html(city + ", "+region);
      $(".my-icon").attr("src", myIconUrl);
      $(".cond").html(weather.weather[0].main);
   
      
      if(realCelcius > 35){
          $("#main").css({"background": "url('http://i25.photobucket.com/albums/c62/muyaszed/sahara-188683_1280.jpg') no-repeat", "background-size": "cover"});
   }else if (id >= 200 && id <= 531) {
          $("#main").css({"background": "url('http://i25.photobucket.com/albums/c62/muyaszed/rain-275317_1280.jpg') no-repeat", "background-size": "cover"});
   }else if (id >= 701 && id <= 781) {
     
          $("#main").css({"background": "url('http://i25.photobucket.com/albums/c62/muyaszed/trees-699427_1280.jpg') no-repeat", "background-size": "cover"});
   }else if(id >= 600 && id <= 622) {
          $("#main").css({"background": "url('http://i25.photobucket.com/albums/c62/muyaszed/winter-581101_1280.jpg') no-repeat", "background-size": "cover"});
   }else if (id >= 800 && id <= 804) {
          $("#main").css({"background": "url('http://i25.photobucket.com/albums/c62/muyaszed/lighthouse-600583_1280.jpg') no-repeat", "background-size": "cover"});
   }
      
      
      
   
      
      
});
    
     var tempStat = 1;
    
    $(".temp").click(function(){
      
      if(tempStat==1){
        $(".temp").html(realFar);
        $(".celcius").html("fahrenheit");
        tempStat = 0;
      }else {
        $(".temp").html(realCelcius);
        $(".celcius").html("celcius");
        tempStat = 1;
      }
          
    });
    
    
     
    
    
    
  }, 1000);
  
  

  
});
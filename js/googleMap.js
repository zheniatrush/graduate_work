$(window).load(function(){
	var mapUrl = "http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Brooklyn,+New+York,+NY,+United+States&amp;aq=0&amp;sll=37.0625,-95.677068&amp;sspn=61.282355,146.513672&amp;ie=UTF8&amp;hq=&amp;hnear=Brooklyn,+Kings,+New+York&amp;ll=40.649974,-73.950005&amp;spn=0.01628,0.025663&amp;z=14&amp;iwloc=A&amp;output=embed",
 		onLoadWebSite = false,
   		googleMapHolder = $(".google_map"),
        backgroundColor = googleMapHolder.css("backgroundColor"),
        mapWidth=googleMapHolder.css("width"),
        mapHeight=googleMapHolder.css("height"),
        borderTopLeftRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderTopRightRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderBottomLeftRadius = googleMapHolder.css("borderTopLeftRadius"),
        borderBottomRightRadius = googleMapHolder.css("borderTopLeftRadius"),
        addMap=false,
		idPage,
		intervalCall;
	    
    if(backgroundColor == "rgba(0, 0, 0, 0)"){
        backgroundColor= "#ffffff";
    }
    verificationPageHandler();
    if(onLoadWebSite == false){
        $(window).bind("hashchange", verificationPageHandler);
    }
    function verificationPageHandler(){
        if(onLoadWebSite == false){
        	idPage = "#"+window.location.hash.substring(3, window.location.hash.length);
        	if(idPage != "#"){
				if(googleMapHolder.parents(idPage).length != 0){
	                addGoogleMapHandler();
	                
       			}	
        	}
        }else{
            addGoogleMapHandler();
        }
    }
    function addGoogleMapHandler(){
        if(!addMap){
            addMap = true;
            $(window).unbind("hashchange", verificationPageHandler);
            googleMapHolder.css({"overflow":"hidden"});
            //googleMapHolder.append("<div id='loaderPart' style='position:absolute; z-index:1; width:"+mapWidth+"; height:"+mapHeight+"; background:"+backgroundColor+" url(images/googleMapLoader.gif) no-repeat 50%; border-top-left-radius:"+borderTopLeftRadius+"; border-top-right-radius:"+borderTopRightRadius+"; border-bottom-right-radius:"+borderBottomLeftRadius+"; border-bottom-left-radius:"+borderBottomRightRadius+";'></div>");
            googleMapHolder.append("<div id='loaderPart' style='position:absolute; z-index:1; width:"+mapWidth+"; height:"+mapHeight+"; background:"+backgroundColor+"; border-top-left-radius:"+borderTopLeftRadius+"; border-top-right-radius:"+borderTopRightRadius+"; border-bottom-right-radius:"+borderBottomLeftRadius+"; border-bottom-left-radius:"+borderBottomRightRadius+";'></div>");
            intervalCall = setInterval(addIframe, 200)
        }
        function addIframe(){
        	if($(idPage).css("display")!="none"){
        		clearInterval(intervalCall);
	     	  	googleMapHolder.append("<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1096.7239301041536!2d31.580449988856298!3d50.93702479771133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d567be50db0cb3%3A0x26a59d8aedd75bde!2z0LLRg9C7LiDQktC-0LrQt9Cw0LvRjNC90LAsIDYsINCd0L7RgdGW0LLQutCwLCDQp9C10YDQvdGW0LPRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDE3MTAw!5e1!3m2!1sru!2sua!4v1716739332835!5m2!1sru!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>");
	        	googleMapHolder.find("iframe").load(googleMapLoadCompleteHandler);
			}
        }
    }
    function googleMapLoadCompleteHandler(){
    	var loaderPart = googleMapHolder.find("#loaderPart");
        mapSpinner.stop();
        loaderPart.delay(100).fadeOut(500, function(){loaderPart.css({"display":"none"});});
        
    }
})
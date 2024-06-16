include('js/jquery.easing.1.3.js');
include('js/jquery-ui-1.8.11.custom.min.js');
include('js/jquery.transform-0.9.3.min.js');
include('js/jquery.animate-colors-min.js');
include('js/jquery.backgroundpos.min.js');
include('js/mathUtils.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/jquery.mousewheel.js');
include('js/sprites.js');
include('js/forms.js');
include('js/hoverSprite.js');
include('js/googleMap.js');
include('js/spin.js');
include('js/jcarousellite_1.0.1.min.js');
include('js/jquery.fancybox-1.3.4.pack.js');
//----Include-Function----
function include(url){ 
  document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
//--------global-------------
var isSplash = true;
var isAnim = true;
var spinner;
var mapSpinner;
var MSIE = ($.browser.msie) && ($.browser.version <= 8)

//------DocReady-------------
$(document).ready(function(){ 
    if(location.hash.length == 0){
        location.hash="!/"+$('#content > ul > li:first-child').attr('id');
    }
    ///////////////////////////////////////////////////////////////////
        loaderInit();
function loaderInit(){
        var opts = {
              lines: 13,
              length: 13, 
              width: 6, 
              radius: 17, 
              rotate: 0, 
              color: '#f64225', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target = $(".page_spinner > span");
        spinner = new Spinner(opts).spin();
        target.append(spinner.el) 
        ///////////////////////////////////////
            var opts2 = {
              lines: 12,
              length: 6, 
              width: 3, 
              radius: 8, 
              rotate: 0, 
              color: '#fff', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target2 = $(".google_map > span");
        mapSpinner = new Spinner(opts2).spin();
        target2.append(mapSpinner.el)          
} 
///////////////////////////////////////////////////////////////////

     $('ul#menu').superfish({
          delay:       0,
          animation:   {height:'show'},
          speed:       600,
          autoArrows:  false,
         dropShadows: false,
         	onInit: function(){
  				$("#menu > li > a").each(function(index){
  					//var conText = $(this).find('.mText').text();
                    // $(this).append("<div class='_area'></div><div class='mTextOver'>"+conText+"</div>"); 
                    $(this).append("<div class='_area'></div><div class='_overPl'></div><div class='menuExtra'></div>");   
  				})
  	 		}
        });
});
  
 //------WinLoad-------------  
$(window).load(function(){  

$(".followHolder > ul > li > a").hoverSprite({onLoadWebSite: true});
$(".prevBtn").hoverSprite({onLoadWebSite: true});
$(".nextBtn").hoverSprite({onLoadWebSite: true});

//$('.more').sprites({method:'gStretch',hover:true});

 $("#jcarousel_1").jCarouselLite({
        btnNext: ".nextBtn",
        btnPrev: ".prevBtn",
        speed: 800,
        visible: 4
    });

$('.pic').fancybox({'titlePosition': 'inside', 'overlayColor':'#000'}); 
$('.zoomSp').fadeTo(500, 0)
    $('.zoomSp').hover(function(){ $(this).stop().fadeTo(500, 0.6)	}, function(){$(this).stop().fadeTo(500, 0)})

     $('.closeBtn').hover(
        function(){
            if(!MSIE){
                $(this).find('.closeIcon').stop().animate({'backgroundPosition':'0 100%'}, 350, 'easeOutCubic')
            }else{
                $(this).find('.closeIcon').css({'backgroundPosition':'0 100%'})
            }
        },
        function(){
            if(!MSIE){
                $(this).find('.closeIcon').stop().animate({'backgroundPosition':'0 0%'}, 350, 'easeOutCubic')
            }else{
                $(this).find('.closeIcon').css({'backgroundPosition':'0 0%'})
            }
        }
     )  
       
var menuItems = $('#menu >li'); 

var currentIm = 0;
var lastIm = 0;

//setTimeout(navInit, 3000)
navInit();
function navInit(){
    $('.mSlogan').animate({opacity:0.5}, 1);
    $('.mText_over').animate({opacity:0.2}, 1);
    $('.mSlogan_over').animate({opacity:0.1}, 1);
}

///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');

    $('.menu > ul >li').eq(0).css({'display':'none'});
	var content=$('#content'),
		nav=$('.menu');

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({left:"-1700px",'display':'none'});
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({'display':'block', left:'1700px'}).stop().delay(400).animate({left:"0px"},700,'easeOutCubic');
                
                cont_resize(_.n);
                if ((_.n == 0) && ((_.pren>0) || (_.pren==undefined))){splashMode();}
                if (((_.pren == 0) || (_.pren == undefined)) && (_.n>0) ){contentMode(); }
            }
			if(_.prev){
			     _.prev.stop().animate({left:'-1700px'},700,'easeInOutCubic',function(){_.prev.css({'display':'none'});} );
             }
		}
	})
    

    function splashMode(){
        isSplash = true;
        $('.logoHolder').stop(true).delay(200).animate({top:'130px'}, 400, 'easeInOutCubic');
        
         $("#menu > li").each( function(index){
            _delay = (index*100)+200;
            $(this).css({left:"1700px"}).stop().delay(_delay).animate({left:"0px"}, 900, 'easeOutCubic');
         });
         
         $('.menuHolder').css({'z-index':2})
         $('#content').css({'z-index':1})
    }
    
    function contentMode(){  
        isSplash = false;
        $('.logoHolder').stop(true).animate({top:'0px'}, 400, 'easeInOutCubic');
        
        $("#menu > li").each( function(index){
            _delay = (index*50);
            $(this).stop().delay(_delay).animate({left:"-1700px"}, 900, 'easeInOutCubic');
         });
         
         $('.menuHolder').css({'z-index':1})
         $('#content').css({'z-index':2})
    }
    
    function cont_resize(_page){
        var li_W = $('#content > ul > li').eq(_page).height();
      
        if(li_W < 610){li_W = 610}
            $('#content').stop().animate({height:li_W+"px"}, 600, 'easeInOutCubic', function(){centrRepos();} ).css({'overflow':'visible'}) 
    }		
    
    
	nav.navs({
			useHash:true,
             hoverIn:function(li){
                    if(!MSIE){
                        $("._overPl", li).stop(true).animate({opacity:1}, 400, 'easeOutCubic');
                        $(".menuExtra", li).stop(true).animate({opacity:0}, 400, 'easeOutCubic');
                    }else{
                         $("._overPl", li).css({display:"block"});
                         $(".menuExtra", li).css({display:"none"});
                    }
                   // if(($.browser.msie) && ($.browser.version <= 8)){}else{}
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        if(!MSIE){
                            $("._overPl", li).stop(true).animate({opacity:0}, 600, 'easeOutCubic');
                            $(".menuExtra", li).stop(true).animate({opacity:1}, 400, 'easeOutCubic');
                        }else{
                           $("._overPl", li).css({display:"none"});
                            $(".menuExtra", li).css({display:"block"});
                        }
                    } 
                } 
		}).navs(function(n){			
			$('#content').tabs(n);
		})

//////////////////////////////////////////
    
   	var h_cont;
  
	function centrRepos() {
         h_cont = $('.center').height();
         $('body').animate({'min-height':h_cont+40+'px'},400)
		var h=$(window).height();
		if (h>(h_cont+40)) {
			m_top=~~(h-h_cont)/2;
			h_new=h;
		} else {
			m_top=20;
			h_new=h_cont+40;
		}
		$('.center').stop().animate({'margin-top':m_top},600,'easeOutCubic');

	}
	centrRepos();
    ///////////Window resize///////
    
    function windowW() {
        return (($(window).width()>=parseInt($('body').css('minWidth')))?$(window).width():parseInt($('body').css('minWidth')));
    }
    
    
	$(window).resize(function(){
        centrRepos();
         
        }
    );

    } //window function
) //window load
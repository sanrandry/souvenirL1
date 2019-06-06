function maneno(){
	var son = new Audio();
	son.src = "son.wav";
	son.play();
}

$("#lien1").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.3em'});
});

$("#lien1").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien2").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.3em'});
});

$("#lien2").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien3").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.3em'});
});

$("#lien3").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien4").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.3em'});
});

$("#lien4").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

/************************HORLOGE*******************************/

setInterval("clock()",
1000);



function clock()
{
	var date = new Date();
	var heure = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	/*seconde*/
	function seconde(sec)
	{
		return sec*6;
	}

	var secnd = seconde(sec);
	var totalsec = "rotate(" + secnd + "deg)";
	document.getElementById('secondes').style.transform = totalsec; /*rotate(" + secnd + "deg)/*

	/*minute*/
	function minclock(min,secnd)
	{
		return min*6 + sec*0.1;
	}
	var minut = minclock(min,secnd);
	var totalmin = "rotate(" + minut + "deg)";
	document.getElementById('minutes').style.transform = totalmin;

	/*heure*/
	function hourclock(heure,min)
	{
		return heure*30 + min*0.5;
	}
	if (heure < "12")
	{	
		var hour = hourclock(heure,min);
	}
	else 
	{
		var hour = hourclock(heure-12,min);
	}
	var totalh = "rotate(" + hour + "deg)";
	document.getElementById('heures').style.transform = totalh;
 }

setInterval("afficherDate()",1000);

function afficherDate(){
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var temps = hour +':'+ min + ':' + sec;
	var id = document.getElementById("time");
	id.innerHTML = temps;
}

/******************************/

/***************AFENINA*********************/
$(document).ready(function(){
	$(".sousMenu").hide();
});

$("#menu1").click(function(){
	$("#smenu1").slideToggle();
	$("#smenu2").slideUp();
	$("#smenu3").slideUp();
	$("#smenu4").slideUp();
	maneno();
});

$("#menu2").click(function(){
	$("#smenu2").slideToggle();
	$("#smenu1").slideUp();
	$("#smenu3").slideUp();
	$("#smenu4").slideUp();
	maneno();
});

$("#menu3").click(function(){
	$("#smenu3").slideToggle();
	$("#smenu2").slideUp();
	$("#smenu1").slideUp();
	$("#smenu4").slideUp();
	maneno();
});

$("#menu4").click(function(){
	$("#smenu4").slideToggle();
	$("#smenu2").slideUp();
	$("#smenu3").slideUp();
	$("#smenu1").slideUp();
	maneno();
});
/************************vita***********************/
 $(document).ready(function(){
 	$('#photo1').hide();
 	$('#photo2').hide();
 	$('#photo3').hide();
 	$('#photo4').hide();
});

 /*****************button****************/
/**********button click*****************/
  $("#li1").click(function(){
  	$('#photo1').slideToggle();
  	$('#photo2').slideUp();
  	$('#photo3').slideUp();
  	$('#photo4').slideUp();
  });

$("#li2").click(function(){
  	$('#photo2').slideToggle();
  	$('#photo1').slideUp();
  	$('#photo3').slideUp();
  	$('#photo4').slideUp();
  });

$("#li3").click(function(){
  	$('#photo3').slideToggle();
  	$('#photo1').slideUp();
  	$('#photo2').slideUp();
  	$('#photo4').slideUp();
  });

$("#li4").click(function(){
  	$('#photo4').slideToggle();
  	$('#photo1').slideUp();
  	$('#photo3').slideUp();
  	$('#photo2').slideUp();
  });



/********************vita click**********/
/*****************************************************/
  function scrollY(){
	scrOfY = 0;
	if (typeof(window.pageYOffset == 'number')) {
		scrOfY = window.pageYOffset;
	}
	else if (document.body.scrollTop && (document.body)) {
		scrOfY = document.body.scrollTop;
	}
	else if (document.documentElement.scrollTop && (document.documentElement)) {
		scrOfY = document.documentElement.scrollTop;
	}
	return scrOfY;
}



  $(function(){
  	$('#droite').each(function(){
  		var parent = $(this).parent;
  		var dTop = $(this).offset().top;
  		var elem = $(this);
  		$(window).scroll(function(){
  			if (scrollY()>dTop) {
  				elem.animate({top:scrollY()},60);
  			}
  			else
  			{
  				elem.animate({top:dTop},60);
  			}
  		});
  		if (scrollY()>dTop) {
  				elem.stop().animate({top:scrollY()},60);
  			}
  	});
  });

  /*****************************************/


/******************button over**************/

  $("#li1").mouseover(function(){
  	maneno();
  	$(this).animate({width:'100',height:'90'});
  });
  $("#li1").mouseout(function(){
  	$(this).animate({width:'80',height:'63'});
  });

  $("#li2").mouseover(function(){
  	maneno();
  	$(this).animate({width:'100',height:'90'});
  });
  $("#li2").mouseout(function(){
  	$(this).animate({width:'80',height:'63'});
  });

  $("#li3").mouseover(function(){
  	maneno();
  	$(this).animate({width:'250',height:'90'});
  });
  $("#li3").mouseout(function(){
  	$(this).animate({width:'215',height:'63'});
  });

  $("#li4").mouseover(function(){
  	maneno();
  	$(this).animate({width:'190',height:'90'});
  });
  $("#li4").mouseout(function(){
  	$(this).animate({width:'150',height:'63'});
  });

/************vita************/








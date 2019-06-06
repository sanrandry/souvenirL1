function maneno(){
	var son = new Audio();
	son.src = "son.wav";
	son.play();
}

$("#lien1").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.7em'});
});

$("#lien1").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien2").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.7em'});
});

$("#lien2").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien3").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.7em'});
});

$("#lien3").mouseout(function()
{
	$(this).animate({fontSize: '1.1em'});
});

$("#lien4").mouseover(function()
{
	maneno();
	$(this).animate({fontSize: '1.7em'});
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
/************************vita*************************/

    $(".sary1").mouseover(function () {
        $(this).animate({ width: '350', height: '200'},200);
        $(".sary2").animate({ width: '150', height: '100' },200);
        $(".sary3").animate({ width: '150', height: '100' }, 200);
        maneno();
    });

    $(".sary2").mouseover(function () {
        $(this).animate({ width: '350', height: '200' }, 200);
        $(".sary1").animate({ width: '150', height: '100' }, 200);
        $(".sary3").animate({ width: '150', height: '100' }, 200);
        maneno();
    });

    $(".sary3").mouseover(function () {
        $(this).animate({ width: '350', height: '200' }, 200);
        $(".sary2").animate({ width: '150', height: '100' }, 200);
        $(".sary1").animate({ width: '150', height: '100' }, 200);
        maneno();
    });

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
  				elem.animate({top:scrollY()},70);
  			}
  			else
  			{
  				elem.animate({top:dTop},10);
  			}
  		});
  		if (scrollY()>dTop) {
  				elem.stop().animate({top:scrollY()},70);
  			}
  	});
  });
  /**************************************************************************/
  $(document).ready(function() {
    $("#imagA1").hide();
});



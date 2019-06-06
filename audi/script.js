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
/************************vita*************************/
/*******************lienAudi**************************/
$("#lienA1").mouseover(function()
{
	$(this).animate({fontSize: '1.7em'});
});
$("#lienA1").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
});
$("#lienA3").mouseover(function()
{
	$(this).animate({fontSize: '1.7em'});
});
$("#lienA3").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
});
$("#lienA5").mouseover(function()
{
		$(this).animate({fontSize: '1.7em'});
});
$("#lienA5").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
});
$("#lienA6").mouseover(function()
{
	$(this).animate({fontSize: '1.7em'});
});
$("#lienA6").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
});
$("#lienA7").mouseover(function()
{
	$(this).animate({fontSize: '1.7em'});
});
$("#lienA7").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
});
$("#lienA8").mouseover(function()
{
	$(this).animate({fontSize: '1.7em'});
});
$("#lienA8").mouseout(function()
{
	$(this).animate({fontSize: '1.3em'});
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
/**************************************************************/
$(document).ready(function(){
	$("#imgA1").hide();
	$("#imgA3").hide();
	$("#imgA5").hide();
	$("#imgA6").hide();
	$("#imgA7").hide();
	$("#imgA8").hide();
	});
/**************************************************************/

$("#lienA1").click(function()
{
	$('#imgA1').slideToggle();
	$("#imgA3").slideUp();
	$("#imgA5").slideUp();
	$("#imgA6").slideUp();
	$("#imgA7").slideUp();
	$("#imgA8").slideUp();
});
$("#lienA3").click(function()
{
	$('#imgA3').slideToggle();
	$("#imgA1").slideUp();
	$("#imgA5").slideUp();
	$("#imgA6").slideUp();
	$("#imgA7").slideUp();
	$("#imgA8").slideUp();
});
$("#lienA5").click(function()
{
	$('#imgA5').slideToggle();
	$("#imgA3").slideUp();
	$("#imgA1").slideUp();
	$("#imgA6").slideUp();
	$("#imgA7").slideUp();
	$("#imgA8").slideUp();
});
$("#lienA6").click(function()
{
	$('#imgA6').slideToggle();
	$("#imgA3").slideUp();
	$("#imgA5").slideUp();
	$("#imgA1").slideUp();
	$("#imgA7").slideUp();
	$("#imgA8").slideUp();
});
$("#lienA7").click(function()
{
	$('#imgA7').slideToggle();
	$("#imgA3").slideUp();
	$("#imgA5").slideUp();
	$("#imgA6").slideUp();
	$("#imgA1").slideUp();
	$("#imgA8").slideUp();
});
$("#lienA8").click(function()
{
	$('#imgA8').slideToggle();
	$("#imgA3").slideUp();
	$("#imgA5").slideUp();
	$("#imgA6").slideUp();
	$("#imgA7").slideUp();
	$("#imgA1").slideUp();
});
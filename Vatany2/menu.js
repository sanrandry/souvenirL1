
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
	document.getElementById('secondes').style.transform = totalsec;

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

$('#cache').click(function(){
	$('#boite').animate({opacity : 0},500);
});

$('#app').click(function(){
	$('#boite').animate({opacity : 1},500);
});

$('#image').click(function(){
	$(this).animate({width : 450 , height: 350, top:250, left: 750});
})


/***************************HORLOGE**************************************************/
$(document).ready(function(){
	$('#sous-menu').hide();
});



function maneno(){
	var son = new Audio();
	son.src='son.wav';
	son.play();
}


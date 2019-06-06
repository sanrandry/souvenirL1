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

function equation()
{	
	/*premiere ligne*/
	var a0 = parseInt(document.getElementById('a0').value);
	var b0 = parseInt(document.getElementById('b0').value);
	var c0 = parseInt(document.getElementById("c0").value);
	var d0 = parseInt(document.getElementById("d0").value);

	/*deuxieme ligne*/
	var a1 = parseInt( document.getElementById("a1").value);
	var b1 = parseInt( document.getElementById("b1").value);
	var c1 = parseInt( document.getElementById("c1").value);
	var d1 = parseInt( document.getElementById("d1").value);

	/*troisieme ligne*/
	var a2 = parseInt( document.getElementById("a2").value);
	var b2 = parseInt( document.getElementById("b2").value);
	var c2 = parseInt( document.getElementById("c2").value);
	var d2 = parseInt( document.getElementById("d2").value);

	/*quatrieme ligne*/
	var a3 = parseInt( document.getElementById("a3").value);
	var b3 = parseInt( document.getElementById("b3").value);
	var c3 = parseInt( document.getElementById("c3").value);
	var d3 = parseInt( document.getElementById("d3").value);
	
	/*Le eo amle egale*/
	var w0 = parseInt( document.getElementById("a3").value);
	var w1 = parseInt( document.getElementById("b3").value);
	var w2 = parseInt( document.getElementById("c3").value);
	var w3 = parseInt( document.getElementById("d3").value);

	/*delta*/
	var delta = (((a0*b1*c2*d3)+(b0*c1*d2*a3)+(c0*d1*a2*b3)+(d0*a1*b2*c3)) - ((a3*b2*c1*d0)+(b3*c2*d1*a0)+(c3*d2*a1*b0)+(d3*a2*b1*c0)));
	
	/*delta x*/
	var deltaX = (((w0*b1*c2*d3)+(b0*c1*d2*w3)+(c0*d1*w2*b3)+(d0*w1*b2*c3)) - ((w3*b2*c1*d0)+(b3*c2*d1*w0)+(c3*d2*w1*b0)+(d3*w2*b1*c0)));

	/*delta y*/
	var deltaY = (((a0*w1*c2*d3)+(w0*c1*d2*a3)+(c0*d1*a2*w3)+(d0*a1*w0*c3)) - ((a3*w2*c1*d0)+(w3*c2*d1*a0)+(c3*d2*a1*w0)+(d3*a2*w1*c0)));
	
	/*delta z*/
	var deltaZ = (((a0*b1*w2*d3)+(b0*w1*d2*a3)+(w0*d1*a2*b3)+(d0*a1*b2*w3)) - ((a3*b2*w1*d0)+(b3*w2*d1*a0)+(w3*d2*b1*w0)+(d3*a2*b1*w0)));

	/*delta t*/
	var deltaT = (((a0*b1*c2*w3)+(b0*c1*w2*a3)+(c0*w1*a2*b3)+(w0*a1*b2*c3)) - ((a3*b2*c1*w0)+ (b3*c2*w1*a0)+(c3*w2*b1*d0)+(w3*a2*b1*c0)));
	
	var reponse = document.getElementById('resp');
	/*Conditions*/
	if (verifie()){
	if (delta == 0)
	{
		if ((deltaX !=0) && (deltaY !=0) && (deltaZ !=0) && (deltaT !=0))
		{
			resp.value ="Delta est nulle!  La solution est vide";
		}


		else
		{
			resp.value = "Delta est nulle!  Le systeme d'équations présente une infinité de solutions";
		}
	}

	else
	{
		x = (deltaX/delta);
		y = (deltaY/delta);
		z = (deltaZ/delta);
		t = (deltaT/delta);
		resp.innerHTML = "X = " +x+ "   et Y = " +y+ "   et  Z = "+z+ "   et  T= "+t;
	}}
}

function supprimer(){
	window.location ="index.html";
}

function verifie(){
	var x = new Array(a0,a1,a2,a3);
	var y = new Array(b0,b1,b2,b3);
	var z = new Array(c0,c1,c2,c3);
	var t = new Array(d0,d1,d2,d3);

	var table = new Array(x,y,z,t);
	var i;
	for(i=0;i<4;i++)
	{	
		var j;
		for(j=0; j<4 ; j++)
		{
			var test = parseInt(table[i][j].value) ;
			if(isNaN(test)){
				alert('Veuillez remplir toutes les cases');
				return false;
			}
			
		}
	}
	return true;
}

function flou()
{
	$("#titre").addClass('flou');
	$("#voiture	").addClass('flou');
	$("#droite").addClass('flou');
	$("#footer").addClass('flou');
	$("#gauche").css('backgroundColor', 'rgba(41,40,41,0.2)');
	$("#equation").css('backgroundColor', 'rgb(41,40,41)');
}

function tsyFlou (){
	$("#titre").removeClass('flou');
	$("#voiture	").removeClass('flou');
	$("#droite").removeClass('flou');
	$("#footer").removeClass('flou');
	$("#gauche").css('backgroundColor', 'rgb(41,40,41)');
	$("#equation").css('backgroundColor', 'rgb(41,40,41)');
}
/**************************************************

	//PARAMETRES OBLIGATOIRES
		"pageURL":
			URL de la page concernée par la pop-in (ou bout d'URL, pour par exemple afficher la même popin sur toutes les pages ayant une base d'URL commune)
		"image":
			nom de l'image déposée dans le dossier "/popin/images du FTP" 
		"imageWidth":
			largeur de l'image en pixels
		"imageHeight":
			hauteur de l'image en pixels
		
	//PARAMETRES FACULTATIFS
		"delay":
			Délai (en millisecondes) avant l'ouverture de la pop-in.
			Pour une ouverture instantanée mettre 1.
			Si non spécifié (ou 0), le délai par défaut est de 1 seconde.
		"autoClose":
			Délai (en millisecondes) après lequel la pop-in se referme automatiquement (timing lancé après ouverture).
		"persist":
			mettre "true" (sans les guillements) pour que la pop-in apparaisse à chaque chargement de la page.
		"linkURL":
			URL de redirection si on clique sur la pop-in.
			Si non spécifié, la pop-in ne sera pas cliquable.


**************************************************/


var vwfr_popin_data = [
/*
	{
		"pageURL": "http://app.volkswagen.fr/ihdcc/fr/configurator.html",
		"image": "popin_janv.jpg",
		"imageWidth": 694,
		"imageHeight": 494,
		"autoClose": 4000,
		"linkURL": "http://offres.volkswagen.fr/"
	}
*/
];


                                                    /*
                                                  .7
                                       \       , //
                                       |\.--._/|//
                                      /\ ) ) ).'/
                                     /(  \  // /
                                    /(   J`((_/ \
                                   / ) | _\     /
                                  /|)  \  eJ    L
                                 |  \ L \   L   L
                                /  \  J  `. J   L
                                |  )   L   \/   \
                               /  \    J   (\   /
             _....___         |  \      \   \```
      ,.._.-'        '''--...-||\     -. \   \
    .'.=.'                    `         `.\ [ Y
   /   /                                  \]  J
  Y / Y                                    Y   L
  | | |          \                         |   L
  | | |           Y                        A  J
  |   I           |                       /I\ /
  |    \          I             \        ( |]/|
  J     \         /._           /        -tI/ |
   L     )       /   /'-------'J           `'-:.
   J   .'      ,'  ,' ,     \   `'-.__          \
    \ T      ,'  ,'   )\    /|        ';'---7   /
     \|    ,'L  Y...-' / _.' /         \   /   /
      J   Y  |  J    .'-'   /         ,--.(   /
       L  |  J   L -'     .'         /  |    /\
       |  J.  L  J     .-;.-/       |    \ .' /
       J   L`-J   L____,.-'`        |  _.-'   |
        L  J   L  J                  ``  J    |
        J   L  |   L                     J    |
         L  J  L    \                    L    \
         |   L  ) _.'\                    ) _.'\
         L    \('`    \                  ('`    \
          ) _.'\`-....'                   `-....'
         ('`    \
          `-.___/

**************************************************/

var vwfr_popin_folder = 'http://vw.sh05.net/popin/images/';
var vwfr_popin_detected = false;
var vwfr_popin_showTimeOut;
var vwfr_popin_hideTimeOut;
var vwfr_popin_container;
var vwfr_popin_content;
var vwfr_popin_closeBtn = $('<div/>', {
	class: 'vwfr_popin_closeBtn',
	html:'&#10006;',
	css:{
		display:'block',
		width:'30px',
		height:'30px',
		position:'absolute',
		top:0,
		right:'-35px',
		lineHeight:'30px',
		textAlign:'center',
		backgroundColor:'#ffffff',
		color:'#333333',
		fontSize:'20px',
		cursor:'pointer'
	},
	click: function(){
		vwfr_popin_show(false);
	}
});
var vwfr_popin_overlay = $('<div/>', {
	class: 'vwfr_popin_overlay',
	css:{
		display:'none',
		position:'fixed',
		backgroundColor:'#000000',
		top:0,
		left:0,
		height:'100%',
		width:'100%',
		zIndex:99999,
		opacity:0.3
	},
	click: function(){
		vwfr_popin_show(false);
	}
});

function vwfr_popin(){
	vwfr_popin_detected=false;
	$.each(vwfr_popin_data, function(i, popin){
		if(String(window.location).indexOf(popin.pageURL) >= 0
		&& !vwfr_popin_detected
		&& vwfr_popin_getCookie(popin.pageURL) != "noPopin"){
				vwfr_popin_detected=true; // Pour éviter que plusieurs pop-in ne soient ajoutées, dans le cas d'une erreur dans le JSON.
				
				if(!popin.persist){
					document.cookie=popin.pageURL+"=noPopin; path=/";
				}
				
				vwfr_popin_container = $('<div/>', {
					class: 'vwfr_popin_container',
					css: {
						position:'fixed',
						top:'50%',
						left:'50%',
						marginTop:popin.imageHeight/-2+'px',
						marginLeft:popin.imageWidth/-2+'px',
						position:'fixed',
						zIndex:99999,
						display:'none'
					}
				});
				
				vwfr_popin_content = $('<img/>', {
					class: 'vwfr_popin_content',
					src: vwfr_popin_folder+popin.image,
					css: {
						display:'block',
						cursor: popin.linkURL ? 'pointer' : 'auto'
					},
					click: function(){
						if(popin.linkURL){
							vwfr_popin_show(false);
							window.location=popin.linkURL;
						}
					}
				});
				
				vwfr_popin_overlay.appendTo($('body'));
				vwfr_popin_container.appendTo($('body'));
				vwfr_popin_content.appendTo(vwfr_popin_container);
				vwfr_popin_closeBtn.appendTo(vwfr_popin_container);
				
				vwfr_popin_showTimeOut = setTimeout(function(){
					vwfr_popin_show(true, popin.autoClose ? popin.autoClose : false);
				}, popin.delay ? popin.delay : 1000);
				
				
			}
	});
}

function vwfr_popin_show(show, autoClose){
	if(show){
		vwfr_popin_overlay.fadeIn(300, function(){
			vwfr_popin_container.fadeIn(300, function(){
				if(autoClose){
					vwfr_popin_hideTimeOut = setTimeout(function(){
						vwfr_popin_show(false);
					}, autoClose);	
				}
			});
		});
	}
	else{
		clearTimeout(vwfr_popin_hideTimeOut);
		vwfr_popin_container.fadeOut(300, function(){
			vwfr_popin_overlay.fadeOut(300);
		});
	}
}

function vwfr_popin_getCookie(cname){
	  var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) {
				 return c.substring(name.length, c.length);
			}
	  }
	  return "";
 }

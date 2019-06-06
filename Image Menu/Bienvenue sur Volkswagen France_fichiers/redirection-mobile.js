// redirection-mobile.js // 2016/03/21 // 12:20

//############################################
//#  OUTIL DE REDIRECTION MOBILE             #
//############################################

(function () {
	if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) ){
		if(String(window.self.location).indexOf("app.volkswagen.fr/ihdcc/fr/configurator_ext.html") >= 0 || String(window.self.location).indexOf("app-ssl.volkswagen.fr/fr/features/dbs_forms/dbs_contact_form_fr") >= 0){/* exception configurateur */}
		else if(String(window.self.location).indexOf("scirocco.volkswagen.de/fr/fr") >= 0){
			location.replace("http://mobile.volkswagen.fr/modeles/scirocco/");}
		else if(String(window.self.location).indexOf("volkswagen.fr/fr/models/nouvelle-golf-gte") >= 0){
			location.replace("http://mobile.volkswagen.fr/modeles/golf-gte/");}
		else{
			try {
				var s = document.createElement('script');
				s.src = "http://vw-volkswagen.fr/redir.php?in="+encodeURIComponent(window.location) ;
				s.type = 'text/javascript';
				document.getElementsByTagName('head')[0].appendChild(s);
			}
			catch (e){	
				location.replace("http://mobile.volkswagen.fr/") ;
			}
		}
	}
}());


//############################################
//#  REDIRECTION MOBILE : FORM CONFIGURATEUR #
//############################################

if(String(window.self.location).indexOf("app-ssl.volkswagen.fr/fr/features/dbs_forms/dbs_contact_form_fr") >= 0){
	if( window.top !== window.self && ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) ) ){
		window.top.location.href = "http://mobile.volkswagen.fr/rendez-vous/";
	}
}



//############################################
//#  CHARGEMENT DE SCRIPTS EXTERNES          #
//############################################


// TRACEUR GOOGLE ANALYTICS
// SOURCE : EBB (06/2015)
//--------------------------------------------

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-25559532-11', 'auto');
ga('send', 'pageview');


// TRACEUR GOOGLE TAG MANAGER
// SOURCE : EBB (02/2016)
//--------------------------------------------

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5FC7Z');


// POPIN COMPORTEMENTALE TTC
//--------------------------------------------
/*
(function () {
	if (window.location.protocol != 'https:'){
		var s = document.createElement('script');
		s.src = 'http://popin.vw-volkswagen.fr/controller/js/controller.js';
		s.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(s);
	}
}());
*/

// TRACEUR PSYMA
// SOURCE : STAN (07/2015)
//--------------------------------------------

(function () {
	var s = document.createElement('script');
	s.src = '//scripts.psyma.com/scripts/abfr/abfr_volkswagen.php';
	s.type = 'text/javascript';
	$(document).ready(function(){
		document.getElementsByTagName('body')[0].appendChild(s);
	});
}());

// SCRIPT DIGITALL CONFIGURATEUR
// SOURCE : DIGITALL (12/2015)
//--------------------------------------------
(function () {

	var urlDoc = window.self.location.href;
	var s = document.createElement('script');
	if ( urlDoc.indexOf("app.volkswagen.fr/ihdcc/fr/configurator_ext.html")!==-1 ) {
		s.src = 'http://volkswagen-configurator.webapp4you.eu/js/b2l-configurator-constructeur-mobile.js';
	}
	else if ( urlDoc.indexOf("app.volkswagen.fr/ihdcc/fr/configurator.html")!==-1 ) {
		s.src = 'http://volkswagen-configurator.webapp4you.eu/js/b2l-configurator-constructeur.js';
	}
	s.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(s);
	console.log('%c%s', 'color:#000; background:#ff9900; font-size:9px;', 'SCRIPT DIGITALL INCLUS');

}());



//############################################
//#  AJOUT META (GOOGLE WEBMASTER TOOL)      #
//############################################

(function () {
	var m = document.createElement('meta');
	m.name = 'google-site-verification';
	m.content = 'dblyn_kQUrvB4XPNEBL92N0aRHrGH1xMtBc8WLHgRuY';
	document.getElementsByTagName('head')[0].appendChild(m);
}());


//############################################
//#  REDIRECTIONS ANCIENNE URL OPO           #
//############################################

if(String(window.self.location).indexOf("www.volkswagen.fr/fr/offres-volkswagen") >= 0){
	location.replace("http://offres.volkswagen.fr/?utm_source=Volkswagen.fr&utm_medium=Redirection%20ancien%20OPO&utm_content="+ encodeURIComponent(window.self.location) +"&utm_campaign=Redirection%20ancien%20OPO");
}


//############################################
//#  REECRITURE URL POUR SITE PREPROD        #
//############################################

$(document).ready(function(){
	if (document.location.href.indexOf('site.volkswagen-preprod.vw.as44099.com') !== -1) {
		$("a[href^='http://www.volkswagen.fr']").each(function(){ 
			this.href = this.href.replace(/^http:\/\/www\.volkswagen\.fr/, "http://site.volkswagen-preprod.vw.as44099.com");
		});
	}
});

//############################################
//#  POPIN SIMPLE                            #
//############################################

(function () {
	if (window.location.protocol != 'https:'){
		var s = document.createElement('script');
		s.src = 'http://vw.sh05.net/popin/vwfr_popin.js';
		s.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(s);
	}
}());

$(document).ready(function(){
	var check = setInterval(function(){
		/* Verification du bon chargement du script de popin */
		if (typeof vwfr_popin === 'function') {
			vwfr_popin();
			$(window).on('hashchange', function(){
				vwfr_popin();
			});
			clearInterval(check);
		}
	}, 100);
});


//############################################
//#  CONFIGURATEUR                           #
//############################################

if (window.location.href.match(/form_DBS=true/g)) {
	document.cookie = "form_DBS=true";
}
if (window.location.href.match(/form_DBS=false/g)) {
	document.cookie = "form_DBS=false";
}


// TRACEUR AFFILINET
// SOURCE : MEDIACOM (05/2015)
//--------------------------------------------
if (window.self.location.href.indexOf("app.volkswagen.fr/ihdcc/fr/configurator") !== -1) {

	/* Variables */
	var type = "Checkout";
	var site = "12741";

	/* Injection balise script */
	var affilinet_script = document.createElement('script');
	affilinet_script.src = 'https://clic.reussissonsensemble.fr/art/JS/param.aspx';
	affilinet_script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(affilinet_script);

	/* Injection balise img */
	var affilinet_img = document.createElement('img');
	affilinet_img.src = 'https://clic.reussissonsensemble.fr/registersale.asp?site=12741&mode=ppl&ltype=1&order=';
	affilinet_img.width = '1';
	affilinet_img.height = '1';
	$(document).ready(function(){
		document.getElementsByTagName('body')[0].appendChild(affilinet_img);
	});
}


// REDIRECTIONS, TRACKING WOOPRA & A/B TESTING
// SOURCE : EBB
//--------------------------------------------

if (window.self.location.href.indexOf("app.volkswagen.fr/ihdcc/fr/configurator")!=-1) {

	console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | OK Check URL');

	(function () {

		console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | OK Self-executing anonymous function');

		// INITIALISATION DES VARIABLES
		//------------------------------------------------------------------

		var isMobile = (window.self.location.href.indexOf("configurator_ext")!=-1) ? true : false;

		var history = []; // Tableau des combinaisons (modele/etape) deja parcourues

		var carHash = 0;
		var carName = '';
		var carSlug = '';
		var cars = []; // Liste des differents modeles references (index = hash)

		// id = id car sur volkswagen-contacts
		// slug = slug pour formulaire mobile
		// name = nom envoye au tracking Woopra

		//Polo
		cars[30205] = {id:'2', name:'polo', slug:'polo'};
		//Scirocco
		cars[30806] = {id:'6', name:'scirocco', slug:'scirocco'};
		//Golf SW
		cars[30501] = {id:'5', name:'golf-sw', slug:'golf-sw'};
		//Golf
		cars[30301] = {id:'58', name:'golf', slug:'golf'};
		//Golf Plus
		cars[1] = {id:'4', name:'golf-plus', slug:'golf-plus'};
		//Coccinelle
		cars[30701] = {id:'7', name:'coccinelle', slug:'coccinelle'};
		//Jetta (Hybrid)
		cars[30906] = {id:'59', name:'jetta', slug:'jetta'};
		//Tiguan
		cars[31101] = {id:'9', name:'tiguan', slug:'tiguan'};
		//Touran
		cars[31005] = {id:'10', name:'touran', slug:'touran'};
		//Eos
		cars[1] = {id:'11', name:'eos', slug:'eos'};
		//Passat
		cars[31306] = {id:'12', name:'passat', slug:'passat'};
		//Sharan
		cars[31601] = {id:'14', name:'sharan', slug:'sharan'};
		//Touareg
		cars[31701] = {id:'15', name:'touareg', slug:'touareg'};
		//Phaeton
		cars[31801] = {id:'16', name:'phaeton', slug:'phaeton'};
		//Passat SW
		cars[31356] = {id:'38', name:'passat-sw', slug:'passat-sw'};
		//Golf Cabriolet
		cars[30601] = {id:'52', name:'golf-cabriolet', slug:'golf-cabriolet'};
		//Volkswagen up!
		cars[30100] = {id:'53', name:'volkswagen-up', slug:'volkswagen-up'};
		//Volkswagen CC
		cars[31501] = {id:'55', name:'volkswagen-cc', slug:'volkswagen-cc'};
		//Coccinelle Cabriolet
		cars[30751] = {id:'57', name:'coccinelle-cabriolet', slug:'coccinelle-cabriolet'};
		//Volkswagen e-up!
		cars[30151] = {id:'2553', name:'volkswagen-e-up', slug:'volkswagen-e-up'};
		//Golf Sportsvan
		cars[30401] = {id:'2554', name:'golf-sportsvan', slug:'golf-sportsvan'};
		//e-Golf
		cars[30351] = {id:'6505', name:'e-golf', slug:'e-golf'};
		//XL1
		cars[1] = {id:'6506', name:'xl1', slug:'xl1'};
		//Golf GTE
		cars[30353] = {id:'6508', name:'golf-gte', slug:'golf-gte'};
		//Golf Alltrack
		cars[30551] = {id:'6509', name:'golf-alltrack', slug:'golf-alltrack'};
		//Cross Polo
		cars[30202] = {id:'6535', name:'cross-polo', slug:'cross-polo'};



		// MODIFICATIONS DU DOCUMENT ET REDIRECTIONS POUR LA VERSION MOBILE
		//------------------------------------------------------------------

		if(isMobile){
			if(window.top !== window.self){
				//alert("iframe ! "+navigator.userAgent);
				$(document).ready(function(){
					// Suppression du header / footer / mentions...
					$("#vwd4_header").remove();
					$("#vwd4_footer").remove();
					$("#vw_dbs_ihdcc_Disclaimer").remove();
					$("#vwd4_page").css('padding','0px');

					// Masquage de l'alerte cookie
					var css = "#vwd4_m509 { display:none !important; }";
					var style = document.createElement("style");
					style.type = "text/css";
					if (style.styleSheet){ style.styleSheet.cssText = css; }
					else { style.appendChild(document.createTextNode(css)); }
					$("head").append(style) ;
				});
			}
			else{
				//alert("not iframe");
				if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) ){
					location.replace("http://mobile.volkswagen.fr/configurateur/");
				}
				else{
					location.replace("http://www.volkswagen.fr/configurateur");
				}
			}
		}

		// SURCHARGE/AJOUT DE STYLES
		//------------------------------------------------------------------
		$(document).ready(function(){
			var styles;

			/*Surcharge summary pour affichage formulaire*/
			styles = ['<style type="text/css">',
					  'div.ctas ul.ctaPrimary {display:none;}',
					  'div.ctas ul.ctaSecondary {padding-bottom:20px !important;}',
					  '#vw_dbs_ihdcc #vw_dbs_ihdcc_Summary #summaryDetails, #vw_dbs_ihdcc #vw_dbs_ihdcc_Summary {height:auto;}',
					  '</style>'];
			if(!isMobile) $('head').append(styles.join(''));

			/*Style popin options*/
			styles = ['<style type="text/css">',
					  'div#options-popin-rdv {display:block; opacity:0; box-sizing:border-box; position:absolute; right:-300px; bottom:60px; z-index:99999; width:300px; padding:30px; background-color:#eaeeed; border:5px solid #fff; outline:1px solid #cfd7d9 !important;}',
					  'div#options-popin-rdv a.btn {display:block; padding:10px 30px 10px 10px; border:0; background-color:#f5f5f5; color:#32434c; margin:0 0 10px 0; font:14px "VW Semibold"; text-align:left; text-decoration:none; box-shadow:inset 0px 20px 20px -20px rgba(255,255,255,0.4), -1px 1px 4px 0px rgba(0,0,0,0.5); border-radius:3px;}',
					  'div#options-popin-rdv a.btn.rdv {background-color:#ff8422; color:#fff; text-transform:uppercase;}',
					  'div#options-popin-rdv button.close {display:block; border:0; cursor:pointer; padding:0; width:25px; height:25px; position:absolute; right:0; top:0; background-color:#33434d; color:#fff; font-size:19px; line-height:27px; text-align:center;}',
					  'div#options-popin-rdv a:hover, div#options-popin-rdv button:hover{opacity:0.8; text-decoration:none;}',
					  '</style>'];
			$('head').append(styles.join(''));
		});


		// CREATION DE LA POPIN DE L'ETAPE OPTION
		//------------------------------------------------------------------
		/*var optionsPopin;
		$(document).ready(function(){
			optionsPopin = $('<div/>', {
				id: 'options-popin-rdv'
			})
			.append($('<a/>', {
				html: 'Prenez rendez-vous<br> d&egrave;s maintenant',
				class: 'btn rdv',
				href:'#',
				css: { backgroundColor:'#ff8422', color:'#fff', textTransform:'uppercase' }
					  }))
			.append($('<a/>', {
				html: 'Passez l\'&eacute;tape de configuration des options',
				class: 'btn next',
				href:'#'
			}))
			.append($('<button/>', {
				html: '&#215;',
				class: 'close'
			}))
			.appendTo($('#vw_dbs_ihdcc_iHDCC'));
		});*/


		// DETECTION DE L'ID VEHICULE DANS LE HASH
		//------------------------------------------------------------------

		var detectCar = function(){

			console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | function : detectCar');

			// le hash commence par un numero (etapes 1 a  2)
			if(!isNaN(parseInt(window.location.hash[1]))){
				carHash = window.location.hash.substring(1,6);
			}
			// le hash commence par une lettre et est plus long que 2 (etapes 3 a  6)
			else if (window.location.hash.indexOf('/')!=-1){
				carHash = window.location.hash.split('/')[1];
			}

			carName = cars[carHash] ? cars[carHash].slug : carHash;
			carSlug = cars[carHash] ? cars[carHash].slug : carHash;

		};

		// TRACKING WOOPRA DES ETAPES
		//------------------------------------------------------------------

		var trackStep = function(){

			setTimeout(function(){

				console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | function : trackStep');

				var stepIndex = $('#vw_dbs_ihdcc_MainMenu .nav li:not([data-nav="trimmodel"])').index($('#vw_dbs_ihdcc_MainMenu .nav a.selected').parent('li')) ;
				var stepName = $('#vw_dbs_ihdcc_MainMenu .nav a.selected').text() ;
				var step = stepIndex + ' : ' + stepName ;

				if(history.indexOf(carName+'|'+step) === -1 && carHash){
					history.push(carName+'|'+step);
					woopra.track("configurator", {
						car: carName,
						step: step
					});
					ga('send', 'event', 'configurator', carName, step);
					console.log('%c%s', 'color:#fff; background:#00f; font-size: 13px; font-weight:bold; padding:2px;', carName+' | '+step);
				}

			}, 1000);
		};

		// ACTIONS PAR ETAPES 
		//------------------------------------------------------------------

		var stepActions = function(){

			console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | function : stepActions');

			var params = '?urlcarconfigurator='+encodeURIComponent(window.self.location.href.replace("options","summary"));
			params += cars[carHash] ? '&modele='+cars[carHash].id : '';


			// OPTIONS (POPIN PUSH RDV)
			//------------------------------------------------------------------
			if(window.location.hash.indexOf('options')!=-1){
				optionsPopin.delay(2000).animate({right:'0px', opacity:1}, 700);
				optionsPopin.find('a.btn.rdv')
				.attr("href", isMobile ? 'http://mobile.volkswagen.fr/modeles/'+carSlug+'/rendez-vous/' : 'http://www.volkswagen.fr/fr/volkswagen/prendre-rendez-vous.html'+params)
				.click(function(){
					ga('send', 'event', 'configurator', carName, 'Popin options : RDV');
				});
				optionsPopin.find('a.btn.next')
				.attr("href", window.self.location.href.replace("options","summary"))
				.click(function(){
					ga('send', 'event', 'configurator', carName, 'Popin options : NEXT');
				});
				optionsPopin.find('button.close').click(function(){
					optionsPopin.animate({right:'-300px', opacity:0}, 700);
					ga('send', 'event', 'configurator', carName, 'Popin options : CLOSE');
				});
			}
			else{
				optionsPopin.animate({right:'-300px', opacity:0}, 700);
			}


			// DERNIERE ETAPE (RDV MOBILE & A/B TESTING)
			//------------------------------------------------------------------
			if(window.location.hash.indexOf('summary')!=-1){

				// MOBILE : Redirection vers le formulaire du bon vehicule
				if(isMobile){
					$(document).on('click', 'a[data-type-action="contactDealer"]', function(){
						window.top.location.href = 'http://mobile.volkswagen.fr/modeles/'+carSlug+'/rendez-vous/';
					});
				}

				// DESKTOP : A/B testing du formulaire
				else{
					//(Math.random()*(max-min+1)+min); 
					//var ab = Math.floor(Math.random()*(2-1+1)+1);
					var ab = 2;
					if (document.cookie.indexOf("form_DBS=true") !== -1) {
						ab = 3;
					}
					console.log('%c%s', 'color:#fff; background:#00f; font-size: 13px; font-weight:bold; padding:2px;', 'A/B testing : cas '+ab);


					if(ab===1){
						// CAS 1 = Redirection vers formulaire (au clic)
						$(document).on('click', 'a[data-type-action="contactDealer"]', function(){
							window.location.href = 'http://www.volkswagen.fr/fr/volkswagen/prendre-rendez-vous.html'+params;
						});
					}

					if(ab===2){
						// CAS 2 = Insertion du formulaire en iframe a  la derniere etape

						var iframe = $('<iframe/>', {
							id: 'summary-iframe-rdv',
							src: 'http://formulaires.vwprocess.fr/2014-12/generique_debut_car-configurateur/1502/iframe'+params,
							width: '100%',
							height: '910',
							scrolling: 'no',
							frameborder: 0,
							css: {display:'block', opacity:0}
						});

						// XXXXXXX OPTIMISATION TIMEOUT A FAIRE
						setTimeout(function(){
							$('#vw_dbs_ihdcc_iHDCC').data('initialheight', $('#vw_dbs_ihdcc_iHDCC').css('height'));
							$('#vw_dbs_ihdcc_iHDCC').animate({'height':'1360px'});
							iframe.insertAfter($('#vw_dbs_ihdcc_Summary .content')).animate({'opacity':1});
						}, 3500);
					}

					if(ab===3){
						// CAS 3 = Action par defaut (clic = formulaire DBS)
					}

				}

			}
			else{
				if($('#vw_dbs_ihdcc_iHDCC').data('initialheight')){
					$('#vw_dbs_ihdcc_iHDCC').animate({'height':$('#vw_dbs_ihdcc_iHDCC').data('initialheight')});
					$('#vw_dbs_ihdcc_iHDCC').removeData('initialheight');
				}
				if($('#summary-iframe-rdv')){
					$('#summary-iframe-rdv').remove();
				}
			}

		};

		// EVENEMENTS
		//------------------------------------------------------------------
		$(document).ready(function(){
			console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | event : domready');
			// Detection id vehicule
			detectCar();
			// Tracking Woopra
			trackStep();
			// Actions derniere etape
			stepActions();
		});
		$(window).on('hashchange', function(){
			console.log('%c%s', 'color:#000; background:#0ff; font-size:9px;', 'CONFIG | event : hashchange');
			// Detection id vehicule
			detectCar();
			// Tracking Woopra
			trackStep();
			// Actions derniere etape
			stepActions();
			// Transmission du hash a  la fenetre parente (pour configurateur mobile)
			window.parent.postMessage(['setHash', window.location.hash], '*');
		});


	}());
}
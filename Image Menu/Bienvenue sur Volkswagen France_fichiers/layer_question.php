// class for managing psyma cookies
var psymaCookieManager = {
	"psyma_show":1,
	"init":function(show){
		if(show == 1) {
			psyma_cookie_id = "psyma_participation";
			psyma_participation = this.get_psyma_cookie(psyma_cookie_id);
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}
		else {
			psyma_cookie_id = "psyma_participation";
			psyma_participation = this.get_psyma_cookie(psyma_cookie_id);
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}
		if(psyma_participation != 1 && psyma_participation != 2)
		{
			this.set_psyma_cookie(psyma_cookie_id, 1, "/", "", "", psyma_cookie_exp);
		}
		else {
			this.psyma_show = 0;
		}	

	},
	// write specific cookie
	"switch_cookie" :function(type){
		if(type == "accept") {
			psyma_cookie_id = "psyma_participation";
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}	
		else if(type == "deny") {
			psyma_cookie_id = "psyma_participation";
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}	
		else if(type == "close") {
			psyma_cookie_id = "psyma_participation";
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}	
		else if(type == "delay") {
			psyma_cookie_id = "psyma_participation";
			psyma_cookie_exp = this.psyma_get_expiration_date("30");
		}	
		this.set_psyma_cookie(psyma_cookie_id, 2, "/", "", "", psyma_cookie_exp);
	},
	// get expiration date
	"psyma_get_expiration_date":function(psyma_day_offset){
		if(psyma_day_offset == "None" || psyma_day_offset == "none")
			return -1;
		if(psyma_day_offset == "Session" || psyma_day_offset == "session")
			return 0;
		var psyma_milli_offset = psyma_day_offset * 1000 * 60 * 60 * 24;
		var psyma_now = new Date();
		psyma_participation_exp = new Date(psyma_now.valueOf() + psyma_milli_offset);
		return psyma_participation_exp;
	},
		
	// get cookie
	"get_psyma_cookie":function(a)
	{
		var c=document.cookie.split(a+"=");
		return (c.length>1)?unescape(c[1].split(";")[0]):"";
	},

	// set cookie
	"set_psyma_cookie":function(name, value, path, domain, secure, expires)
	{
		if(expires != -1)
		{
			document.cookie =
			name + "="
			+ escape(value)
			+ ((path) ? "; path=" + path : "")
			+ ((expires) ? "; expires=" + expires.toGMTString() : "")
			+ ((domain) ? "; domain=" + domain : "")
			+ ((secure) ? "; secure" : "");
		}
	}

}
var q1_1_answer = "";
var q1_2_answer = "";
var guid = "ED3AA326-4008-2A9A-2338-CF9995B5A126";
var submit_data = false;
var img_path = "https://scripts.psyma.com/img/layer/experimentell/layer_question/";
var img_path_r1 = img_path + "r1.gif";
var img_path_r2 = img_path + "r2.gif";
var img_path_r3 = img_path + "r3.gif";

var psymaLayer =
{
	"psyma_domain_check_text" : "",
	"psyma_js_loaded" : 0,
	"psyma_layer" : document.createElement('DIV'),
	"psyma_left" : 0,
	"psyma_top" : 0,

	"init":function()
	{
		this.psyma_layer.id = "psyma_layer";
		this.append_script(this.psyma_layer);
		var psyma_layer_script = document.createElement('script');
		psyma_layer_script.type = 'text/javascript';
		psyma_layer_script.src = 'https://scripts.psyma.com/html/layer/json_question_abfr_volkswagen.php?xmlPath=abfr/abfr13_volkswagen&psyma_test=false';
		this.append_script(psyma_layer_script);
	},

	"append_script":function(script)
	{
		if(document.body){document.body.appendChild(script);}
		else{setTimeout(function () { psymaLayer.append_script(script); }, 500);}
	},

	"psyma_wtp":function(locale){this.psyma_open_link(locale,"wtp");},
	"psyma_privacy":function(locale){this.psyma_open_link(locale,"privacy");},
	"psyma_info":function(locale){this.psyma_open_link(locale,"info");},
	"psyma_terms":function(locale){this.psyma_open_link(locale,"terms");},

	"psyma_open_link":function(locale, type)
	{
		var link = "";
		var dimensions = "width=500,height=350";	
		switch(type)
		{
			case "wtp":
				link = "wtp/wtp.php";
				dimensions = "width=500,height=350";
			break;
			case "privacy":
				link = "privacy/privacy.php";
				dimensions = "width=600,height=680";
			break;
			case "info":
				link = "por/por.php";
				dimensions = "width=600,height=500";
			break;
			case "draw":
				link = "gewinnspiel/gewinnspiel.php";
				dimensions = "width=500,height=350";			
			break;
			case "terms":
				link = "terms/terms.php";
				dimensions = "width=500,height=480";			
			break;
			case "feedback":
				link = "feedback/feedback.php";
				dimensions = "width=500,height=480";			
			break;
			case "cookie":
				link = "cookie/cookie.php";
				dimensions = "width=500,height=480";			
			break;
		}

		window.open("https://scripts.psyma.com/documents/" + link + '?lang=' + locale, 'por_' + type, 'toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,' + dimensions + ',top=0,left=0');
	},

	"psyma_accept_button":function()
	{
		psymaCookieManager.switch_cookie('accept');			
			var survey_window = window.open('', '',  'toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=470,height=300,top=0,left=0');
			if (survey_window)
			{
				survey_window.document.write("<script type=\"text/javascript\">var q1_1 = \"" + q1_1_answer + "\"; var q1_2 = \"" + q1_2_answer + "\"; var guid = \"" + guid + "\"; var browserstring = \"Desktop PC, Generic web browser\"; var tablet_parameter = \"false\"; var desktop_parameter = \"true\"; var client_logo = \"\";</script>");
				survey_window.document.write(this.psyma_domain_check_text);
				survey_window.blur();
				survey_window.opener.focus();
			}

		
		this.psyma_hidelayer();
	},

	"psyma_deny_button":function(){this.psyma_hidelayer();psymaCookieManager.switch_cookie('deny');},
	"psyma_close_button":function(){this.psyma_hidelayer();psymaCookieManager.switch_cookie('close');},
	"psyma_delay_button":function(){this.psyma_hidelayer();psymaCookieManager.switch_cookie('delay');},

	"psyma_updateLayer":function(html, domain_check_text, style, style_html, top, left)
	{
		var psyma_layer = document.getElementById('psyma_layer');

		this.psyma_layer.setAttribute('style',style);
		this.psyma_left = left;
		this.psyma_top = top;

		var poswidth = this.psyma_getHorizontalAlignment(left, parseInt(psyma_layer.style.maxWidth));
		var posheight = this.psyma_getVerticalAlignment(top, parseInt(psyma_layer.style.maxWidth));

		this.psyma_layer.style.position = "absolute";
		this.psyma_layer.style.left = poswidth + "px";
		this.psyma_layer.style.top = posheight + "px";

		var psyma_html_layer = document.createElement('DIV');
		psyma_html_layer.id = "psyma_html_layer";
		psyma_html_layer.innerHTML = html;

		psyma_html_layer.setAttribute('style',style_html);
		psyma_layer.appendChild(psyma_html_layer);
		this.psyma_domain_check_text = domain_check_text;
		this.psyma_showlayer();
		this.updateSize();

		var psyma_layercount_script = document.createElement('script');
		psyma_layercount_script.type = 'text/javascript';
		psyma_layercount_script.src = 'https://scripts.psyma.com/scripts/count_json.php?type=layercount&id=10428&cr=10.27&code=0&referrer=Desktop+PC%2C+Generic+web+browser';
		this.append_script(psyma_layercount_script);
	},

	"psyma_updateDomainCheck":function(domain_check_text, style, top, left)
	{
		var psyma_layer = document.getElementById('psyma_layer');
		
		this.psyma_layer.setAttribute('style',style);
		var poswidth = this.psyma_getHorizontalAlignment(left);
		var posheight = this.psyma_getVerticalAlignment(top);
		this.psyma_layer.style.left = poswidth + "px";
		this.psyma_layer.style.top = posheight + "px";
		this.psyma_domain_check_text = domain_check_text;
		this.psyma_showlayer();
	},

	"psyma_showlayer":function()
	{
		this.psyma_layer.style.display = "block";
		this.psyma_layer.style.visibility = "visible";
	},

	"psyma_hidelayer":function()
	{
		document.body.removeChild(this.psyma_layer);
	},
	
	"psyma_getHorizontalAlignment":function(left, width)
	{
		if(left == "center")
		{
			var myWidth = 0;
			if(typeof(window.innerWidth) == 'number'){myWidth = window.innerWidth;}
			else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){myWidth = document.documentElement.clientWidth;}
			else if(document.body && (document.body.clientWidth || document.body.clientHeight)){myWidth = document.body.clientWidth;}
			poswidth = (myWidth - width) / 2;
		}
		else{var poswidth = left;}

		// Minimalabstand
		if(poswidth <= 0){poswidth = 20;}
		return poswidth;
	},
	
	"psyma_getVerticalAlignment":function(top, width)
	{
		if(width > 500){height = 460;}
		else if(width >= 250){height = 300;}
		else{height = 150;}
		
		if(top == "center")
		{
			var myHeight = 0;
			if(typeof(window.innerWidth) == 'number'){myHeight = window.innerHeight;}
			else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){myHeight = document.documentElement.clientHeight;}
			else if(document.body && (document.body.clientWidth || document.body.clientHeight)){myHeight = document.body.clientHeight;}
			posheigth = (myHeight - height) / 2;
		}
		else{var posheigth = top;}
		
		// Minimalabstand
		if(posheigth <= 0){posheigth = 10;}
		return posheigth;
	},

	"updateOrientation":function()
	{
		var psyma_layer = document.getElementById('psyma_layer');
		var layer_exists = document.getElementById('psyma_layer');
		if(layer_exists != null)
		{
			var poswidth = psymaLayer.psyma_getHorizontalAlignment(psymaLayer.psyma_left,parseInt(psyma_layer.style.maxWidth));
			var posheight = psymaLayer.psyma_getVerticalAlignment(psymaLayer.psyma_top,parseInt(psyma_layer.style.maxWidth));
			psyma_layer.style.left = poswidth + "px";
			psyma_layer.style.top = posheight + "px";
		}
	},

	"updateSize":function()
	{
		myWidth = 0;
		if(typeof(window.innerWidth) == 'number'){myWidth = window.innerWidth;}
		else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){myWidth = document.documentElement.clientWidth;}
		else if(document.body && (document.body.clientWidth || document.body.clientHeight)){myWidth = document.body.clientWidth;}

		var layer_exists = document.getElementById('psyma_layer');
		var elementWidth = myWidth - 40;
		var elementWidthPx = elementWidth + "px";
		var get_class_p = document.getElementsByTagName("p");
		var get_class_div = document.getElementsByTagName("div");
		
		/* �berpr�fen �b Layer existiert */
		if(layer_exists != null)
		{
			/* Responsives Verhalten einf�gen */

			if (myWidth <= 570)
			{
				document.getElementById('psyma_layer').style.width = elementWidthPx;
			}
			else if(myWidth > 570)
			{
				document.getElementById('psyma_layer').style.width = "549px";
			}
			
			if(myWidth > 400)
			{
				document.getElementById("psyma_close_link_container").style.paddingLeft = "8px";
				document.getElementById("psyma_close_link_container_text").style.display = "inline-block";
				document.getElementById("psyma_close_link").style.marginLeft = "10px";
				document.getElementById("psyma_question_1_text_container").style.width = "220px";
				document.getElementById("psyma_question_1_text").style.fontSize = "12px";
				document.getElementById("psyma_question_1_text_submitbutton").style.fontSize = "12px";
				document.getElementById("psyma_list").style.margin = "28px 20px 0 0";
				document.getElementById("psyma_list").style.cssFloat = "left";				document.getElementById("psyma_list").style.marginBottom = "0";
				document.getElementById("psyma_list").style.paddingRight = "15px";
				document.getElementById("psyma_list").style.width = "auto";
				document.getElementById("psyma_list_li_1").style.textAlign = "left";
				document.getElementById("psyma_list_li_2").style.textAlign = "left";
				document.getElementById("psyma_logo").style.margin = "0";
				document.getElementById("psyma_logo").style.cssFloat = "right";				document.getElementById("psyma_logo").style.width = "120px";
				document.getElementById("psyma_logo").style.textAlign = "left";
				
				/* Klassen durchgehen */
				for (var i = 0; i < get_class_p.length; i++){if (get_class_p[i].className == 'psyma_question_1_button_label'){get_class_p[i].style.fontSize = "12px";}}
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_headline'){get_class_div[i].style.fontSize = "14px";}}
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_text'){get_class_div[i].style.fontSize = "12px";}}
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.fontSize = "14px";}}
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.lineHeight = "24px";}}
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.margin = "0 0 20px 0";}}

			}
			else if(myWidth < 400)
			{
				document.getElementById("psyma_close_link_container").style.paddingLeft = "6px";
				document.getElementById("psyma_close_link_container_text").style.display = "none";
				document.getElementById("psyma_close_link").style.marginLeft = "0";
				document.getElementById("psyma_question_1_text_container").style.width = "90%";
				for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.margin = "0 0 15px 0";}}

				if(myWidth > 320)
				{
					document.getElementById("psyma_question_1_text").style.fontSize = "11px";
					document.getElementById("psyma_question_1_text_submitbutton").style.fontSize = "11px";
					document.getElementById("psyma_list").style.margin = "28px 20px 0 0";
					document.getElementById("psyma_list").style.cssFloat = "left";					document.getElementById("psyma_list").style.paddingRight = "15px";
					document.getElementById("psyma_list").style.width = "auto";
					document.getElementById("psyma_list_li_1").style.textAlign = "left";
					document.getElementById("psyma_list_li_2").style.textAlign = "left";
					document.getElementById("psyma_logo").style.margin = "0";
					document.getElementById("psyma_logo").style.cssFloat = "right";					document.getElementById("psyma_logo").style.width = "120px";
					document.getElementById("psyma_logo").style.textAlign = "left";
					
					/* Klassen durchgehen */
					for (var i = 0; i < get_class_p.length; i++){if (get_class_p[i].className == 'psyma_question_1_button_label'){get_class_p[i].style.fontSize = "11px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_headline'){get_class_div[i].style.fontSize = "13px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_text'){get_class_div[i].style.fontSize = "11px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.fontSize = "13px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.lineHeight = "20px";}}
				}
				else
				{
					document.getElementById("psyma_question_1_text").style.fontSize = "10px";
					document.getElementById("psyma_question_1_text_submitbutton").style.fontSize = "10px";
					document.getElementById("psyma_list").style.margin = "15px auto 10px auto";
					document.getElementById("psyma_list").style.cssFloat = "none";					document.getElementById("psyma_list").style.paddingRight = "0";
					document.getElementById("psyma_list").style.width = "100%";
					document.getElementById("psyma_list_li_1").style.textAlign = "center";
					document.getElementById("psyma_list_li_2").style.textAlign = "center";
					document.getElementById("psyma_logo").style.margin = "0 auto";
					document.getElementById("psyma_logo").style.cssFloat = "none";					document.getElementById("psyma_logo").style.width = "100%";
					document.getElementById("psyma_logo").style.textAlign = "center";
					
					/* Klassen durchgehen */
					for (var i = 0; i < get_class_p.length; i++){if (get_class_p[i].className == 'psyma_question_1_button_label'){get_class_p[i].style.fontSize = "10px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_headline'){get_class_div[i].style.fontSize = "12px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_2_text'){get_class_div[i].style.fontSize = "10px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.fontSize = "12px";}}
					for (var i = 0; i < get_class_div.length; i++){if (get_class_div[i].className == 'psyma_question_1_questiontext'){get_class_div[i].style.lineHeight = "18px";}}
				}
			}
		}
	},

	"switchLayer":function(jsonPath, xmlPath)
	{
		var psyma_html_layer = document.getElementById("psyma_html_layer");
		var absolutePath = 'https://scripts.psyma.com/html/layer/' + jsonPath + '.php?xmlPath=' + xmlPath;
		var psyma_layer_script = document.createElement('script');
		psyma_html_layer.parentNode.removeChild(psyma_html_layer);
		psyma_layer_script.type = 'text/javascript';
		psyma_layer_script.src = absolutePath;
		this.append_script(psyma_layer_script);
	},

	"psyma_button_hover":function(button)
	{
		/* Frage 1 Button hover Effekt */
		if(button == "1" && document.getElementById("psyma_question_1_button_img_1").src != img_path_r3){document.getElementById("psyma_question_1_button_img_1").src = img_path_r2;}
		else if(button == "2" && document.getElementById("psyma_question_1_button_img_2").src != img_path_r3){document.getElementById("psyma_question_1_button_img_2").src = img_path_r2;}
		else if(button == "3" && document.getElementById("psyma_question_1_button_img_3").src != img_path_r3){document.getElementById("psyma_question_1_button_img_3").src = img_path_r2;}
		else if(button == "4" && document.getElementById("psyma_question_1_button_img_4").src != img_path_r3){document.getElementById("psyma_question_1_button_img_4").src = img_path_r2;}
		else if(button == "5" && document.getElementById("psyma_question_1_button_img_5").src != img_path_r3){document.getElementById("psyma_question_1_button_img_5").src = img_path_r2;}
		else if(button == "6" && document.getElementById("psyma_question_1_button_img_6").src != img_path_r3){document.getElementById("psyma_question_1_button_img_6").src = img_path_r2;}
		else if(button == "7" && document.getElementById("psyma_question_1_button_img_7").src != img_path_r3){document.getElementById("psyma_question_1_button_img_7").src = img_path_r2;}
		else if(button == "8" && document.getElementById("psyma_question_1_button_img_8").src != img_path_r3){document.getElementById("psyma_question_1_button_img_8").src = img_path_r2;}
		else if(button == "9" && document.getElementById("psyma_question_1_button_img_9").src != img_path_r3){document.getElementById("psyma_question_1_button_img_9").src = img_path_r2;}
		else if(button == "10" && document.getElementById("psyma_question_1_button_img_10").src != img_path_r3){document.getElementById("psyma_question_1_button_img_10").src = img_path_r2;}
		else if(button == "11" && document.getElementById("psyma_question_1_button_img_11").src != img_path_r3){document.getElementById("psyma_question_1_button_img_11").src = img_path_r2;}
		else if(button == "12" && document.getElementById("psyma_question_1_button_img_12").src != img_path_r3){document.getElementById("psyma_question_1_button_img_12").src = img_path_r2;}
	},

	"psyma_button_hover_out":function(button)
	{
		/* Frage 1 Button hover Effekt wieder entfernen */
		if(button == "1" && document.getElementById("psyma_question_1_button_img_1").src != img_path_r3){document.getElementById("psyma_question_1_button_img_1").src = img_path_r1;}
		else if(button == "2" && document.getElementById("psyma_question_1_button_img_2").src != img_path_r3){document.getElementById("psyma_question_1_button_img_2").src = img_path_r1;}
		else if(button == "3" && document.getElementById("psyma_question_1_button_img_3").src != img_path_r3){document.getElementById("psyma_question_1_button_img_3").src = img_path_r1;}
		else if(button == "4" && document.getElementById("psyma_question_1_button_img_4").src != img_path_r3){document.getElementById("psyma_question_1_button_img_4").src = img_path_r1;}
		else if(button == "5" && document.getElementById("psyma_question_1_button_img_5").src != img_path_r3){document.getElementById("psyma_question_1_button_img_5").src = img_path_r1;}
		else if(button == "6" && document.getElementById("psyma_question_1_button_img_6").src != img_path_r3){document.getElementById("psyma_question_1_button_img_6").src = img_path_r1;}
		else if(button == "7" && document.getElementById("psyma_question_1_button_img_7").src != img_path_r3){document.getElementById("psyma_question_1_button_img_7").src = img_path_r1;}
		else if(button == "8" && document.getElementById("psyma_question_1_button_img_8").src != img_path_r3){document.getElementById("psyma_question_1_button_img_8").src = img_path_r1;}
		else if(button == "9" && document.getElementById("psyma_question_1_button_img_9").src != img_path_r3){document.getElementById("psyma_question_1_button_img_9").src = img_path_r1;}
		else if(button == "10" && document.getElementById("psyma_question_1_button_img_10").src != img_path_r3){document.getElementById("psyma_question_1_button_img_10").src = img_path_r1;}
		else if(button == "11" && document.getElementById("psyma_question_1_button_img_11").src != img_path_r3){document.getElementById("psyma_question_1_button_img_11").src = img_path_r1;}
		else if(button == "12" && document.getElementById("psyma_question_1_button_img_12").src != img_path_r3){document.getElementById("psyma_question_1_button_img_12").src = img_path_r1;}
	},

	"psyma_check_question_buttons":function(button)
	{
		/* Zusatzbl�cke ein- u. ausblenden */
		/* Block 1 anzeigen */
		if(button == "1")
		{
			document.getElementById("psyma_question_1_block_1").style.display = "block";
			document.getElementById("psyma_question_1_block_2").style.display = "none";
			document.getElementById("psyma_question_1_block_3").style.display = "none";
			document.getElementById("psyma_question_1_block_4").style.display = "none";
			document.getElementById("psyma_question_1_button_img_1").src = img_path_r3;
			document.getElementById("psyma_question_1_button_img_2").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_3").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_4").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_5").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_6").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_7").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_8").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_9").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_10").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_11").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_12").src = img_path_r1;
		}
		/* Block 2 anzeigen */
		else if(button == "4")
		{
			document.getElementById("psyma_question_1_block_1").style.display = "none";
			document.getElementById("psyma_question_1_block_2").style.display = "block";
			document.getElementById("psyma_question_1_block_3").style.display = "none";
			document.getElementById("psyma_question_1_block_4").style.display = "none";
			document.getElementById("psyma_question_1_button_img_1").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_2").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_3").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_4").src = img_path_r3;
			document.getElementById("psyma_question_1_button_img_5").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_6").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_7").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_8").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_9").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_10").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_11").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_12").src = img_path_r1;
		}
		/* Block 3 anzeigen */
		else if(button == "7")
		{
			document.getElementById("psyma_question_1_block_1").style.display = "none";
			document.getElementById("psyma_question_1_block_2").style.display = "none";
			document.getElementById("psyma_question_1_block_3").style.display = "block";
			document.getElementById("psyma_question_1_block_4").style.display = "none";
			document.getElementById("psyma_question_1_button_img_1").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_2").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_3").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_4").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_5").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_6").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_7").src = img_path_r3;
			document.getElementById("psyma_question_1_button_img_8").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_9").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_10").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_11").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_12").src = img_path_r1;
		}
		/* Textfeld anzeigen */
		else if(button == "12")
		{
			document.getElementById("psyma_question_1_block_1").style.display = "none";
			document.getElementById("psyma_question_1_block_2").style.display = "none";
			document.getElementById("psyma_question_1_block_3").style.display = "none";
			document.getElementById("psyma_question_1_block_4").style.display = "block";
			document.getElementById("psyma_question_1_button_img_1").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_2").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_3").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_4").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_5").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_6").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_7").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_8").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_9").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_10").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_11").src = img_path_r1;
			document.getElementById("psyma_question_1_button_img_12").src = img_path_r3;
		}
		/* Wenn Textfeld-Submitbutton geklickt wird */
		else if(button == "13")
		{
			q1_1_answer = "12";
			if(document.getElementById("psyma_question_1_text").value != "")
			{
				q1_2_answer = document.getElementById("psyma_question_1_text").value;
			}
			else
			{
				q1_2_answer = "-77";
			}
			submit_data = true;
		}
		else if(button == "2" || button == "3" || button == "5" || button == "6" || button == "8" || button == "9" || button == "10" || button == "11")
		{
			submit_data = true;
			
			/* Alle ausklappbaren Bl�cke ausblenden */
			if(button == "10" || button == "11")
			{
				document.getElementById("psyma_question_1_block_1").style.display = "none";
				document.getElementById("psyma_question_1_block_2").style.display = "none";
				document.getElementById("psyma_question_1_block_3").style.display = "none";
				document.getElementById("psyma_question_1_block_4").style.display = "none";
			}
			
			/* Variablenzuweisung */
			if(button == "2"){q1_1_answer = "2";}
			else if(button == "3"){q1_1_answer = "3";}
			else if(button == "5"){q1_1_answer = "5";}
			else if(button == "6"){q1_1_answer = "6";}
			else if(button == "8"){q1_1_answer = "8";}
			else if(button == "9"){q1_1_answer = "9";}
			else if(button == "10"){q1_1_answer = "10";}
			else if(button == "11"){q1_1_answer = "11";}
			q1_2_answer = "-77";
		}

		if(submit_data)
		{
			/* Daten an DB senden */
			var psyma_layer_question_script = document.createElement('script');
			psyma_layer_question_script.type = "text/javascript";
			psyma_layer_question_script.src = "https://scripts.psyma.com/lib/save_question_json.php?guid=" + guid + "&q1_1=" + q1_1_answer + "&q1_2=" + q1_2_answer + "&xmlPath=abfr/abfr13_volkswagen";
			this.append_script(psyma_layer_question_script);
			
			/* Seite 2 anzeigen */
			document.getElementById("psyma_question_1").style.display = "none";
			document.getElementById("psyma_question_2").style.display = "block";
			document.getElementById("psyma_list_li_1").style.visibility = "visible";
		}
	}
};

if(window.addEventListener)
{
	window.addEventListener('resize',psymaLayer.updateOrientation, false);
	window.addEventListener('resize',psymaLayer.updateSize, false);
}
else if(window.attachEvent)
{
	window.onresize = function() {psymaLayer.updateOrientation(); psymaLayer.updateSize();};
}	// in case of emergency, overwrite functions here, e.g. psymaLayer.psyma_info = function {}
	psymaCookieManager.init(1);if(psymaCookieManager.psyma_show) psymaLayer.init();
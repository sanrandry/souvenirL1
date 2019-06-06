/* =====================================================================
   sophus3-VW-FR_5.5.4h-201603100940
   =====================================================================*/
if (typeof s3_logging_active === 'undefined') {s3_logging_active = true; }

/* =========================== Customisation ===========================*/
var s3_site_id = 735;
var s3_server_url = "auto.sophus3.com";

var s3ae_element = "s3_ae";
var s3ae_server = "volkswagen-fr.s3ae.com";
var s3ae_screenlimit = 400;
var screenCheck = 0; 

var s3prot = ('https:' === document.location.protocol) ? 'https' : 'http';

var s3ua = navigator.userAgent;
var isMobile = {
	Android: function() {return s3ua.match(/Android/i) ? true : false;},
	Mobile: function() {return s3ua.match(/Mobile/i) ? true : false;},
	BlackBerry: function() {return s3ua.match(/BlackBerry/i) ? true : false;},
	iOSmob: function() {return s3ua.match(/iPhone|iPod/i) ? true : false;},
	iOStab: function() {return s3ua.match(/iPad/i) ? true : false;},
	Windows: function() {return s3ua.match(/IEMobile/i) ? true : false;},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOSmob() || isMobile.iOStab() || isMobile.Windows());},
	mob: function() {return ((isMobile.Android() && isMobile.Mobile()) || isMobile.BlackBerry() || isMobile.iOSmob() || isMobile.Windows());},
	tab: function() {return (isMobile.iOStab() || (isMobile.Android() && !isMobile.Mobile()));} //tablets filter
}; 

screenCheck = (screen.availHeight > screen.availWidth) ? screen.availWidth : screen.availHeight;

if (readCookie('s3noae') == 1) {
	var s3noae = 1;
}

if(typeof s3noae === 'undefined' && typeof s3ae_server !== 'undefined' && s3ae_server !== '' && typeof s3ae_element !== 'undefined' && s3ae_element !== '' && screenCheck > s3ae_screenlimit  && !isMobile.mob() && s3prot === 'http' && checkOptOut('aear') === false){
	try{   
		var _body = document.getElementsByTagName('body')[0];
		var _div= document.createElement('div');
		_div.id = s3ae_element;
		_div.style.style = "display:none";
		_body.appendChild(_div);

		var s3script = document.createElement('script');
		s3script.type = 'text/javascript';
		s3script.text = "\/* <![CDATA[ *\/ var script = document.createElement(\"script\");script.async=true;script.type=\"text\/javascript\";var src = \"\/\/"+s3ae_server+"\/server.php?request=track&output=jcrpt&nse=\"+Math.random();setTimeout(function(){script.src=src;document.getElementById('"+s3ae_element+"').appendChild(script)},1);\/* ]]\> *\/"

		var sophus3s = document.getElementsByTagName('script')[0];
		sophus3s.parentNode.insertBefore(s3script, sophus3s);
	}
	catch(e){}
}

function s3GetPwSetting(tcid) {
	var undef = {"undefined":"undefined"};
    var s32pw = {
		735: {'server': 'edx-fr.sophus3.com', 'pwid': 11, 'ckDomain': '*.volkswagen.fr', 'domains': ['*.volkswagen.fr']}
	};
    return (typeof s32pw[tcid] !== 'undefined') ? s32pw[tcid] : undef ;
}
var s3_pw_set = s3GetPwSetting(s3_site_id);
/*=====================================================================*/

/*=========================== StandardCode ============================*/
/*             DO NOT MAKE CHANGES TO THE CODE BELOW !                */
//Opt-Out
if(s3getParam('s3optout') === '1' || s3getParam('s3aearoptout') === '1' || s3getParam('s3hmoptout') === '1' || s3getParam('s3troptout') === '1'){
	s3load("//scripts.sophus3.com/s3f/optout", "s3optout.js");
} 

function checkOptOut(service){
	if(s3getCookieValue("s3optout", "s3totaloptout") === "yes"){
		s3_logging_active = false;
		return true;
	}
	else if(service === "tr" && s3getCookieValue("s3optout", "s3troptout") === "yes"){
		s3_logging_active = false;
		return true;
	}
	else if (service === "aear" && s3getCookieValue("s3optout", "s3aearoptout") === "yes"){
		return true;
	}
	else if(service === "hm" && s3getCookieValue("s3optout", "s3hmoptout") === "yes"){
		return true;
	}
	else{
		return false;
	}
}

if (typeof tc_page_alias !== 'undefined') { //Compatibility with old version tagging
    s3_page_alias = tc_page_alias;
}

if (typeof s3_page_alias !== 'undefined' && location.search !== null && location.search.length > 1) {
	s3_page_alias += (s3_page_alias.indexOf('?') === -1) ? location.search : "&" + location.search.substring(1)
}

/* ================================ PW ================================*/
if(typeof s3pwdone === 'undefined' 	&& checkOptOut("tr") === false 
	&& typeof Piwik === 'undefined'	&& typeof _paq === 'undefined'
	&& typeof s3_pw_set.server !== 'undefined' && typeof s3_pw_set.pwid !== 'undefined'){
	var s3_paq = s3_paq || [];
	(function() {
		try{ 
			s3_paq.push(['setDocumentTitle', window.location.href]);
			s3_paq.push(['setCookieDomain', s3_pw_set.ckDomain]);
			s3_paq.push(['setDomains', s3_pw_set.domains]);
			s3_paq.push(['enableLinkTracking']);
			if (typeof s3_page_alias !== 'undefined') {
				s3_paq.push(['setCustomUrl', s3_page_alias + ' (c)']);
			}
			s3_paq.push(['trackPageView']);
			
			var u = '//' + s3_pw_set.server + '/';
			s3_paq.push(['setTrackerUrl', u+'tracking.php']);
			s3_paq.push(['setSiteId', s3_pw_set.pwid]);
			var d=document, sophus3g=d.createElement('script'), sophus3s=d.getElementsByTagName('script')[0];
			sophus3g.type='text/javascript'; sophus3g.async=true; sophus3g.defer=true; sophus3g.src=u+'tracking.js'; sophus3s.parentNode.insertBefore(sophus3g,sophus3s);
		}catch( err ) {}
	})();
	var s3pwdone = 1;
}
/*=====================================================================*/

var s3LogType = "s3def"; //default logtype

function s3load(path, script){
    var scriptEl = document.createElement('script');
    var scriptLst = document.getElementsByTagName('script')[0];
    
    try{
		scriptEl.type = 'text/javascript';
		scriptEl.async = true;
		scriptEl.src = path + '/' + script;
		scriptLst.parentNode.insertBefore(scriptEl, scriptLst);
	}
	catch(e){}
}

function setCookie(c_name, c_text, exdays, c_domain){
	var  t_value = '', t_expires = '', exdate = new Date(), t_domain = '';
	if (exdays) {
		exdate.setDate(exdate.getDate() + exdays);
		t_expires = '; expires=' + exdate.toUTCString();
	}
	if (c_domain) {
		 t_domain = '; domain=' + c_domain;
	}
	t_value = escape(c_text) +  t_expires + '; path=/' + t_domain;
	document.cookie = c_name + '=' + t_value;
}

function readCookie(c_name) {
	var searchname = c_name + '=';
	var ca = decodeURIComponent(document.cookie);
	var c = "";
	var i = 0;
	ca= ca.split(';');
	for (i = 0; i < ca.length; i = i + 1) {
		c = ca[i];
		while (c.charAt(0) === ' ') {c = c.substring(1, c.length); }
		if (c.indexOf(searchname) === 0) {return c.substring(searchname.length, c.length); }
	}
	return 'undefined';
}

function s3setCookieValue(c_name, v_name, v_value, exdays) {
	var oldc_text = readCookie(c_name), c_text = '', oldv_text = '', newv_text = '';
	if (oldc_text.indexOf(v_name) > -1) {
		oldv_text = v_name + ':' + s3getCookieValue(c_name, v_name);
		newv_text = v_name + ':' + v_value;
		c_text = s3_replace(oldc_text, oldv_text, newv_text);
	} else if (oldc_text != 'undefined') {
		c_text = oldc_text + '&' + v_name + ':' + v_value;
	} else {
		c_text = v_name + ':' + v_value;
	}
	setCookie(c_name, c_text, exdays, cookieDomain);
}

function s3getCookieValue(c_name, v_name) {
	var s3ckie = readCookie(c_name);
	var qsParm = [];
	if (s3ckie.indexOf(v_name + ':') >= 0) {
		var parms = s3ckie.split('&');
		for (var i = 0; i < parms.length; i = i + 1) {
			var pos = parms[i].indexOf(':');
			if (pos > 0) {
				var key = parms[i].substring(0,pos);
				var val = parms[i].substring(pos+1);
				qsParm[key] = val;
			}
		}
		return qsParm[v_name];
	}
}

function s3_replace(mainstring,searchstring,replacestring) {
	if (mainstring.indexOf(searchstring)>=0){
		return mainstring.substring(0,mainstring.indexOf(searchstring))+replacestring+mainstring.substring(mainstring.indexOf(searchstring)+searchstring.length,mainstring.lentgh)
	}
	else return mainstring;	
}

function s3getParam(paramName) {
    var qsParm = [];
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    var i = 0, pos =0, key = '', val = '', retval = '';
    for (i = 0; i < parms.length; i = i + 1) {
        pos = parms[i].indexOf('=');
        if (pos > 0) {
            key = parms[i].substring(0, pos);
            val = parms[i].substring(pos + 1);
            qsParm[key] = val;
        }
    }
    retval = (typeof qsParm[paramName] !== 'undefined') ? qsParm[paramName] : ''; 
    return retval;
}

function s3_configured() {
    s3_tag_version = "5.5.4h";
    s3_d_loc = window.location;
    s3_sent = 0;
    if (typeof s3_server_url === 'undefined' || typeof s3_site_id === 'undefined' ) return false;
    s3_encfn = (typeof encodeURIComponent !== 'undefined' ? encodeURIComponent : escape);
    s3_http = "http" + (s3_d_loc.href.substring(0,6) === "https:" ? "s": "") + "://";
    s3_server_url = s3_http + s3_server_url;
    s3_url = ( (typeof s3_page_alias !== 'undefined') ? s3_page_alias : s3_d_loc.href);
    s3_referrer = (typeof s3_referrer !== 'undefined' && s3_referrer !== "" && s3_referrer !== null ? s3_referrer : (typeof document.referrer === 'undefined' ? s3_ud : (document.referrer === null ? "null" : (document.referrer === "" ? "empty" : document.referrer))));
    s3_time = new Date().getTime();
    return true;
}

function s3_log(alias, displayed) {
	try{
		s3LogType = "s3log";	
		if (!s3_logging_active) return;
		alias = s3_fixURL(alias);
		s3_image = new Image();
		s3_image.src = s3_get_log_URL_s3log("i", alias, new Date().getTime(), displayed);
	} catch(err) {}
	
	try{
		if (typeof s3_paq !== 'undefined'){
			s3_paq.push(['trackEvent', 's3_log', alias]);	
		}
	}catch(err){}
}
function tc_log(alias, displayed) {
    s3_log(alias, displayed);
}

function s3_get_log_URL(type,locn,time,displayed) {
    if (typeof type === 'undefined' ) type = 'i';
    var url = s3_server_url + "/" + type + "?siteID=" + s3_site_id;
    if (type !=="d") {
        url += "&ts=" + (typeof time !== 'undefined' ? time : s3_time);
        var al = s3_isAlias(locn);
        if (typeof s3_containers !== 'undefined') for (cc in s3_containers) url += "&ccID=" + s3_containers[cc];
        if (type ==="c") url += "&log=no";
        if (al) url += "&alias=true";
        if (typeof displayed !== 'undefined' ) url += displayed;
        if (locn === 'undefined' ) locn = s3_d_loc;
        locn = s3_encfn(locn);
        while (locn.length > 1999-url.length) locn = locn.substring(0, locn.lastIndexOf(s3_encfn("&")));
        url += "&location=" + locn;
        var dg = new Object();
        dg.tagv = s3_tag_version;
        dg.tz = 0 - (new Date().getTimezoneOffset());
        dg.r = s3_encfn(s3_referrer);
        if (al) dg.aliased = s3_encfn(s3_d_loc.href);
        dg.title = s3_encfn(document.title);
        if (screen) {
            dg.cd=screen.colorDepth;
            dg.ah=screen.availHeight;
            dg.aw=screen.availWidth;
            dg.sh=screen.height;
            dg.sw=screen.width;
            dg.pd=screen.pixelDepth;
        }
        dg.edx = readCookie('s3edx');
        for (var key in dg) { 
            var param = "&" + key + "=" + dg[key];
            if (url.length + param.length < 2000) url += param;
            else break;
        }
    }
    else {
        url += "&dlts=" + s3_time + "&dl=" + (new Date().getTime() - s3_time);
    }
    return url;
}

function s3_get_log_URL_s3log(type, locn, time, displayed) {
    return s3_get_log_URL(type, locn, time, displayed) + "&s3log=1";
}

function s3_fixURL(url) {
    if (url === "") { return s3_d_loc.href }
    if ((url.substring(0,4) !== 'http') && (url.substring(0,1) !== "/")) { url = s3_d_loc.pathname.substring(0, s3_d_loc.pathname.lastIndexOf('/') + 1) + url }
    if (url.substring(0,1) === "/") { url = s3_http + s3_d_loc.host + url }
    return url;
}

function s3_isAlias(alias) {
    alias = (typeof alias !== 'undefined' ? alias : (typeof s3_page_alias === 'undefined' ? "" : s3_page_alias));
    alias = s3_fixURL(alias);
    if (alias.indexOf("?") > 0) alias = alias.substring(0, alias.indexOf("?"));
    return (alias !== s3_http + s3_d_loc.host + s3_d_loc.pathname);
}

function s3_loader() {
    s3_ud = "undefined";
    if (s3_logging_active && s3_configured() && (typeof s3_done === 'undefined' || s3_done===false)) {
        url = s3_fixURL(s3_url);
        s3_image = new Image();
        s3_image.name = "s3i";
        s3_image.onload = function(){s3_sent = true;}
        s3_image.src = s3_get_log_URL("i", url, s3_time);
    }
    s3_done = true;
}

try {
	s3_loader();
} catch(err) {}

<!-- marketshot - page view volkswagen  -->
!function(a,b){"use strict";function c(a){d[a]||(d[a]=function(){d._queue.push({method:a,args:Array.prototype.slice.apply(arguments)})})}var d=a.mics||{},e="init config push pushDefault addProperties addProperty onFinish onStart".split(" ");d._queue=d._queue||[],d._startTime=(new Date).getTime(),d._snippetVersion=1.2;for(var f=0;f<e.length;f++)c(e[f]);a.mics=d;var g=b.createElement("script");g.setAttribute("type","text/javascript"),g.setAttribute("src","//static.mediarithmics.com/tag/1.1/tag.min.js"),g.setAttribute("async","true"),b.getElementsByTagName("script")[0].parentNode.appendChild(g)}(window,document);
mics.init("vw1602");
mics.addProperty("vertical", "auto" );
mics.addProperty("brand", "volkswagen" );
mics.pushDefault();
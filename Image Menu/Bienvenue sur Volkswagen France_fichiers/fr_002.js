

vwd4.config.getTrackConfig = function() {
  if (typeof(s)==="undefined") {
    return {};
  }
  var config = {
    trackingServer: s.trackingServer,
    trackingServerSecure: s.trackingServerSecure,
    visitorNamespace: s.visitorNamespace,
    dc: s.dc,
    account: s.account,
    currencyCode: s.currencyCode,
    pageName: s.pageName,
    charSet: s.charSet
  };
  for (var param in s) {
    if (s.hasOwnProperty(param)) {
      if ((param.indexOf("prop")===0)
          || (param.indexOf("eVar")===0)
          || (param==="persCmp")) {
        config[param] = s[param];
      }
    }
  }
  return config;
};


vwd4.config.onAjaxLoadTrack = function(pData) {
  if (typeof(s)==="undefined") {
    return;
  }

  if (pData.eventParameters) {
    for (var param in pData.eventParameters) {
      if (pData.eventParameters.hasOwnProperty(param)) {
        if (param.indexOf("Omniture_")===0) {
          var paramName = param.substring("Omniture_".length);
          var paramValue = pData.eventParameters[param];
          s[paramName] = paramValue;
        }
      }
    }
  }

  
  s.eVar50 = vwd4.utils.isFlashFallbackModus() ? "fallback-noflash" : "standard";

  
  s.fpCookieDomainPeriods = getNumberOfDomainPoints();

  
  s.t();

  
  s.prop14 = null;
  s.prop33 = null;
  s.prop34 = null;

  
  s.events = "None";

};


vwd4.config.onClickTrack = function(pData) {
  if (typeof(s)==="undefined") {
    return;
  }
  if (pData.eventType==="PageLoad") {
    vwd4.config.onAjaxLoadTrack(pData);
    return;
  }

  
  var previousConfig = vwd4.config.getTrackConfig();

  if (pData.eventParameters) {
    for (var param in pData.eventParameters) {
      if (pData.eventParameters.hasOwnProperty(param)) {
        if (param.indexOf("Omniture_")===0) {
          var paramName = param.substring("Omniture_".length);
          var paramValue = pData.eventParameters[param];
          
          if (paramName==="events") {
            s.linkTrackEvents = paramValue;
          }
          s[paramName] = paramValue;
        }
      }
    }
  }
  var trackType = null;
  if ((pData.eventType==="LinkInternal") ||
      (pData.eventType==="Custom")) {
    trackType = "o";
  }
  else if (pData.eventType==="LinkExternal") {
    trackType = "e";
    s.prop21 = pData.eventTargetUrl + " : " + s.pageName;
  }
  else if (pData.eventType==="LinkDownload") {
    trackType = "d";
  }
  if (trackType) {
    var linkName = pData.eventTargetTitle;

    
    if ((pData.eventType==="LinkInternal") ||
        (pData.eventType==="LinkExternal") ||
        (pData.eventType==="LinkDownload")) {
      linkName = s.pageName + " | " + pData.eventTargetTitle;
    }

    
    var targetUrl = pData.eventTargetUrl;
    if (!targetUrl) {
      targetUrl = "#";
    }

    
    s.eVar50 = vwd4.utils.isFlashFallbackModus() ? "fallback-noflash" : "standard";

    
    s.pageName = null;
    s.channel = null;

    
    s.linkTrackVars = "";
    s.tl({href:targetUrl}, trackType, linkName);
  }

  
  s.fpCookieDomainPeriods = getNumberOfDomainPoints();

  
  vwd4.config.trackingRestorePreviousConfig(previousConfig);

  
  s.events = "None";

};


vwd4.config.onLoadTrack = function(pData) {
  var cookieName = "TrackingSession";
  if (!pData) {
    pData = {};
  }

  if(typeof pData.cookieName !== "undefined") {
    cookieName = pData.cookieName;
  }

  
  if (!jQuery.cookie(cookieName)) {
    // event1
    s.events = "event1";
    // ApplicationAndAction
    s.prop33 = s.prop32 + "Call";
    // ApplicationAndActionAndCarlineGroupName
    if (s.prop41) {
      s.prop34 = s.prop32 + "Call : " + s.prop41;
    }
  }
  
  var expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + (30 * 60 * 1000));
  jQuery.cookie(cookieName,1,{path:"/",expires:expiresDate});

  
  s.eVar50 = vwd4.utils.isFlashFallbackModus() ? "fallback-noflash" : "standard";

  
  s.fpCookieDomainPeriods = getNumberOfDomainPoints();

  
  if (pData.onLoadTrackingDisabled || (pData.onLoadTrackingFallbackOnly && !vwd4.utils.isFlashFallbackModus())) {

    
    
    if (typeof s_doPlugins=="function") {
      s_doPlugins(s);
    }

    return;
  }

  
  s.t();

  
  s.prop33 = null;
  s.prop34 = null;

  
  s.events = "None";

}


vwd4.config.trackingRestorePreviousConfig = function(pPreviousConfig) {
  for (var i=0; i<=99; i++) {
    s["prop"+i] = null;
    s["eVar"+i] = null;
  }
  for (var param in pPreviousConfig) {
    if (pPreviousConfig.hasOwnProperty(param)) {
      s[param] = pPreviousConfig[param];
    }
  }
}


getNumberOfDomainPoints = function() {
  points = 0;
  for (var i=0; i < location.host.length; i++) {
    if (location.host[i] === '.')
      points++;
  }
  
  return points;
}

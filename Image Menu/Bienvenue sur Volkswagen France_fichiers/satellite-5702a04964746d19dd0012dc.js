_satellite.pushAsyncScript(function(event, target, $variables){
  var _spn = _satellite.getVar('pageName');
var _lt = _satellite.getVar('linkType');
_satellite.notify("Multiplexer: s.pn = " + s.pageName);
_satellite.notify("Multiplexer: pn = " + _spn);
_satellite.notify("Multiplexer: s.pe = " + s.pe);
_satellite.notify("Multiplexer: lt = " + _lt);
switch (_satellite.getVar("ReportSuiteIDFirst")) {
  case "vwpkwbrcmsprod":
    if (s.prop32 == "ICC") {
      if (s.pageName == "ICC : HolzAuto" ||
          s.pageName == "ICC : Trimline" ||
          s.pageName == "ICC : Colour" ||
          s.pageName == "ICC : Options : Options" ||
          s.pageName == "ICC : Summary") {
        _satellite.track('BR_iHDCC_main_page');
      }
    }
		break;
	case "vwpkwdecmsprod":
/* MediaCom */
    _satellite.notify("DE-MediaCom TagContainer: linkType = " + s.linkType);
    if (s.prop32 == "MS-Driving-Experience" && s.linkType != "o" && s.linkType != "d" && s.linkType != "e")
      _satellite.track("DE-MediaCom_TagContainer");
/* Blackwood Seven */
    if (typeof(s.pageName) != "undefined" && s.pageName != "")
		_satellite.track("Blackwood Seven (DE)");
		break;
}
});

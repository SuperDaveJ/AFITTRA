// JavaScript Document
/***************************************************** jquery Functions ***************************************************/
isAssetsOpen = false;
isHelpOpen = false;
isTopicsOpen = false;

//$(document).ready( function() {
							//alert()
	//if (blnFirstPage) $("#back").hide();
	//if ( $("#dlink").find("a").length == 0 ) $("#dlink").hide();
	
	//check if there is narration or animation on the page						
	//if ( $("#content").find("#divNarration").length > 0 ) checkAudio();
    //if ( ($("#content").find("#divAnimation").length > 0 ) && (!parent.isPageViewed(parent.getPage())) ) hideNextButton();
	

//});



//Shadowbox.init({
//	//handleOversize: "drag",
//	overlayOpacity: 0.8,
//	modal: true
//});


function hideNextButton() {
		$("#next").addClass("disabled");
	}
	
function showNextButton() {
	$("#next").removeClass("disabled");
}

function hideBackButton() {
		$("#back").addClass("disabled");
	}
	
function showBackButton() {
	$("#back").removeClass("disabled");
}

function toggle_asset() {
	$("#helppanel").css("visibility", "hidden");
	if ( $("#assetpanel").css("visibility") == "visible" )
		$("#assetpanel").css("visibility", "hidden");
	else
		$("#assetpanel").css("visibility", "visible");
}

function toggle_help() {
	$("#assetpanel").css("visibility", "hidden");
	if ( $("#helppanel").css("visibility") == "visible" )
		$("#helppanel").css("visibility", "hidden");
	else
		$("#helppanel").css("visibility", "visible");
}

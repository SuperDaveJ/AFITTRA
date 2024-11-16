// JavaScript Document
/***************************************************** jquery Functions ***************************************************/
isAssetsOpen = false;
isHelpOpen = false;
isTopicsOpen = false;
isNextDisabled = false;

$(document).ready( function() {
							//alert()
	if (blnFirstPage) $("#back").hide();
	if ( $("#dlink").find("a").length == 0 ) $("#dlink").hide();
	
	//check if there is narration or animation on the page						
	if ( $("#content").find("#divNarration").length > 0 ) checkAudio();
    if ( ($("#content").find("#divAnimation").length > 0 ) && (!parent.isPageViewed(parent.getPage())) ) hideNextButton();
	
	$(".audioAction").click( function() {
		if (parent.audioOn) {
			parent.audioOn = false;
			//$("#menu").animate( {marginLeft: "-10px"}, 200 );
			$("#audioImage").html('<img src="../../system/button_audio_off.png" alt="Audio Off" border="0" />');
			controlAudio('off')
		} else {
			parent.audioOn = true;
			//$("#menu").animate( {marginLeft: "0"}, 200 );
			$("#audioImage").html('<img src="../../system/button_audio_on.png" alt="Audio On" border="0" />');
			controlAudio('on');
		}
	});

	$("#done img").hover ( 
		function() {
			this.src = this.src.replace( /_up/, '_ov' );
		},
		function() {
			this.src = this.src.replace( /_ov/, '_up' );
		}
	);
	
	$("#true_false img").hover ( 
		function() {
			this.src = this.src.replace( /_up/, '_ov' );
		},
		function() {
			this.src = this.src.replace( /_ov/, '_up' );
		}
	);

});

function checkAudio() {
	if (parent.audioOn) {
		//$("#audioImage").html('<img src="../../system/button_audio_on.png" alt="Audio On" border="0"/>');
		controlAudio('on')
	} else {
		$("#audioImage").html('<img src="../../system/button_audio_off.png" alt="Audio Off" border="0"/>');
		controlAudio('off');
	}
}

//Shadowbox.init({
//	//handleOversize: "drag",
//	overlayOpacity: 0.8,
//	modal: true
//});


function hideNextButton() {
		//$("#next").addClass("disabled");
		//isNextDisabled = true;
		//for review purpose, use the line below instead of the lines above
		isNextDisabled = false;
	}
	
function showNextButton() {
	$("#next").removeClass("disabled");
	isNextDisabled = false;
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

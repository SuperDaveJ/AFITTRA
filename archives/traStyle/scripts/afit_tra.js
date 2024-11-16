// JavaScript Document
// Global variables
var vpPath = "http://www.c2mm.net/virtualPilot/";	//path to Virtual Pilot site
var blnFirstPage = false;
var blnLastPage = false;
var blnHasCC = false;

/********************************** Course Content Related Functions *************************************/
/* This function will be called from flash */
function changePrompt(newPrompt) {
	//This function is added later. Otherwise the prompt would be designed different.
	//There are 3 possible IDs for the prompt div layer.
	divs = document.getElementsByTagName("div");
	for (var i=0; i<divs.length; i++) {
		if ( divs[i].id == "prompt" ) {
			document.getElementById("prompt").innerHTML = newPrompt;
			break;
		} else if ( divs[i].id == "prompt_two_lines" ) {
			document.getElementById("prompt_two_lines").innerHTML = newPrompt;
			break;
		} else if ( divs[i].id == "prompt_three_lines" ) {
			document.getElementById("prompt_three_lines").innerHTML = newPrompt;
			break;
		}
	}
}

function exitConfirm(){
	if (confirm("Do you wish to exit the course?")==true) parent.exitCourse(true);
}

function refresh() {
	window.location.reload();
}

function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable=yes,status=no,scrollbars="+scrollbar+",top="+positionTop+",left="+positionLeft+"");
	newWin.focus();
}

function showTopics() {
	//topics page file format is m#l#_topics.html (l = L for lesson)
	topicURL = "m" + parent.getModule() + "l" + parent.getLesson() + "_topics.html"
	openWinCentered(topicURL, "LessonTopics", 630, 700);
	//window.open(topicURL, "LessonTopics");
}

function showCC() {
	if (blnHasCC) {
	filename = parent.getPage() + "_cc.html";
	openWinCentered( filename, "ClosedCaptioning", 630, 450, "no" );
	} else {
		alert("There is no closed captioning for this page.");
	}
}

function openCourseAdmin() {
	openWinCentered("../../includes/course_admin.html", "CourseAdmin", 630, 600, "no" )
}

function openSystemReq() {
	openWinCentered("../../includes/sys_require.html", "SystemRequirement", 630, 600, "no" )
}

function openNavigation() {
	openWinCentered("../../includes/navigation.html", "Navigation", 630, 600, "no" )
}

function openGlossary() {
	openWinCentered("../../includes/glossary.html", "Glossary",  650, 700, "yes" );
}

function openDocuments() {
	openWinCentered("../../includes/documents.html", "Documents",  630, 600, "no" );
}

function openReferences() {
	openWinCentered("../../includes/references.html", "References",  630, 600, "no" );
}

//this fuction is for page popup windows
function showPopup(popID, w, h, position) {

/*	if (size == "large") {
	  w = 800;
	  h = 600;
	} else if (size == "small") {
	  w = 400;
	  h = 300;
	} else {	//medium
	  w = 600;
	  h = 450;
	}
*/	
	switch (position) {
	  case "left":
		//top left corner
		L = self.screenLeft;
		//T = self.screenTop;
		break;
	  case "right":
		//right bottom
		L = screen.width - w - 10;
		//T = screen.height - h;
		break;
	  default:
		//centered
		L = (screen.width - w) / 2 - 5;
		//T = (screen.height - myHeight) / 2 - 25;
		break;
	}   
	T = (screen.height - h) / 2 - 25;
		
	var theURL = parent.getPage() + "_pop.html?popterm=" + popID
	popWind = window.open(theURL, "", "left=" + L + ",top=" + T + ",width=" + w + ",height=" + h + ",resizable=no,scrollbars=no, status=no, toolbar=no, menubar=no, location=no")
}

/***************************** Flash Narration and Animation Functions *********************************/
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_controlShockwave(objStr,x,cmdName,frameNum) { //v3.0
  var obj=MM_findObj(objStr);
  if (obj) eval('obj.'+cmdName+'('+((cmdName=='GotoFrame')?frameNum:'')+')');
}

// Enable/Disable audio and Show/Hide buttons
function controlAudio( onOrOff ) {
	//controlAudio( "on" ) for Play button, controlAudio( "off" ) for Pause button
	//This will play and pause narration audio whose id is "narration".  Animation flash id is "flashmovie".
    if (document.narration) {
		if (onOrOff == "on") {
			MM_controlShockwave('narration','','Play');
			document.getElementById("audio_off").style.visibility = "hidden";
			document.getElementById("audio_on").style.visibility = "visible";
			parent.audioOn = true;
		} else {
			MM_controlShockwave('narration','','StopPlay');	
			document.getElementById("audio_off").style.visibility = "visible";
			document.getElementById("audio_on").style.visibility = "hidden";
			parent.audioOn = false;
		}
	}
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function checkAudio() {
	//This function needs to be called at the bottom of every page.
    if (document.narration) {
		if ( parent.audioOn == true ) {
			document.getElementById('audio_on').style.visibility='visible';
			document.getElementById('audio_off').style.visibility='hidden';
			MM_controlShockwave('narration','','Play');
		} else {
			document.getElementById('audio_on').style.visibility='hidden';
			document.getElementById('audio_off').style.visibility='visible';
			MM_controlShockwave('narration','','StopPlay');	
		}
	} else {
		document.getElementById('audio_on').style.visibility='hidden';
		document.getElementById('audio_off').style.visibility='hidden';
	}
}

/***************************************************** Query Functions ***************************************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

/***************************************************** Comments Functions ***************************************************/
function addComment() {
	comWin = window.open(vpPath + 'addComment.asp?uID='+parent.userID+'&cID='+parent.courseID+'&mID='+moduleID+'&lID='+lessonID+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + 'reviewComments.asp?uID='+parent.userID+'&cID='+parent.courseID+'&mID='+moduleID+'&lID='+lessonID+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}

/***************************************************** Other Functions ***************************************************/


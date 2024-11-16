// JavaScript Document for AFIT - SLIM
// This file needs to be included in the index file only
/************************************** Suspend Data Format *************************************************/
/* moduleStatus~lessonStatus~pagesViewed
/* moduleStatus and lessonStatus are  streams of 0, 1, and 2 separated by comma (,). 
/* 0=not started, 1=started but not completed, 2=completed
/* pagesViewed contains page file names (without .html) that have been viewed.
/* If NOT in LMS, cookie is used to store suspend data.
/************************************** SCORM and Navigation Functions **************************************/

//Store global variable here.
inLMS = false;
audioOn = true;
var module;
var mName;
var strPagesViewed = "";
var strAllModuleStatus = "";
var strAllLessonStatus = "";
var bookmark = "";
/* number of modules and number of lessons for each module */
//var nModules = 7;		//There are 7 modules
var nLessons_1 = 2;		//module 1 lessons
var nLessons_2 = 3;		//module 2 lessons
var nLessons_3 = 3;		//module 3 lessons
var nLessons_4 = 3;		//module 4 lessons
var nLessons_5 = 3;		//module 5 lessons
var nLessons_6 = 3;		//module 6 lessons
var nLessons_7 = 2;		//module 7 lessons

function gotoPage(direction, pgURL) {
	//window.location = getLesson() + "/" + pgURL;
	if (direction == "f") {
		alert(getPage())
		if ( isPageViewed(getPage()) != true ) {
			strPagesViewed = strPagesViewed + "," + getPage();
			if (contentFrame.blnLastPage) toModuleMenu();
		}
	}
	if (contentFrame.blnFirstPage) updateLessonStatus('1');
	contentFrame.location.href = pgURL;
}

function toModuleMenu() {
	var iMod = module;
	mFile = "../index_m" + iMod + ".html";
	if (contentFrame.blnLastPage) {
		updateLessonStatus('2');
		updateDatabase();
	} else {
		updateSuspendData()
	}
	contentFrame.location.href = mFile;
}

function getPage() {
	//return current page file name in lower case without file extension.
	arrTemp = new Array();
	arrTemp2 = new Array();
	arrTemp = contentFrame.location.href.split("/");
	arrTemp2 = arrTemp[arrTemp.length-1].split("?");
	var strTemp = arrTemp2[0];
	var intTemp = strTemp.indexOf(".htm");
	strTemp = strTemp.substring(0,intTemp);
	return strTemp.toLowerCase();
}

function getLesson() {
	//Returns an integer as lessonID
	var strTemp = getPage();
	if ( strTemp.indexOf("menu") > 0 ) return 0;
	else return parseInt(strTemp.substr(1,1));
}

//function getModule() {
//	//Returns an integer as moduleID
//	var strTemp = getPage();
//	if ( strTemp.indexOf("menu") > 0 ) return 0;
//	else return parseInt(strTemp.substr(0,1));
//}

//This function needs to be called from first page and last page of each lesson.
//in first page: updateLessonStatus('1'), in last page: updateLessonStatus('2')
function updateLessonStatus(cStatus) {
	//var iMod = getModule();
	var iLes = getLesson();
	strAllLessonStatus = strAllLessonStatus.substr(0, iLes-1) + cStatus + strAllLessonStatus.substr(iLes+1,strAllLessonStatus.length)
	//arrTemp = strAllLessonStatus .split(",");
	//arrTemp[iMod-1] = arrTemp[iMod-1].substr(0, iLes-1) + cStatus + arrTemp[iMod-1].substr(iLes);
	//strAllLessonStatus = arrTemp.join();
	//update module status if necessary
	var allDone = true;
	for (var i=0; i<strAllLessonStatus.length; i++) {
		if (strAllLessonStatus.substr(i,1) != "2") {
			allDone = false;
			break;
		}
	}
	//if (allDone) {
//		strAllModuleStatus = strAllModuleStatus.substr(0,iMod-1) + "2" + strAllModuleStatus.substr(iMod);
//	} else {
//		if ( strAllModuleStatus.substr(iMod-1, 1) != "2" )
//			strAllModuleStatus = strAllModuleStatus.substr(0,iMod-1) + "1" + strAllModuleStatus.substr(iMod);
//	}
	if (cStatus == "2") cleanSuspendData();
	else updateSuspendData();
}

function isPageViewed(pageFile) {
	pageFile = pageFile.toLowerCase()
	var intTemp = pageFile.indexOf(".htm")
	if (intTemp != -1) pageFile = pageFile.substring(0,intTemp)
	//var iMod = getModule();
	var iLes = getLesson();
	if ( getSingleLessonStatus( iLes) > 1 ) return true
	if (typeof(strPagesViewed) == "undefined") return false
	if (strPagesViewed.indexOf(pageFile) >= 0) return true
	else return false
}

//function getAllModuleStatus() {
//	getSuspendData();
//	return strAllModuleStatus;		// a stream of 7 numbers (combination of 0,1, and 2)
//}
//
//function getSingleModuleStatus(iMod) {
//	return parseInt( getAllModuleStatus().substr(iMod-1,1) );	//returns an integer value
//}

function getAllLessonStatus() {
	//getSuspendData();
	return strAllLessonStatus;		// a stream of 7 sections of numbers
}

//function getLessonStatusByModule(iMod) {
//	return getAllLessonStatus().split(",")[iMod-1];		// a stream of 2 or 3 numbers for ith module
//}

function getSingleLessonStatus(iLes) {
	return parseInt( getAllLessonStatus().substr(iLes-1,1) );		//returns an integer value
}

function checkCourseStatus() {
	var allDone = true;
	for (var i=0; i<modules; i++) {
		if (getAllModuleStatus().substr(i,1) != "2") {
			allDone = false;
			break;
		}
	}
	return allDone;
}

function startCourse() {
	module = moduleid.substring(1,moduleid.length);
	mName = "m"+module+"menu.html"
	initialStatus=""
	for (var i=0; i< eval("nLessons_"+module);i++) {
		initialStatus += "0";
	}

	if (inLMS == true) {
		//loadPage() is in SCOFunctions2004.js
		//it initializes API, starts timer, and sets exitPageStatus to false
		loadPage();	
		
		var strTemp = doGetValue( "cmi.suspend_data" );
		//if (strTemp == "" || typeof(strTemp) == "undefined") {
		if ( strTemp == "403" ) {	//DataModelElementValueNotInitialized
			doSetValue( "cmi.suspend_data", initialStatus );
			doCommit();
			strAllLessonStatus = initialStatus;
		} else {
			strCourseStatus = doGetValue("cmi.completion_status");
			if (strCourseStatus == "completed") {
				strAllLessonStatus = "";
				for (var i=0; i< eval("nLessons_"+module);i++) {
					strAllLessonStatus += "2";
				}
			} else getSuspendData();
		}
		bookmark = doGetValue("cmi.location");
		
		if ( (bookmark == "403") || (bookmark.indexOf(mname) >= 0) ) bookmark = "";
	} else {
		if ( Get_Cookie("userData") ) {
			getSuspendData();
		} else {
			Set_Cookie("userData", initialStatus, 60, "/", "", "");
			strAllLessonStatus = initialStatus;
		}
		if ( Get_Cookie("userBookmark") ) {
			bookmark = Get_Cookie("userBookmark");
			if ( bookmark.indexOf(mName) >= 0 ) bookmark = "";
		}
	}

	if (bookmark != "") {
		if (confirm("Do you wish to resume where you left?")==true) contentFrame.location.href = bookmark;
	}
}

function exitCourse() {
	if ( exitPageStatus != true ) {
		updateDatabase();
		exitPageStatus = true;
		if ( inLMS == true ) {
			if (contentFrame.blnLastPage) {
				updateLessonStatus('2');
			}
			doSetValue( "cmi.location", contentFrame.location.href );	//bookmarking
			setSCORM2004time();
			if ( checkCourseStatus() ) {
				//the current learner session will NOT be available if the SCO is relaunched.
				doSetValue( "cmi.exit", "normal" );
				//doSetValue( "adl.nav.request", "exit" );
				doSetValue( "adl.nav.request", "exitAll" );
			} else {
				doSetValue( "cmi.exit", "suspend" );
				doSetValue("adl.nav.request", "suspendAll");
			}
			doTerminate();
		} else {
			Set_Cookie("userBookmark", contentFrame.location.href, 60, "/", "", "");
		}
		window.close();
	}
}

function unloadCourse() {
	if (exitPageStatus != true) {
		exitCourse();
	}
}

//This function is for module 7 - test only
function setCourseScore(uScore) {
	doSetValue("cmi.score.min", 0);
	doSetValue("cmi.score.max", 100);
	doSetValue("cmi.score.raw", uScore);
	doSetValue("cmi.score.scaled", uScore/100);
}

function updateSuspendData() {
   	if ((strPagesViewed == "") || (typeof(strPagesViewed) == "undefined")) {
		strPagesViewed = ""
	}
	//var iMod = module //getModule();
	var iLes = getLesson();
	if ( iLes != 0 ) { //NOT on the mainmenu or any lesson menu
		if ( (strPagesViewed.indexOf(getPage()) == -1) && (getSingleLessonStatus(iLes) < 2) ) {
			strPagesViewed = strPagesViewed + "," + getPage();
		}
	}
	strTemp = strAllLessonStatus + "~" + strPagesViewed;
	if (inLMS == true) {
		doSetValue("cmi.suspend_data", strTemp);
		doCommit();
	} else {
		Set_Cookie("userData", strTemp, 60, "/", "", "");
	}
}

function getSuspendData() {
	if (inLMS == true) {
		strTemp = doGetValue( "cmi.suspend_data" );
	} else {
		strTemp = Get_Cookie("userData");
	}
	if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
		arrTemp = new Array();
		arrTemp = strTemp.split("~");
		strAllLessonStatus = arrTemp[0];		// a stream of lessons
		strPagesViewed = arrTemp[1];    // a string of viewed pages
	}
}

function cleanSuspendData() {
	var re = /,,/g;
	var strTemp = strPagesViewed.toLowerCase();
	arrTemp = strTemp.split(",");
	//for (var i=1; i<=nModules; i++) {
		iTemp = eval("nLessons_" + module);
		i=module
		for (var j=1; j<=iTemp; j++) {
			if ( getSingleLessonStatus(j) > 1 ) {
				for (var k=0; k<arrTemp.length; k++) {
					if ( (parseInt(arrTemp[k].substr(0,1))==i) && (parseInt(arrTemp[k].substr(1,1))==j) ) arrTemp[k] = ""
				}
			}
		}
		strTemp = arrTemp.join();
		while (strTemp.indexOf(",,") != -1) {
			str2 = strTemp.replace(re,",");
			strTemp = str2;
		}
	//}
	//after cleaned
	strPagesViewed = strTemp;
	updateSuspendData();
}

function updateDatabase() {
	//This function will be called when exit the course or when a lesson is completed
	updateSuspendData();
	if (inLMS == true) {
		if ( checkCourseStatus() ) {
			doSetValue( "cmi.completion_status", "completed" );
		} else {
			doSetValue( "cmi.completion_status", "incomplete" );
		}
		doCommit();
	}
}

function setSCORM2004time() {
	//record the session time
	var endTime = new Date();
	var totalMilliseconds = ( endTime.getTime() - startDate );
	var scormTime = ConvertMilliSecondsIntoSCORM2004Time(totalMilliseconds);
	
	doSetValue("cmi.session_time", scormTime);
}

function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds){
	var ScormTime = "";
	var HundredthsOfASecond;
	var Seconds;
	var Minutes;
	var Hours;
	var Days;
	var Months;
	var Years;
	
	var HUNDREDTHS_PER_SECOND = 100;
	var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
	var HUNDREDTHS_PER_HOUR   = HUNDREDTHS_PER_MINUTE * 60;
	var HUNDREDTHS_PER_DAY    = HUNDREDTHS_PER_HOUR * 24;
	var HUNDREDTHS_PER_MONTH  = HUNDREDTHS_PER_DAY * (((365 * 4) + 1) / 48);
	var HUNDREDTHS_PER_YEAR   = HUNDREDTHS_PER_MONTH * 12;
	
	HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);
	Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
	HundredthsOfASecond -= (Years * HUNDREDTHS_PER_YEAR);
	Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
	HundredthsOfASecond -= (Months * HUNDREDTHS_PER_MONTH);
	Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
	HundredthsOfASecond -= (Days * HUNDREDTHS_PER_DAY);
	Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
	HundredthsOfASecond -= (Hours * HUNDREDTHS_PER_HOUR);
	Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
	HundredthsOfASecond -= (Minutes * HUNDREDTHS_PER_MINUTE);
	Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
	HundredthsOfASecond -= (Seconds * HUNDREDTHS_PER_SECOND);
	
	if (Years > 0) {
		ScormTime += Years + "Y";
	}
	if (Months > 0){
		ScormTime += Months + "M";
	}
	if (Days > 0){
		ScormTime += Days + "D";
	}
	
	//check to see if we have any time before adding the "T"
	if ((HundredthsOfASecond + Seconds + Minutes + Hours) > 0 ){
		ScormTime += "T";
		if (Hours > 0){
			ScormTime += Hours + "H";
		}
		if (Minutes > 0){
			ScormTime += Minutes + "M";
		}
		if ((HundredthsOfASecond + Seconds) > 0){
			ScormTime += Seconds;
			
			if (HundredthsOfASecond > 0){
				ScormTime += "." + HundredthsOfASecond;
			}
			ScormTime += "S";
		}
	}
	if (ScormTime == ""){
		ScormTime = "0S";
	}
	
	ScormTime = "P" + ScormTime;
	
	return ScormTime;
}

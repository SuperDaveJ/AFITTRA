// JavaScript Document
// override funcs defined within the Lib
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
	//alert("object = " + dd.obj.name + "; below = " + dd.elements.img5.getEltBelow().name);
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	if (dd.obj.getEltBelow().name != 'targetHolder') {
		dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
	}
}

function evalMatches() {
	for (var i=0; i<nObj; i++) {
		//clear previous data first
		arrUser[i] = "";
		tempX = eval("dd.elements.img"+(i+1)+".x");
		tempY = eval("dd.elements.img"+(i+1)+".y");
		tX = dd.elements.targetHolder.x;
		tY = dd.elements.targetHolder.y;
		tW = dd.elements.targetHolder.w;
		tH = dd.elements.targetHolder.h;
		if ( (tempX > tX) && (tempX < (tX + tW)) && (tempY > tY) && (tempY < (tY + tH)) ) {
			arrUser[i] = eval("dd.elements.img"+(i+1)+".name");
		}
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		eval("dd.elements.img"+(i+1)+".setDraggable(false)");
	}
}

function judgeInteraction() {
	uCorrect = 0;
	TriesUser += 1;
	if (TriesUser > TriesLimit) return
	
	evalMatches();
	nOnboard = 0;
	for (var i=0; i<nObj; i++) {
		if (arrUser[i] != "") nOnboard += 1;
	}
	for (var i=0; i<nObj; i++) {
		if (arrCorrect[i] == arrUser[i]) uCorrect += 1;
	}

	if (uCorrect == nObj) {
		//Correct
		if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
		strTemp = fdbkCorrect;
		disableDrag();
		document.getElementById("done").style.visibility = "hidden";
		showNextButton();
	} else if (nOnboard == 0) {
		TriesUser -= 1;
		strTemp = fdbkIncorrect0;
	} else {
		if (TriesUser < TriesLimit) {
			//first try
			for (var i=nCorrect+1; i<=nObj; i++) {
				//move incorrect ones back to their initial positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.img" + i + ".defx, dd.elements.img" + i + ".defy)");
			}
			strTemp = fdbkIncorrect1;
		} else {
			//final try
			for (var i=nCorrect+1; i<=nObj; i++) {
				//move incorrect ones back to their initial positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.img" + i + ".defx, dd.elements.img" + i + ".defy)");
			}
			for (var i=1; i<=nCorrect; i++) {
				//move correct one to their target positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.targetHolder.defx + arrOffset[" + (i-1) + "][0], dd.elements.targetHolder.defy + arrOffset[" + (i-1) + "][1])");
			}
			strTemp = fdbkIncorrect2;
			disableDrag();
			document.getElementById("done").style.visibility = "hidden";
		}
	}
	showFdbk(strTemp);
}

function showFdbk(fromfdbk) {
	//alert(blnmultiP)
	if (TriesUser == TriesLimit) {
		showNextButton();
		document.getElementById("done").style.visibility = "hidden"
	}
	var strTemp = "";	
	var strTitle;
	if (parent.inQuiz) strTitle = "AFIT-TRA Assessment Question Feedback";
	else strTitle = "AFIT-TRA Status Check Feedback";
	positionTop = (screen.height - 450)/2 - 25;
	positionLeft = (screen.width - 630)/2 - 5;
	newWin = window.open ("","Feedback","toolbar=no,width=630,height=450,menubar=no,resizable=yes,status=no,scrollbars=no,top="+positionTop+",left="+positionLeft+"");
	newWin.focus(); //openWinCentered(fdbcname, "Feedback", 630, 600, "no" );
	if (newWin != null)
	{
	if (newWin.opener == null) {newWin.opener = window};
	strTemp	= strTemp + "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
	strTemp	= strTemp + "<html xmlns='http://www.w3.org/1999/xhtml'>";
	strTemp	= strTemp + "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"
	strTemp	= strTemp + "<title>" + strTitle + "</title>"
	strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../../question_feedback.css' />"
	strTemp	= strTemp + "</head><body><h1 class='feedback_title'>Status Check Feedback</h1><div id='content'>"
	strTemp	= strTemp + fromfdbk
	strTemp	= strTemp + "</div><div id='close'><a class='bb' href=javascript:window.close();>Close this window</a></div>"
	strTemp	= strTemp + "</body></html>"
	strTemp	= strTemp + ""
	
		//newWin.document.getElementById("pText").innerHTML = arrPopup[fromfdbk];
		newWin.document.write(strTemp);
		newWin.document.close();
	}
}

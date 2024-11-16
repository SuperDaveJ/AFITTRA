// JavaScript Document
function evalMatches() {
	for (var i=0; i<nObj; i++) {
		arrUser[i] = eval("dd.elements.drag"+(i+1)+".getEltBelow().name");
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		//The del() function below moves draggable items back to their original position
		//eval("dd.elements.drag"+(i+1)+".del()");
		eval("dd.elements.drag"+(i+1)+".setDraggable(false)");
	}
}

function judgeInteraction() {
	intUserCorrect = 0;
	TriesUser += 1;
	strFdbk = ""
	
	if (TriesUser <= TriesLimit) {
		//Check to see if any object are moved
		nNotMoved = 0;
		for (var i=0; i<nObj; i++) {
			if ( eval("dd.elements.drag"+(i+1)+".x") == eval("dd.elements.drag"+(i+1)+".defx") && eval("dd.elements.drag"+(i+1)+".y") == eval("dd.elements.drag"+(i+1)+".defy") ) {
				nNotMoved += 1;
			}
		}

		if (nNotMoved == nObj) {
			strFdbk = fdbkWrong0;
			TriesUser -= 1;
		} else {
			evalMatches();
			for (var i=0; i<nObj; i++) {
				if (arrUser[i] == arrCorrect[i]) intUserCorrect += 1;
			}
			if (intUserCorrect == nObj) {
				//Correct
				strFdbk = fdbkCorrect;
				disableDrag();
				document.getElementById("done").style.visibility = "hidden";
				showNextButton();
			} else {
				if (TriesUser != TriesLimit) {
					//Not final try. Move incorrect ones back.
					for (var i=0; i<nObj; i++) {
						if (arrUser[i] != arrCorrect[i]) {
							eval("dd.elements.drag"+(i+1)+".moveTo(dd.elements.drag"+(i+1)+".defx, dd.elements.drag"+(i+1)+".defy)");
						}
					}
					//alert("Not quite! You got " + intUserCorrect + " correct. Try again.");
					strFdbk = fdbkWrong1;
				} else {
					//Final try. Show correct matches.
					for (var i=0; i<nObj; i++) {
						if (arrUser[i] != arrCorrect[i]) {
							eval("dd.elements.drag"+(i+1)+".moveTo(dd.elements."+arrCorrect[i]+".defx, dd.elements."+arrCorrect[i]+".defy)");
						}
					}
					//alert("Not quite! You got " + intUserCorrect + " correct. The correct matches are now displayed.");
					strFdbk = fdbkWrong2;
					disableDrag();
					document.getElementById("done").style.visibility = "hidden";
				}
			}
		}
		showFdbk(strFdbk);
	}
}

// override funcs defined within the Lib
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	//This function puts the dragged object either to the target or pull back to its original place.
	strTemp = dd.obj.name;
	
	switch (dd.obj.getEltBelow().name) {
		case 'target1':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target1.defx, dd.elements.target1.defy);
			break;
		case 'target2':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target2.defx, dd.elements.target2.defy);
			break;
		case 'target3':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target3.defx, dd.elements.target3.defy);
			break;
		case 'target4':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target4.defx, dd.elements.target4.defy);
			break;
		case 'target5':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target5.defx, dd.elements.target5.defy);
			break;
		case 'target6':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target6.defx, dd.elements.target6.defy);
			break;
		case 'target7':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target7.defx, dd.elements.target7.defy);
			break;
		case 'target8':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target8.defx, dd.elements.target8.defy);
			break;
		case 'target9':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target9.defx, dd.elements.target9.defy);
			break;
		case 'target10':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target10.defx, dd.elements.target10.defy);
			break;
		case 'target11':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target11.defx, dd.elements.target11.defy);
			break;
		default:
			dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
			break;
	}
}

function showFdbk(fromfdbk) {
	if (TriesUser == TriesLimit) showNextButton();
	var strTemp = "";	
	var strTitle;
	strTitle = "AFIT-TRA Status Check Feedback";
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

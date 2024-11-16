// NOTE:
// This works for any number of dragable objects and place them in proper order
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
	uCorrect = 0;
	strTemp = arrCorrect.join();
	//alert("dd.obj.getEltBelow().name = " + dd.obj.name);
	switch (dd.obj.getEltBelow().name) {
		//slops object to a target
		case 'target1':
			dd.obj.moveTo(dd.elements.target1.defx, dd.elements.target1.defy);
			break;
		case 'target2':
			dd.obj.moveTo(dd.elements.target2.defx, dd.elements.target2.defy);
			break;
		case 'target3':
			dd.obj.moveTo(dd.elements.target3.defx, dd.elements.target3.defy);
			break;
		case 'target4':
			dd.obj.moveTo(dd.elements.target4.defx, dd.elements.target4.defy);
			break;
		case 'target5':
			dd.obj.moveTo(dd.elements.target5.defx, dd.elements.target5.defy);
			break;
		case 'target6':
			dd.obj.moveTo(dd.elements.target6.defx, dd.elements.target6.defy);
			break;
		case 'target7':
			dd.obj.moveTo(dd.elements.target7.defx, dd.elements.target7.defy);
			break;
		case 'target8':
			dd.obj.moveTo(dd.elements.target8.defx, dd.elements.target8.defy);
			break;
		case 'target9':
			dd.obj.moveTo(dd.elements.target9.defx, dd.elements.target9.defy);
			break;
		case 'target10':
			dd.obj.moveTo(dd.elements.target10.defx, dd.elements.target10.defy);
			break;
		default:
			dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
			break;
	}
}

function evalMatches() {
	for (var i=0; i<nObj; i++) {
		if (i<9)
			arrUser[i] = eval("dd.elements.drag_"+(i+1)+".getEltBelow().name");
		else {
			//10th object and up
			charTemp = String.fromCharCode(88+i);
			//return a letter from Char Code 97=a, 98=b, etc.
			arrUser[i] = eval("dd.elements.drag_" + charTemp + ".getEltBelow().name");
		}
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		if (i<9) {
			eval("dd.elements.drag_"+(i+1)+".setDraggable(false)");
		} else {
			charTemp = String.fromCharCode(88+i);
			eval("dd.elements.drag_" + charTemp + ".setDraggable(false)");
		}
	}
}

function judgeInteraction() {
	uCorrect = 0;
	TriesUser += 1;
	if (TriesUser > TriesLimit) return
	
	evalMatches();
	for (var i=0; i<nObj; i++) {
		if (arrUser[i] == arrCorrect[i])  uCorrect += 1;
	}
	
	if (uCorrect == nCorrect) {
		//Correct
		if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
		strTemp = fdbkCorrect;
		disableDrag();
		document.getElementById("done").style.visibility = "hidden";
		showNextButton();
	} else if (uCorrect == 0) {
		TriesUser -= 1;
		strTemp = fdbkIncorrect0;
	} else {
		if (TriesUser < TriesLimit) {
			//first try
			for (var i=0; i<nObj; i++) {
				if (arrUser[i] != arrCorrect[i]) {
					if (i<9)
						eval("dd.elements.drag_"+(i+1)+".moveTo(dd.elements.drag_"+(i+1)+".defx, dd.elements.drag_"+(i+1)+".defy)");
					else {
						charTemp = String.fromCharCode(88+i);
						eval("dd.elements.drag_"+charTemp+".moveTo(dd.elements.drag_"+charTemp+".defx, dd.elements.drag_"+charTemp+".defy)");
					}
				}
			}
			strTemp = fdbkIncorrect1;
		} else {
			//Final try. Show correct matches.
			for (var i=0; i<nObj; i++) {
				if (i < nCorrect) {
					if ( i<9 )
						eval("dd.elements.drag_"+(i+1)+".moveTo(dd.elements."+arrCorrect[i]+".defx, dd.elements."+arrCorrect[i]+".defy)");
					else {
						charTemp = String.fromCharCode(88+i);
						eval("dd.elements.drag_"+charTemp+".moveTo(dd.elements."+arrCorrect[i]+".defx, dd.elements."+arrCorrect[i]+".defy)");
					}
				} else {
					if ( i<9 )
						eval("dd.elements.drag_"+(i+1)+".moveTo(dd.elements.drag_"+(i+1)+".defx, dd.elements.drag_"+(i+1)+".defy)");
					else {
						charTemp = String.fromCharCode(88+i);
						eval("dd.elements.drag_"+charTemp+".moveTo(dd.elements.drag_"+charTemp+".defx, dd.elements.drag_"+charTemp+".defy)");
					}
				}
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
	var strTemp = "";	
	var strTitle;
	if (parent.inQuiz) strTitle = "AFIT-SLIM Assessment Question Feedback";
	else strTitle = "AFIT-SLIM Knowledge Challenge Feedback";
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
	  
	  //newWin.document.getElementById("pText").innerHTML = arrPopup[fromfdbk];
	  newWin.document.write(strTemp);
	  newWin.document.close();
	}
}

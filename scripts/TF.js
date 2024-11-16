// JavaScript Document

var triesUser = 0;
var triesLimit = 1;
var ansUser = "";

function  setValue(tf) {
	ansUser = tf;
}
 
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp = "";
		if (ansUser == "") {
			strTemp = fdbkWrong0;
		} else {
		  triesUser += 1;
		  if (ansUser == ansCorrect) {
			  if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
			  strTemp = fdbkCorrect;
		  } else {
			  strTemp = fdbkWrong1;
		  }
		}
		showFeedback(strTemp);
	}
}

 
function showFeedback (fromfdbk) {
	var strTemp = "";	
	if (triesUser == triesLimit) {
		document.getElementById("done").style.visibility = "hidden";
		showNextButton();
		$("#true_false img").css("cursor", "default");
	}

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
	strTemp	= strTemp + "<title>AFIT-SLIM Knowledge Challenge Feedback</title>"
	strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../../question_feedback.css' />"
	strTemp	= strTemp + "</head><body><h1 class='feedback_title'>Status Check Feedback</h1><div id='content'>"
	strTemp	= strTemp + fromfdbk;
	strTemp	= strTemp + "</div><div id='close'><a class='bb' href=javascript:window.close();>Close this window</a></div>"
	strTemp	= strTemp + "</body></html>"
	strTemp	= strTemp + ""
	
		newWin.document.write(strTemp);
		newWin.document.close();
	}
}


/* JavaScript source code to execute the Star Wars game.
 
   NAME: utilities.js
   AUTHOR: Elaina Swann
   DATE: 12/16/2017
   REVISION LOG:  
*/

function clearMsgLines() {
  $("#msg-line-1").empty();
  $("#msg-line-2").empty();
}

function doesChildExist(parentElement) {
    return parentElement.children().length;
}

function moveCharacter(charElement, strLocation){
  var strRemClass = "",
      strAddClass = "",
      strRow      = "";

  switch (strLocation) {
    case "chosen": 
      strRemClass = "choose";
      strAddClass = "chosen";
      strRow      = "#chosen-row";
      break;
    case "enemy" : 
      strRemClass = "choose";
      strAddClass = "enemy";
      strRow      = "#enemy-row";
      break;
    case "defender" : 
      strRemClass = "enemy";
      strAddClass = "defender";
      strRow      = "#defender-row";  
      break; 
    default:
      console.log("moveCharacter: Unknown location - " + strLocation + "."); 
  }

  charElement.removeClass(strRemClass).addClass(strAddClass);

  /* Required to get white font color for defender labels. */
  if (strLocation === "defender") {
    charElement.parent().children("label").addClass("defender-label");
  }

  $(strRow).append(charElement.parent());
}

function renderImage(objCharacter, strRowID) {
  var divElement = $("<div>")
                    .addClass("col-md-2 img-col")
                    .attr("id", "img-col-" + objCharacter.strShortName);

  $(divElement).append($("<img>")
               .attr("src", "assets/images/" + 
                             objCharacter.strFullName + ".jpg")
               .addClass("img-responsive img choose")
               .attr("id", objCharacter.strShortName)
               .attr("alt", objCharacter.strFullName + " image"));

  $(strRowID).append(divElement);
}

function renderLabel(objCharacter, strType) {
  var text = (strType === "name") ? objCharacter.strFullName :
                                    objCharacter.nHealthPts;

  $("#img-col-" + objCharacter.strShortName)
              .append($("<label>")
              .addClass("text-center img-label")
              .addClass(strType + "-label")
              .attr("id", strType + "-label-" + objCharacter.strShortName)
              .text(text));
}

function renderMsgLines(objChosen, objDefender, strStatus, nChosenAttack) {
  function applyMessages(strMsgLine1, strMsgLine2) {
    (strMsgLine1.length) ? $("#msg-line-1").text(strMsgLine1) :
                           $("#msg-line-1").empty();
    (strMsgLine2.length) ? $("#msg-line-2").text(strMsgLine2) :
                           $("#msg-line-2").empty();
  }

  function addRestartBtn() {
    $("#msg-2").append($("<button>")
               .attr("type", "button")
               .addClass("btn btn-default btn-lg")
               .attr("id", "restart")
               .text("Restart"));

    /* When the restart button is added, disable the attack button. */
    $("#attack").prop("disabled", true);
  }

  var strMsgLine1 = "",
      strMsgLine2 = "";
  
  switch (strStatus) {
    case "won":
      strMsgLine1 = "You've defeated " + objDefender.strFullName +
                    ". Choose another enemy."
      break;
    case "done":
      strMsgLine1 = "You won!!! GAME OVER!!!";
      break;
    case "lost":
      strMsgLine1 = "You've been defeated...GAME OVER!";
      break;
    case "continue":
      strMsgLine1 = "You attacked " + objDefender.strFullName + 
                    " for " + nChosenAttack + " damage.";
      strMsgLine2 = objDefender.strFullName + " attacked you back for " +
                    objDefender.nCAttPow + " damage.";
      break;
    default:
      console.log("renderMsgLines: Unknown status - " + strStatus + "."); 
  }

  applyMessages(strMsgLine1, strMsgLine2);

  if (strStatus === "won" || strStatus === "done") {
    $("#defender-row").empty();
  }

  if (strStatus === "done" || strStatus === "lost") {
    addRestartBtn();;
  }
}

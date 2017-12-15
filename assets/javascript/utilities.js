/**
 * @file Manages utilities for executing Star Wars RPG game.
 * @author Elaina Swann
 * @version 1.0 
 */

/** 
 * @function myFunction 
 * @description Removes all elements of the message lines.
*/
function clearMsgLines() {
  $("#msg-line-1").empty();
  $("#msg-line-2").empty();
}

/** 
 * @function doesChildExist 
 * @description Checks for children of the given parent.
 * @param {HTML element} parentElement - Element corresponding to a row of game characters.
 * @returns {number} Number of children.
*/
function doesChildExist(parentElement) {
    return parentElement.children().length;
}

/** 
 * @function moveCharacter 
 * @description Moves a game character to a specified location.
 * @param {HTML element} charElement - Single game character element.
 * @param {string} strLocation - Row to move element. 
*/
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
    charElement.children("label").addClass("defender-label");
  }

  $(strRow).append(charElement.parent());
}

/** 
 * @function renderImage 
 * @description Adds a game character element to a specified row.
 * @param {Character} objCharacter - Single game Character object.
 * @param {string} strRowID - Row to move element including # designation. 
*/
function renderImage(objCharacter, strRowID) {
  var strSel = "#img-col-" + objCharacter.strShortName;

  var divElement = $("<div>").addClass("col-md-2");

  var imgElement = $("<div>")
        .addClass("img-col choose")
        .attr("id", strSel)
        .append($("<label>")
                    .addClass("text-center img-label name-label")
                    .attr("id", "name-label-" + objCharacter.strShortName)
                    .text(objCharacter.strFullName))
        .append($("<img>")
                    .attr("src", "assets/images/" + 
                          objCharacter.strFullName + ".jpg")
                    .addClass("img-responsive img")
                    .attr("id", objCharacter.strShortName)
                    .attr("alt", objCharacter.strFullName + " image"))
        .append($("<label>")
                    .addClass("text-center img-label number-label")
                    .attr("id", "number-label-" + objCharacter.strShortName)
                    .text(objCharacter.nHealthPts));  

  $(strRowID).append(divElement.append(imgElement));
}

/** 
 * @function renderMsgLines 
 * @description Adds messages depending on the status of the game.
 * @param {Character} objChosen - Game Character object designated as chosen.
 * @param {Character} objDefender - Game Character object designated as defender.
 * @param {string} strStatus - Current status of game (expects won, done, lost, or continue).
 * @param {number} nChosenAttack - Number of attack points for chosen object. This is only required when the game status is continue. Otherwise, can be set to 0. 
*/
function renderMsgLines(objChosen, objDefender, strStatus, nChosenAttack) {

  /** 
   * @function addMessages 
   * @description Adds messages. 
   * @param {string} strMsgLine1 - First message.
   * @param {string} strMsgLine2 - Second message.
  */
  function addMessages(strMsgLine1, strMsgLine2) {
    (strMsgLine1.length) ? $("#msg-line-1").text(strMsgLine1) :
                           $("#msg-line-1").empty();
    (strMsgLine2.length) ? $("#msg-line-2").text(strMsgLine2) :
                           $("#msg-line-2").empty();
  }

  /** 
   * @function addRestartBtn 
   * @description Adds restart button and also disables attack button. 
  */
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

  addMessages(strMsgLine1, strMsgLine2);

  if (strStatus === "won" || strStatus === "done") {
    $("#defender-row").empty();
  }

  if (strStatus === "done" || strStatus === "lost") {
    addRestartBtn();;
  }
}

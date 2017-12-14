/* JavaScript source code to execute the Star Wars game.
 
   NAME: game.js
   AUTHOR: Elaina Swann
   DATE: 12/16/2017
   REVISION LOG:  
*/

$(document).ready(function(){
  var objCharacters = undefined;

  var engagedInBattle = false;

  function attackDefender() {
    var objChosen   = objCharacters.objChosen,
        objDefender = objCharacters.objDefender;

    var nChosenAttack = objChosen.nAttPow * ++objChosen.nAttacks;

    objDefender.nHealthPts -= nChosenAttack;

    /* Update defender count on webpage. */
    $("#number-label-" + objDefender.strShortName)
                       .text(objDefender.nHealthPts);

    if (objDefender.nHealthPts <= 0) {
      engagedInBattle = false;

      if (doesChildExist($("#enemy-row"))) {
        renderMsgLines(objChosen, objDefender, "won", 0);
      }
      else { /* No more defenders. You won and game is over. */
        renderMsgLines(objChosen, objDefender, "done", 0);
      }
    }
    else { /* Defender is firing back because not defeated yet. */
      objChosen.nHealthPts -= objDefender.nCAttPow;
      /* Update chosen count on webpage. */
      $("#number-label-" + objChosen.strShortName)
                         .text(objChosen.nHealthPts);

      /* Check if you are defeated. */
      if (objChosen.nHealthPts <= 0) {
        renderMsgLines(objChosen, objDefender, "lost", 0);
      }
      else { /* Update attack messages. */
        renderMsgLines(objChosen, objDefender, "continue", nChosenAttack);
      }
    }
  }

  function initialize(fullInit) {
    if (fullInit) {
      $("#choose-row, #chosen-row, #enemy-row, #defender-row, #msg-line-1,#msg-2").empty();

      $("#msg-2").append($("<h3>")
                 .attr("id", "msg-line-2"));
              
      $("#attack").prop("disabled", false);

      objCharacters = undefined;
    }

    objCharacters = new Characters();

    engagedInBattle = false;

    for (let i = 0; i < objCharacters.arrCharacters.length; i++) {
      var objCharacter = objCharacters.arrCharacters[i];

      /* Also creates div for image and labels. */
      renderImage(objCharacter, "#choose-row");  

      renderLabel(objCharacter, "name"); /* Must be done after adding image. */
      renderLabel(objCharacter, "number");
    }
  }

  function chooseClick() {  
    try { 
      var strChosen = $(this).attr("id");
    
      if (objCharacters.objChosen = objCharacters.find($(this))) {  
        moveCharacter($(this), "chosen");

        for (let i = 0; i < objCharacters.arrCharacters.length; i++) {
          var strShortName = objCharacters.arrCharacters[i].strShortName;

          if (strChosen !== strShortName) {
            moveCharacter($("#" + strShortName), "enemy");
          }
        }

        $("#choose-row").empty();
      }
      else {
        console.log("chooseClick:Cannot find " + strChosen);
      }
    }
    catch(error) {
      alert(error);
    }
  }

  function enemyClick() {
    try { 
      if (!engagedInBattle) {
        clearMsgLines();

        if (objCharacters.objDefender = objCharacters.find($(this))) {
          moveCharacter($(this), "defender");
          engagedInBattle = true;
        }
        else {
          console.log("enemyClick:Cannot find " + strChosen);
        }
      }
      else {
        throw("You can only battle one defender at a time.")
      }
    }
    catch(error) {
      alert(error);
    }
  }

  function attackClick() {
    try {
      clearMsgLines();

      if (doesChildExist($("#defender-row"))) {
        attackDefender();
      }
      else {
        $("#msg-line-1").text("No enemy to fight. Choose one.");
      }
    }
    catch(error) {
      alert(error);
    }
  }

  function restartClick() {
    try{
      initialize(true);
    }
    catch(error) {
      alert(error);
    }
  }

  initialize(false);
  $(document).on("click", ".choose", chooseClick);
  $(document).on("click", ".enemy", enemyClick);
  $(document).on("click", "#attack", attackClick);
  $(document).on("click", "#restart", restartClick);
});
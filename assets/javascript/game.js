/**
 * @file Main file for executing Star Wars RPG game.
 * @author Elaina Swann
 * @version 1.0 
 */

$(document).ready(function(){
  var objCharacters = undefined;

  var engagedInBattle = false;

  /** 
   * @function attackDefender 
   * @description Launches chosen player attack on a defender and processes results.
  */
  function attackDefender() {
    var objChosen   = objCharacters.getChosen(),
        objDefender = objCharacters.getDefender();

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

  /** 
   * @function initialize 
   * @description Sets up HTML webpage for start of game play.
   * @param {boolean} fullInit - Designates whether or not to perform full initialization. Full initialization is required when the game restarts. It is not required when the webpage is first rendered.
  */
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

    var arrCharacters = objCharacters.getArray();
    for (let i = 0; i < arrCharacters.length; i++) {
      var objCharacter = arrCharacters[i];

      /* Also creates div for image and labels. */
      renderImage(objCharacter, "#choose-row");  

      renderLabel(objCharacter, "name"); /* Must be done after adding image. */
      renderLabel(objCharacter, "number");
    }
  }

  /** 
   * @function chooseClick 
   * @description Performs processing required when gamer selects a chosen character to represent self.
  */
  function chooseClick() {  
    try { 
      var strChosen = $(this).attr("id");
    
      if (objCharacters.setChosen(strChosen)) {  
        moveCharacter($(this), "chosen");

        var arrCharacters = objCharacters.getArray();
        for (let i = 0; i < arrCharacters.length; i++) {
          var strShortName = arrCharacters[i].strShortName;

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

  /** 
   * @function enemyClick 
   * @description Performs processing required when gamer selects a defender to fight.
   * @throws Error when have already designated a defender and try to select another one.
  */
  function enemyClick() {
    try { 
      if (!engagedInBattle) {
        clearMsgLines();

        if (objCharacters.setDefender($(this).attr("id"))) {
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

  /** 
   * @function attackClick 
   * @description Performs processing required when gamer attacks the defender.
  */
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

  /* NOTE: The event listeners are placed on $(document) due to the dynamic nature of the selectors. */

  /** 
   * @event .on ("click") 
   * @listens .choose When gamer choses player to represent self. 
   * @param {function} chooseClick
  */
  $(document).on("click", ".choose", chooseClick);

  /** 
   * @event .on ("click") 
   * @listens .enemy When gamer choses player to compete against. 
   * @param {function} enemyClick
  */
  $(document).on("click", ".enemy", enemyClick);

  /** 
   * @event .on ("click") 
   * @listens #attack When gamer choses to attack defender. 
   * @param {function} attackClick
  */
  $(document).on("click", "#attack", attackClick);

  /** 
   * @event .on ("click") 
   * @listens #restart When gamer choses player to restart game. 
   * @param {function} restartClick
  */
  $(document).on("click", "#restart", restartClick);
});
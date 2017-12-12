/* JavaScript source code to execute the Star Wars game.
 
   NAME: game.js
   AUTHOR: Elaina Swann
   DATE: 12/14/2017
   REVISION LOG:  
*/

$(document).ready(function(){
  /* Objects are created and re-created in initialize function. */
  var objObi,
      objLuke,
      objDarth,
      objLeia;

  /* Array is created and re-created in initialize function. */
  var arrCharacters;

  var currCharacter,
      currDefender;
 
  var engagedInBattle = false;

  function character(strShortName, strFullName, intHealthPts, intAttPow, 
                     intCAttPow) {
    this.strShortName = strShortName;
    this.strFullName  = strFullName;
    this.intHealthPts = intHealthPts;
    this.intAttPow    = intAttPow;
    this.intCAttPow   = intCAttPow;
    this.numAttacks   = 0;
  }

  function getCharObject(charElement) {
    var strShortName = charElement.attr("id");

    for (let i = 0; i < arrCharacters.length; i++) {
      if (strShortName === arrCharacters[i].strShortName) {
        return arrCharacters[i];
      }
    }

    return undefined;
  }

  function moveToChosen(chosenElement){
    chosenElement.removeClass("choose").addClass("chosen");

    $("#chosen-row").append(chosenElement[0].parentNode);
  }

  function moveToEnemies(enemyElement) {
    enemyElement.removeClass("choose").addClass("enemy");

    $("#enemy-row").append(enemyElement[0].parentNode);
  }

  function moveToDefender(defenderElement) {
    var parentElement = defenderElement[0].parentNode;

    defenderElement.removeClass("enemy").addClass("defender");
    
    /* Required to get white font color for defender labels. */
    $(parentElement.children[1]).addClass("defender-label");
    $(parentElement.children[2]).addClass("defender-label");

    $("#defender-row").append(parentElement);
  }

  function attackDefender() {
    var intCharAttack = currCharacter.intAttPow * ++currCharacter.numAttacks;

    currDefender.intHealthPts -= intCharAttack;
    /* Update defender count on webpage. */
    $("#number-label-" + currDefender.strShortName)
                       .text(currDefender.intHealthPts);

    if (currDefender.intHealthPts <= 0) {
      engagedInBattle = false;

      if ($("#enemy-row")[0].children.length) {
        $("#msg-line-1").text("You've defeated " + currDefender.strFullName +
                              ". Choose another enemy.");
        $("#msg-line-2").empty();
      }
      else { /* No more defenders. You won and game is over. */
        $("#msg-line-1").text("You won!!! GAME OVER!!!");
        $("#msg-2").empty();
        $("#msg-2").append($("<button>").addClass("btn btn-default btn-lg")
                                        .attr("id", "restart")
                                        .text("Restart"));
      }
      $("#defender-row").empty();
    }
    else { /* Defender is firing back because not defeated yet. */

      currCharacter.intHealthPts -= currDefender.intCAttPow;
      /* Update chosen count on webpage. */
      $("#number-label-" + currCharacter.strShortName)
                         .text(currCharacter.intHealthPts);

      /* Check if you are defeated. */
      if (currCharacter.intHealthPts <= 0) {
        $("#msg-line-1").text("You've been defeated...GAME OVER!");
        $("#msg-2").empty();
        $("#msg-2").append($("<button>").addClass("btn btn-default btn-lg")
                                        .attr("id", "restart")
                                        .text("Restart"));
      }
      else { /* Update attack messages. */
        $("#msg-line-1").text("You attacked " +
                              currDefender.strFullName + 
                              " for " + intCharAttack + " damage.");
        $("#msg-line-2").text(currDefender.strFullName + 
                              " attacked you back for " +
                              currDefender.intCAttPow + " damage.");
      }
    }
  }

  function initialize(fullInit) {

    function addImage(i) {
      var strShortName = arrCharacters[i].strShortName,
          strFullName  = arrCharacters[i].strFullName;

      var divElement = $("<div>")
                       .addClass("col-md-2 img-col")
                       .attr("id", "img-col-" + strShortName);

      $(divElement).append($("<img>")
                           .attr("src", "assets/images/" + strFullName + ".jpg")
                           .addClass("img-responsive img choose")
                           .attr("id", strShortName)
                           .attr("alt", strFullName + " image"));
      $("#choose-row").append(divElement);
    }

    function addLabels(i) {
      var strShortName = arrCharacters[i].strShortName;

      $("#img-col-" + strShortName).append($("<label>")
                                           .addClass("text-center img-label name-label")
                                           .text(arrCharacters[i].strFullName));
      $("#img-col-" + strShortName).append($("<label>")
                                           .addClass("text-center img-label number-label")
                                           .attr("id", "number-label-" + strShortName)
                                           .text(arrCharacters[i].intHealthPts));
    }

    if (fullInit) {
      $("#choose-row, #chosen-row, #enemy-row, #defender-row, #msg-line-1,#msg-2").empty();

      $("#msg-2").append($("<h3>").attr("id", "msg-line-2"));
    }

    /* Make sure you create the characters array before adding images and labels. */
    objObi   = undefined;
    objLuke  = undefined;
    objDarth = undefined;
    objLeia  = undefined;

    currCharacter = undefined;
    currDefender  = undefined;

    engagedInBattle = false;

    arrCharacters = [];

    objObi   = new character("obi", "Obi Wan Kenobi", 120, 8, 5);
    objLuke  = new character("luke", "Luke Skywalker", 100, 5, 5);
    objDarth = new character("darth", "Darth Vader", 150, 5, 20);
    objLeia  = new character("leia", "Princess Leia", 180, 5, 25);
    arrCharacters = [objObi, objLuke, objDarth, objLeia];

    for (let i = 0; i < arrCharacters.length; i++) {
      addImage(i);  /* Also creates div for image and labels. */
      addLabels(i); /* Must be done after adding image. */
    }
  }

  function chooseClick() {  
    try { 
      var strChosen = $(this).attr("id");
    
      if (currCharacter = getCharObject($(this))) {   
        moveToChosen($(this));

        for (let i = 0; i < arrCharacters.length; i++) {
          var strShortName = arrCharacters[i].strShortName;

          if (strChosen !== strShortName) {
            moveToEnemies($("#" + strShortName));
          }
        }

        $("#choose-row").empty();
      }
      else {
        throw("chooseClick:Cannot find " + strChosen);
      }
    }
    catch(error) {
      alert(error);
    }
  }

  function enemyClick() {
    try { 
      if (!engagedInBattle) {
        $("#msg-line-1").empty();
        $("#msg-line-2").empty();

        if (currDefender = getCharObject($(this))) {
          moveToDefender($(this));
          engagedInBattle = true;
        }
        else {
          throw("enemyClick:Cannot find " + strChosen);
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

  function checkForDefender() {
    return $("#defender-row")[0].children.length;
  }

  function attackClick() {
    try {
      $("#msg-line-1").empty();
      $("#msg-line-2").empty();

      if (checkForDefender()) {
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
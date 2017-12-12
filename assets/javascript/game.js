/* JavaScript source code to execute the Star Wars game.
 
   NAME: game.js
   AUTHOR: Elaina Swann
   DATE: 12/14/2017
   REVISION LOG:  
*/

$(document).ready(function(){
  var objObi   = new character("obi", "Obi Wan Kenobi", 120, 8, 5),
      objLuke  = new character("luke", "Luke Skywalker", 100, 5, 5),
      objDarth = new character("darth", "Darth Vader", 150, 5, 5),
      objLeia  = new character("leia", "Princess Leia", 180, 5, 25);

  var arrCharacters = [objObi, objLuke, objDarth, objLeia];

  var currCharacter,
      currDefender;

  var firstAttack = true;

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
    var parentElement = chosenElement[0].parentNode;

    chosenElement.removeClass("choose").addClass("chosen");

    $("#chosen-row").append(parentElement);
  }

  function moveToEnemies(enemyElement) {
    var parentElement = enemyElement[0].parentNode;

    enemyElement.removeClass("choose").addClass("enemy");

    $("#enemy-row").append(parentElement);
  }

  function moveToDefender(defenderElement) {
    var parentElement = defenderElement[0].parentNode;

    defenderElement.removeClass("enemy").addClass("defender");

    $("#defender-row").append(parentElement);
  }

  function attackDefender() {
    var intCharAttack = currCharacter.intAttPow * ++currCharacter.numAttacks;

    currDefender.intHealthPts -= intCharAttack;

    currCharacter.intHealthPts -= currDefender.intCAttPow;

    /* Update attack messages on webpage */
    if (firstAttack) {
      $("#msg-line-2").text(currDefender.strFullName + 
                            " attacked you back for " +
                            currDefender.intCAttPow + " damage.");
      firstAttack = false;
    }
    $("#msg-line-1").text("You attacked " +
                          currDefender.strFullName + 
                          " for " + intCharAttack + " damage.");

    if (currCharacter.intHealthPts <= 0) {
      var restartBtn = $("<button>").addClass("btn btn-default btn-lg")
                                    .attr("id", "restart")
                                    .text("Restart");

      $("#msg-line-1").text("You've been defeated...GAME OVER!");
      $("#msg-2").empty();
      $("#msg-2").append(restartBtn);
    }
    else if (currDefender.intHealthPts <=0) {

    }
  }

  function initialize() {

    function addImage(i) {
      var strShortName = arrCharacters[i].strShortName,
          strFullName  = arrCharacters[i].strFullName;

      var divElement = $("<div>")
                       .addClass("col-md-2 img-col")
                       .attr("id", "img-col-" + strShortName);
      var imgElement = $("<img>")
                       .attr("src", "assets/images/" + strFullName + ".jpg")
                       .addClass("img-responsive img choose")
                       .attr("id", strShortName)
                       .attr("alt", strFullName + " image");

      $(divElement).append($(imgElement));
      $("#choose-row").append($(divElement));
    }

    function addLabels(i) {
      var strShortName = arrCharacters[i].strShortName;

      var nameElement   = $("<label>")
                          .addClass("text-center img-label name-label")
                          .text(arrCharacters[i].strFullName);
      var numberElement = $("<label>")
                          .addClass("text-center img-label number-label")
                          .attr("id", "number-label-" + strShortName)
                          .text(arrCharacters[i].intHealthPts);

      $("#img-col-" + strShortName).append($(nameElement));
      $("#img-col-" + strShortName).append($(numberElement));
    }

    for (let i = 0; i < arrCharacters.length; i++) {
      addImage(i);  /* Also creates div for image and labels. */
      addLabels(i); /* Must be done after adding image. */
    }
  }

  function chooseClick() {   
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

  function enemyClick() { 
    if (currDefender = getCharObject($(this))) {
      moveToDefender($(this));
    }
    else {
      throw("enemyClick:Cannot find " + strChosen);
    }
  }

  function attackClick() {
    attackDefender();
  }

  function resetClick() {
    initialize();
  }

  initialize();
  $(document).on("click", ".choose", chooseClick);
  $(document).on("click", ".enemy", enemyClick);
  $(document).on("click", "#attack", attackClick);
  $(document).on("click", "#reset", resetClick);
});
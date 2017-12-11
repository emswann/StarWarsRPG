/* JavaScript source code to execute the Star Wars game.
 
   NAME: game.js
   AUTHOR: Elaina Swann
   DATE: 12/14/2017
   REVISION LOG:  
*/

$(document).ready(function(){
  var objObi   = new character("obi", "Obi Wan Kenobi", 120, 5, 5),
      objLuke  = new character("luke", "Luke Skywalker", 100, 5, 5),
      objDarth = new character("darth", "Darth Vader", 150, 5, 5),
      objLeia  = new character("leia", "Princess Leia", 180, 5, 5);

  var arrCharacters = [objObi, objLuke, objDarth, objLeia];

  function character(strShortName, strFullName, intHealthPts, intAttPow, 
                     intCAttPow) {
    this.strShortName = strShortName;
    this.strFullName  = strFullName;
    this.intHealthPts = intHealthPts;
    this.intAttPow    = intAttPow;
    this.intCAttPow   = intCAttPow;
  }

  function moveToChosen(strChosenName){
    var strThisElement   = $("#" + strChosenName);

    strThisElement.removeClass("choose").addClass("chosen");

    $("#chosen-char").append($(strThisElement));
  }

  function moveToEnemies(strEnemyName) {
    var strThisElement   = $("#" + strEnemyName),
        strParentElement = strThisElement[0].parentNode;

    strThisElement.removeClass("choose").addClass("enemy");

    $("#enemy-row").append($(strParentElement));
  }

  function moveToDefend(strDefenderName) {
    var strThisElement   = $("#" + strDefenderName),
        strParentElement = strThisElement[0].parentNode;

    strThisElement.removeClass("enemy").addClass("defender");

    $("#defender-row").append($(strParentElement));
  }

  function initialize() {
    for (var i = 0; i < arrCharacters.length; i++) {
      var strShortName = arrCharacters[i].strShortName,
          strFullName  = arrCharacters[i].strFullName;

      var divElement = $("<div>").addClass("col-md-2");
      var imgElement = $("<img>")
                       .attr("src", "assets/images/" + strFullName + ".jpg")
                       .addClass("img-responsive img-thumbnail choose")
                       .attr("id", strShortName)
                       .attr("alt", strFullName + " image");

      $(divElement).append($(imgElement));
      $("#choose-row").append($(divElement));
    }
  }

  function chooseClick() {   
    var strChosen = $(this).attr("id");

    moveToChosen(strChosen);

    for (var i = 0; i < arrCharacters.length; i++) {
      var strShortName = arrCharacters[i].strShortName;

      if (strChosen !== strShortName) {
        moveToEnemies(strShortName);
      }
    }

    $("#choose-row").empty();
  }

  function enemyClick() {  
    var strEnemy = $(this).attr("id");

    moveToDefend(strEnemy);
  }

  function attackClick() {
     
  }

  function resetClick() {

  }

  initialize();
  $(document).on("click", ".choose", chooseClick);
  $(document).on("click", ".enemy", enemyClick);
  $(document).on("click", ".attack", attackClick);
  $(document).on("click", ".reset", resetClick);
});